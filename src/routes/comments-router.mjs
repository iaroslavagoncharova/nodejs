import express from 'express';
import {
    getMediaComments, getUserComments, postComment, putComment, deleteComment
} from '../controllers/comments-controller.mjs';

const commentsRouter = express.Router();

commentsRouter.route('/').post(postComment);

// route for /api/comments/:id

commentsRouter.route('/:id').put(putComment).delete(deleteComment);

// // route for /api/comments/media/:id
commentsRouter.route('/media/:id').get(getMediaComments);

// // route for /api/comments/user/:id
commentsRouter.route('/user/:id').get(getUserComments);

export default commentsRouter;