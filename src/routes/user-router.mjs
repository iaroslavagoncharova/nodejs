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
 /**
 * @api {get} /api/users Get all users information
 * @apiVersion 1.0.0
 * @apiName GetUsers
 * @apiGroup Users
 * @apiPermission all
 *
 * @apiSuccess {Object[]} users List of users.
 * @apiSuccess {Number} user.user_id User's ID.
 * @apiSuccess {String} user.username User's username.
 * @apiSuccess {String} user.password User's password.
 * @apiSuccess {String} user.email User's email.
 * @apiSuccess {Number} user.user_level_id User's user level ID.
 * @apiSuccess {Number} user.created_at User's creation timestamp.
 * 
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *   {
        "user_id": 16,
        "username": 'AdminUser',
        "email": 'adminuser@example.com',
        "user_level_id": 1,
        "created_at": 2023-11-21T15:20:05.000Z
     },
     {
        "user_id": 20,
        "username": 'Newestuser',
        "password": 'newsecret',
        "email": 'newestuser@example.com',
        "user_level_id": 1,
        "created_at": 2023-11-21T17:53:49.000Z
  }
 */
    .get(getUsers)
/**
 * @api {post} /api/users Create a new user
 * @apiVersion 1.0.0
 * @apiName PostUser
 * @apiGroup Users
 * @apiPermission all
 *
 * @apiParam {String} username User's username.
 * @apiParam {String} password User's password.
 * @apiParam {String} email User's email.
 * 
 *  @apiParamExample {json} Request-Example:
 *    {
 *      "username": "JohnDoe",
 *      "password": "newpassword",
 *      "email": "johndoe@example.com"
 *    }
 * 
 * @apiSuccess {String} message User added.
 * @apiSuccess {Number} userId ID of the created user.
 * 
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 201 OK
 *  {
 *  "message": "User added",
 *  "userId": 21
 * }
 * 
 * @apiError InvalidInput Invalid input fields.
 * @apiErrorExample Error-Response:
 *    HTTP/1.1 400 Bad Request
 *   {
 *      "error": {
 *         "message": "invalid input fields",
 *         "status": 400}
 * }
 * @apiErrorExample Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *  {
 *     "error": {
 *        "message": "Duplicate entry 'newUser' for key 'username'",
 *       "status": 500}
 * }
 */
    .post(body('username').trim().isLength({min: 3, max: 20}).isAlphanumeric(), body('password').trim().isLength({min: 8}), body('email').trim().isEmail(), postUser);

// routes for /api/users/:id
userRouter.route('/:id')
/**
 * @api {get} /api/users/:id Get user by ID
 * @apiVersion 1.0.0
 * @apiName GetUserById
 * @apiGroup Users
 * @apiPermission all
 * 
 * @apiParam {String} id User's ID.
 *
 * @apiSuccess {Object} user User object.
 * @apiSuccess {String} user.username User's username.
 * @apiSuccess {String} user.email User's email.
 * @apiSuccess {String} user.user_level_id User's user level ID.
 * @apiSuccess {String} user.created_at User's creation date.
 * 
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 *  {
 *      "username": 'AdminUser',
 *      "email": 'admin@example.com",
 *      "user_level_id": 1,
 *      "created_at": 2023-11-21T15:20:05.000Z
 * }
 * 
 * @apiError UserNotFound The id of the User was not found.
 * @apiErrorExample Error-Response:
 *  HTTP/1.1 404 Not Found
 * {
 *   "error": "Not found",
 *   "user_id": 999
 * }
 */
    .get(getUsersById)
/**
 * @api {put} /api/users/:id Update user by ID
 * @apiVersion 1.0.0
 * @apiName PutUser
 * @apiGroup Users
 * @apiPermission token
 * @apiHeader {String} Authorization Bearer token.
 *
 * @apiParam {Number} id User's ID.
 * @apiParam {String} [username] Updated username.
 * @apiParam {String} [password] Updated password.
 * @apiParam {String} [email] Updated email.
 * 
 *  @apiParamExample {json} Request-Example:
 *    {
 *      "username": "JohnDoe2",
 *      "password": "newpassword2",
 *      "email": "johndoe2@example.com"
 *    }
 *
 * @apiSuccess {String} message User updated.
 * @apiSuccess {Number} user.user_id User's ID.
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 201 OK
 * {
 *  "message": "User updated",
 *  "user_id": 21
 * }
 * 
 * @apiError InvalidInput Invalid input fields.
 * @apiErrorExample Error-Response:
 *   HTTP/1.1 400 Bad Request
 * {
 *  "error": {
 *     "message": "invalid input fields",
 *    "status": 400}
 * }
 * 
 * @apiError InvalidToken Authentication token was invalid.
 * @apiErrorExample Error-Response:
 *  HTTP/1.1 401 Unauthorized
 * {
 *  "message": "Invalid token"
 * }
 */
    .put(authenticateToken, body('username').optional().trim().isLength({min: 3, max: 20}).isAlphanumeric(), body('password').optional().trim().isLength({min: 8}), body('email').trim().isEmail(), putUser)
/**
 * @api {delete} /api/users/:id Delete user by ID
 * @apiVersion 1.0.0
 * @apiName DeleteUser
 * @apiGroup Users
 * @apiPermission token
 * @apiHeader {String} Authorization Bearer token.
 *
 * @apiParam {String} id User's ID.
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
 * @apiError UserNotFound The id of the User was not found.
 * @apiErrorExample Error-Response:
 * HTTP/1.1 404 Not Found
 * {
 *   "message": "User not found"
 * }
 */

    .delete(authenticateToken, deleteUser);

export default userRouter;
