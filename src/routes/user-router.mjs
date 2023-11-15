import express from 'express';
import {
    getUsers,
    getUsersById,
    postUser,
    putUser,
    deleteUser
} from '../controllers/user-controller.mjs';

const userRouter = express.Router();

// routes for /api/users/
userRouter.route('/').get(getUsers).post(postUser);

// routes for /api/users/:id
userRouter.route('/:id').get(getUsersById).put(putUser).delete(deleteUser);

export default userRouter;