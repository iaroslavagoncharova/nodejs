import jwt from "jsonwebtoken";
import 'dotenv/config';
import {login} from '../models/user-model.mjs';

const postLogin = async (req, res) => {
    const user = await login(req.body);
    console.log('postLogin', user);
    try {
        const token = jwt.sign(user, process.env.JWT_SECRET);
        res.json({message: 'Login successful', token, user});
    } catch (error) {
        res.status(401).json({message: 'Invalid username or password'});
    }
};

const getMe = (req, res) => {
    console.log('getMe user', req.user);
    res.json(req.user);
};

export {postLogin, getMe};