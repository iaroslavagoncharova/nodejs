import jwt from "jsonwebtoken";
import 'dotenv/config';
import {login} from '../models/user-model.mjs';
import bcrypt from 'bcryptjs';

const postLogin = async (req, res, next) => {
    const user = await login(req.body.username);

    if (!user) {
        const error = new Error('Invalid username or password');
        error.status = 401;
        return next(error);
    }
    if (user.error) {
        return next(new Error(user.error))
    }
    console.log('postLogin', user);
    const match = await bcrypt.compare(req.body.password, user.password);
    if (match) {
        delete user.password
        const token = jwt.sign(user, process.env.JWT_SECRET);
        res.json({message: 'Login successful', token, user});
    } else {
        const error = new Error('Invalid username or password');
        error.status = 401;
        return next(error);
    }
};

const getMe = (req, res) => {
    console.log('getMe user', req.user);
    res.json(req.user);
};

export {postLogin, getMe};