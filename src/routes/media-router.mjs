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
    .get(getMedia)
    .post(authenticateToken, upload.single('file'), body('title').trim().isLength({min: 3}), body('description'), postMedia);
mediaRouter.route('/:id')
    .get(getMediaById)
    .put(authenticateToken, body('filename'), body('title').trim().isLength({min: 3}), body('description'), putMedia)
    .delete(authenticateToken, deleteMedia);

export default mediaRouter;