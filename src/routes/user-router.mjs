import express from 'express';
import {
    getUsers,
    getUsersById,
    postUser,
    putUser,
    deleteUser
} from '../controllers/user-controller.mjs';
import {body} from 'express-validator';
import { authenticateToken } from '../middlewares/authentication.mjs';

const userRouter = express.Router();

// routes for /api/users/
userRouter.route('/')
    .get(getUsers)
    .post(body('username').trim().isLength({min: 3, max: 20}).isAlphanumeric(), body('password').trim().isLength({min: 8}), body('email').trim().isEmail(), postUser);

// routes for /api/users/:id
userRouter.route('/:id')
    .get(getUsersById)
    .put(authenticateToken, body('username').optional().trim().isLength({min: 3, max: 20}).isAlphanumeric(), body('password').optional().trim().isLength({min: 8}), body('email').trim().isEmail(), putUser)
    .delete(authenticateToken, deleteUser);

export default userRouter;
