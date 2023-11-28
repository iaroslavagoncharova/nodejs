import { validationResult } from "express-validator";
import { getCommentByMediaId, getCommentByUserId, createComment, updateComment, removeComment } from "../models/comments-model.mjs";

const getMediaComments = async (req, res) => {
    const result = await getCommentByMediaId(req.params.id); 
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

const getUserComments = async (req, res) => {
    const result = await getCommentByUserId(req.params.id); 
    if (result) {
      if (!result === '') {
      res.status(500);
      }
      res.json(result);
    } else {
        res.status(404);
        res.json({error: 'Not found', user_id: req.params.id});
    }
};

const postComment = async (req, res, next) => {
  console.log('created comment', req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('validation errors', errors.array());
    const error = new Error('invalid input fields');
    error.status = 400;
    return next(error);
  }
  const {media_id, comment_text} = req.body;
  const user_id = req.user.user_id;
    if (media_id && comment_text && user_id) {
      const newComment = {media_id, user_id, comment_text};
      const result = await createComment(newComment);
      if (result.error) {
        const error = new Error(result.error);
        error.status = result.status || 500;
        return next(error)
      }
      res.status(201).json({message: 'New comment added', ...result});
    }
};

const putComment = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(400).json({message: 'invalid input fields'});
  }
  const id = req.params.id;
  const user_id = req.user.user_id;
  const levelId = req.user.user_level_id;
  const {comment_text} = req.body;
  if (comment_text) {
    const updatedComment = req.body;
    const result = await updateComment(updatedComment, id, user_id, levelId);
    if (result.error) {
      const error = new Error(result.error);
      error.status = result.status || 500;
      return next(error)
    }
    res.status(201).json({message: 'Comment updated', ...result});
}
};

const deleteComment = async (req, res, next) => {
  const id = req.params.id;
  const user_id = req.user.user_id;
  const levelId = req.user.user_level_id;
  const result = await removeComment(id, user_id, levelId);
  if (result.error) {
    const error = new Error(result.error);
    error.status = result.status || 500;
    return next(error)
  }
  res.status(204).json({message: 'Comment deleted', ...result});
}

export {getMediaComments, getUserComments, postComment, putComment, deleteComment};