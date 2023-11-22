import express from 'express';
import multer from 'multer';
import {
    deleteMedia,
    getMedia,
    getMediaById,
    postMedia,
    putMedia
} from '../controllers/media-controller.mjs';
import {logger} from '../middlewares/middlewares.mjs';
import { authenticateToken } from '../middlewares/authentication.mjs';

const mediaRouter = express.Router();
const upload = multer({dest: 'uploads/'});

// router specific middleware
// mediaRouter.use(logger);

// TODO: add authentication when needed
mediaRouter.route('/')
    .get(getMedia)
    .post(authenticateToken, upload.single('file'), postMedia);
mediaRouter.route('/:id')
    .get(getMediaById)
    .put(putMedia)
    .delete(deleteMedia);

export default mediaRouter;