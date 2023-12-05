import express from 'express';
import {
    deleteMedia,
    getMedia,
    getMediaById,
    postMedia,
    putMedia
} from '../controllers/media-controller.mjs';
import { authenticateToken } from '../middlewares/authentication.mjs';
import { body } from 'express-validator';
import upload from '../middlewares/upload.mjs';

const mediaRouter = express.Router();

mediaRouter.route('/')
/**
 * @api {get} /api/media Get all media information
 * @apiVersion 1.0.0
 * @apiName GetMedia
 * @apiGroup Media
 * @apiPermission all
 * 
 * @apiSuccess {Object[]} media List of media.
 * @apiSuccess {Number} media.media_id Media ID.
 * @apiSuccess {Number} media.user_id User ID.
 * @apiSuccess {String} media.filename Media filename.
 * @apiSuccess {Number} media.filesize Media filesize.
 * @apiSuccess {String} media.media_type Media filetype.
 * @apiSuccess {String} media.title Media title.
 * @apiSuccess {String} media.description Media description
 * @apiSuccess {String} media.created_at Media creation date.
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 * {
 *      "media_id": 30,
 *      "user_id": 27,
 *      "filename": "flowers.jpg",
 *      "filesize": 3006,
 *      "media_type": "image/jpeg",
 *      "title": "flowers",
 *      "description": "beautiful flowers",
 *      "created_at": "2023-11-28T15:10:43.000Z"
 * }, {
 *     "media_id": 31,
 *     "user_id": 27,
 *     "filename": "cats.jpg",
 *     "filesize": 2564,
 *     "media_type": "image/jpeg",
 *     "title": "cats",
 *     "description": "cute cats",
 *     "created_at": "2023-11-28T15:10:43.000Z"
 * }
 * }
 */ 
    .get(getMedia)
/**
 * @api {post} /api/media Create a new media item
 * @apiVersion 1.0.0
 * @apiName PostMedia
 * @apiGroup Media
 * @apiPermission token
 * @apiHeader {String} Authorization Bearer token.
 * @apiHeader {String} Content-Type multipart/form-data.
 * 
 * @apiParam {String} title Media title.
 * @apiParam {String} description Media description.
 * @apiParam {File} file Media file.
 * 
 * @apiSuccess {String} message Media added.
 * @apiSuccess {Number} mediaId ID of the created media item.
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 201 OK
 * {
 *      "message": "Media added",
 *      "mediaId": 30
 * }
 * 
 * @apiError InvalidInput Invalid input fields.
 * @apiErrorExample Error-Response:
 *  HTTP/1.1 400 Bad Request
 * {
 *   "message": "invalid input fields",
 * } 
 * 
 * @apiError InvalidToken Authentication token was invalid.
 * @apiErrorExample Error-Response:
 * HTTP/1.1 401 Unauthorized
 * {
 *  "message": "Invalid token"
 * }
 * 
 */
    .post(authenticateToken, upload.single('file'), body('title').trim().isLength({min: 3}), body('description'), postMedia);
mediaRouter.route('/:id')
/**
 * @api {get} /api/media/:id Get media by ID
 * @apiVersion 1.0.0
 * @apiName GetMediaById
 * @apiGroup Media
 * @apiPermission all
 * 
 * @apiParam {String} id Media ID.
 *
 * @apiSuccess {Object} media Media object.
 * @apiSuccess {Number} media.media_id Media ID.
 * @apiSuccess {Number} media.user_id User ID.
 * @apiSuccess {String} media.filename Media filename.
 * @apiSuccess {Number} media.filesize Media filesize.
 * @apiSuccess {String} media.media_type Media filetype.
 * @apiSuccess {String} media.title Media title.
 * @apiSuccess {String} media.description Media description
 * @apiSuccess {String} media.created_at Media creation date.
 * 
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 *  {
        "media_id": 30,
        "user_id": 27,
        "filename": "updatedAdmin.jpg",
        "filesize": 3006,
        "media_type": "image/jpeg",
        "title": "Updated Media",
        "description": "updated description",
        "created_at": "2023-11-28T15:10:43.000Z"
  }
 * 
 * @apiError NotFound The id of the media was not found.
 * @apiErrorExample Error-Response:
 *  HTTP/1.1 404 Not Found
 * {
 *   "error": "Not found",
 *   "media_id": "300"
 * }
 */
    .get(getMediaById)
/**
 * @api {put} /api/media/:id Update media by ID
 * @apiVersion 1.0.0
 * @apiName PutMedia
 * @apiGroup Media
 * @apiPermission token
 * @apiHeader {String} Authorization Bearer token.
 * @apiHeader {String} Content-Type application/json.
 *
 * @apiParam {Number} id Media ID.
 * @apiParam {String} [filename] Updated filename.
 * @apiParam {String} [title] Updated title.
 * @apiParam {String} [description] Updated description.
 * 
 *  @apiParamExample {json} Request-Example:
 *    {
 *      "filename": "updatedMedia.jpg",
 *      "title": "Updated Media",
 *      "description": "updated description"
}
 *
 * @apiSuccess {String} message Media updated.
 * @apiSuccess {Number} media.media_id Media ID.
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 201 OK
 * {
 *  "message": "Media updated",
 *  "media_id": 15
 * }
 * 
 * @apiError InvalidInput Invalid input fields.
 * @apiErrorExample Error-Response:
 *   HTTP/1.1 400 Bad Request
 * {
 *  "error": {
 *     "message": "invalid input fields",
 *     "status": 400}
 * }
 * 
 * @apiError InvalidToken Authentication token was invalid.
 * @apiErrorExample Error-Response:
 *  HTTP/1.1 401 Unauthorized
 * {
 *  "message": "Invalid token"
 * }
 */
    .put(authenticateToken, body('filename'), body('title').trim().isLength({min: 3}), body('description'), putMedia)
/**
 * @api {delete} /api/media/:id Delete media by ID
 * @apiVersion 1.0.0
 * @apiName DeleteMedia
 * @apiGroup Media
 * @apiPermission token
 * @apiHeader {String} Authorization Bearer token.
 *
 * @apiParam {String} id Media ID.
 *
 * @apiSuccess {Boolean} success Indicates whether the deletion was successful.
 * 
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * 
 * @apiError InvalidToken Authentication token was invalid.
 * @apiErrorExample Error-Response:
 * HTTP/1.1 401 Unauthorized
 * {
 * "message": "Invalid token"
 * }
 * 
 * @apiError MediaNotFound The id of the media item was not found.
 * @apiErrorExample Error-Response:
 * HTTP/1.1 404 Not Found
 * {
 *   "message": "Media not found"
 * }
 */
    .delete(authenticateToken, deleteMedia);

export default mediaRouter;