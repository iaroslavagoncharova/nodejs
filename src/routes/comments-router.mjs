import express from 'express';
import {
    getMediaComments, getUserComments, postComment, putComment, deleteComment
} from '../controllers/comments-controller.mjs';
import {authenticateToken} from '../middlewares/authentication.mjs';
import {body} from 'express-validator';

const commentsRouter = express.Router();

commentsRouter.route('/')
/**
 * @api {post} /api/comments Create a new comment
 * @apiVersion 1.0.0
 * @apiName PostComment
 * @apiGroup Comments
 * @apiPermission token
 * 
 * @apiParam {Number} media_id Media ID.
 * @apiParam {String} comment_text Comment text.
 * 
 * @apiSuccess {String} message Comment added.
 * @apiSuccess {Number} comment_id Comment ID.
 * 
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 201 Created
 * {
 *    "message": "Comment added",
 *    "comment_id": 1
 * }
 * 
 * @apiError {String} message Unauthorized.
 * 
 * @apiErrorExample Error-Response:
 * HTTP/1.1 401 Unauthorized
 * {
 *   "message": "Unauthorized"
 * }
 * 
 * @apiError {String} message Invalid input fields.
 * 
 * @apiErrorExample Error-Response:
 * HTTP/1.1 400 Bad Request
 * {
 * "error": {
 *     "message": "invalid input fields",
 *     "status": 400
 * }
 * }
 */
.post(authenticateToken, body('media_id').isInt(),body('comment_text').trim().isLength({min: 1, max: 255}), postComment);

// route for /api/comments/:id

commentsRouter.route('/:id')
/**
 * @api {put} /api/comments/:id Update comment by id
 * @apiVersion 1.0.0
 * @apiName PutComment
 * @apiGroup Comments
 * @apiPermission token
 * 
 * @apiParam {Number} id Comment ID.
 * @apiParam {String} comment_text Comment text.
 * 
 * @apiSuccess {String} message Comment updated.
 * @apiSuccess {Number} comment_id Comment ID.
 * 
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *     "message": "Comment updated",
 *     "comment_id": 1
 *  }
 * 
 * @apiError {String} message Comment not found.
 * @apiError {Number} comment_id Comment ID.
 * 
 * @apiErrorExample Error-Response:
 *  HTTP/1.1 404 Not Found
 * {
 *      "error": "Not found",
 *      "comment_id": 999
 * }
 * 
 * @apiError {String} message Unauthorized.
 * 
 * @apiErrorExample Error-Response:
 * HTTP/1.1 401 Unauthorized
 * {
 *      "message": "Unauthorized"
 * }
 * 
 * @apiError {String} message Invalid input fields.
 * 
 * @apiErrorExample Error-Response:
 * HTTP/1.1 400 Bad Request
 * {
 * "error": {
 *      "message": "invalid input fields",
 *      "status": 400
 * }
 * }
 * 
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "comment_id": 1,
 *   "user_id": 1,
 *   "media_id": 1,
 *   "comment_text": "This is a comment",
 *   "created_at": "2023-11-28T15:10:43.000Z"
 * 
 */
    .put(authenticateToken, body('comment_text').trim().isLength({min: 1, max: 255}), putComment)
/**
 * @api {delete} /api/comments/:id Delete comment by id
 * @apiVersion 1.0.0
 * @apiName DeleteComment
 * @apiGroup Comments
 * @apiPermission token
 * 
 * @apiParam {Number} id Comment ID.
 * 
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * 
 * @apiError {String} message Comment not found.
 * @apiError {Number} comment_id Comment ID.
 * 
 * @apiErrorExample Error-Response:
 * HTTP/1.1 404 Not Found
 * {
 *     "error": "Not found",
 *     "comment_id": 999
 * }
 * 
 * @apiError {String} message Unauthorized.
 * 
 * @apiErrorExample Error-Response:
 * HTTP/1.1 401 Unauthorized
 * {
 *    "message": "Unauthorized"
 * }
 */
    .delete(authenticateToken, deleteComment);

// route for /api/comments/media/:id
commentsRouter.route('/media/:id')
/**
 * @api {get} /api/comments/media/:id Get media's comments
 * @apiVersion 1.0.0
 * @apiName GetMediaComments
 * @apiGroup Comments
 * @apiPermission all
 * 
 * @apiParam {Number} id Media ID.
 * 
 * @apiSuccess {Object[]} comments List of comments.
 * @apiSuccess {Number} comments.comment_id Comment ID.
 * @apiSuccess {Number} comments.user_id User ID.
 * @apiSuccess {Number} comments.media_id Media ID.
 * @apiSuccess {String} comments.comment_text Comment text.
 * @apiSuccess {String} comments.created_at Comment creation date.
 * 
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *    "comment_id": 1,
 *    "user_id": 1,
 *    "media_id": 1,
 *    "comment_text": "This is a comment",
 *    "created_at": "2023-11-28T15:10:43.000Z"
 * }, {
 *    "comment_id": 2,
 *    "user_id": 2,
 *    "media_id": 1,
 *    "comment_text": "This is another comment",
 *    "created_at": "2023-11-28T15:10:43.000Z"
 * }
 * 
 * @apiErrorExample Error-Response:
 *   HTTP/1.1 404 Not Found
 *  {
 *    "error": "Not found",
 *    "media_id": 999
 * }
 * 
 */
.get(getMediaComments);

// // route for /api/comments/user/:id
commentsRouter.route('/user/:id')
/**
 * @api {get} /api/comments/user/:id Get user's comments
 * @apiVersion 1.0.0
 * @apiName GetUserComments
 * @apiGroup Comments
 * @apiPermission all
 * 
 * @apiParam {Number} id User ID.
 * 
 * @apiSuccess {Object[]} comments List of comments.
 * @apiSuccess {Number} comments.comment_id Comment ID.
 * @apiSuccess {Number} comments.user_id User ID.
 * @apiSuccess {Number} comments.media_id Media ID.
 * @apiSuccess {String} comments.comment_text Comment text.
 * @apiSuccess {String} comments.created_at Comment creation date.
 * 
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *     "comment_id": 1,
 *     "user_id": 1,
 *     "media_id": 1,
 *     "comment_text": "This is a comment",
 *     "created_at": "2023-11-28T15:10:43.000Z"
 * }, {
 *     "comment_id": 2,
 *     "user_id": 1,
 *     "media_id": 2,
 *     "comment_text": "This is another comment",
 *     "created_at": "2023-11-28T15:10:43.000Z"
 * }
 * 
 * @apiErrorExample Error-Response:
 *    HTTP/1.1 404 Not Found
 *   {
 *      "error": "Not found",
 *      "user_id": 999
 *  }
 * 
 */
.get(getUserComments);

export default commentsRouter;