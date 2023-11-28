import { validationResult } from "express-validator";
import { addMedia, fetchAllMedia, fetchMediaById, changeMedia, removeMedia } from "../models/media-model.mjs";

const getMedia = async (req, res) => {
  const mediaItems = await fetchAllMedia();
    res.json(mediaItems);
};

const getMediaById = async (req, res) => {
    const result = await fetchMediaById(req.params.id); 
    if (result) {
      if (result.error) {
      res.status(500);
      }
      res.json(result);
    } else {
        res.status(404);
        res.json({error: 'Not found', media_id: req.params.id});
    }
};

const postMedia = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('validation errors', errors.array());
    const error = new Error('invalid input fields');
    error.status = 400;
    return next(error);
  }
    const {title, description} = req.body;
    const {filename, mimetype, size} = req.file;
    const user_id = req.user.user_id;
    if (filename && title && user_id) {
      const newMedia = {title, description, user_id, filename, mimetype, size};
      const result = await addMedia(newMedia);
      if (result.error) {
        const error = new Error(result.error);
        error.status = result.status || 500;
        return next(error)
      }
      res.status(201).json({message: 'New media item added', ...result});
    }
  };

  const putMedia = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('validation errors', errors.array());
      const error = new Error('invalid input fields');
      error.status = 403;
      return next(error);
    }
    const id = req.params.id;
    const user_id = req.user.user_id;
    const levelId = req.user.user_level_id;
    const {filename, title, description} = req.body;
    if (filename && title && description && user_id) {
      const updatedMedia = {filename, title, description, user_id};
      const result = await changeMedia(updatedMedia, id, levelId);
      if (result.error) {
        const error = new Error(result.error);
        error.status = result.status || 500;
        return next(error)
      }
      res.status(201);
      res.json({message: 'Media updated', ...result});
  }};

    const deleteMedia = async (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log('validation errors', errors.array());
        const error = new Error('not found or unauthorized');
        error.status = 403;
        return next(error);
      }
        const user_id = req.user.user_id;
        const levelId = req.user.user_level_id;
        const result = await removeMedia(req.params.id, user_id, levelId); 
        if (result.error) {
          const error = new Error(result.error);
          error.status = result.status || 500;
          return next(error)
        }
          res.status(204).json({message: 'Media deleted', ...result});
    };

    export {getMedia, getMediaById, postMedia, putMedia, deleteMedia}