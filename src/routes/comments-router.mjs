import express from 'express';
import {
    getMediaComments, getUserComments, postComment, putComment, deleteComment
} from '../controllers/comments-controller.mjs';
import {authenticateToken} from '../middlewares/authentication.mjs';
import {body} from 'express-validator';

const commentsRouter = express.Router();

commentsRouter.route('/').post(authenticateToken, body('media_id').isInt(),
body('comment_text').trim().isLength({min: 1, max: 255}), postComment);

// route for /api/comments/:id

commentsRouter.route('/:id')
    .put(authenticateToken, body('comment_text').trim().isLength({min: 1, max: 255}), putComment)
    .delete(authenticateToken, deleteComment);

// // route for /api/comments/media/:id
commentsRouter.route('/media/:id').get(getMediaComments);

// // route for /api/comments/user/:id
commentsRouter.route('/user/:id').get(getUserComments);

export default commentsRouter;