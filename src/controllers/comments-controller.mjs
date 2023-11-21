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

const postComment = async (req, res) => {
  console.log('created comment', req.body);
    const {media_id, user_id, comment_text} = req.body;
    if (media_id && user_id && comment_text) {
      const newComment = {media_id, user_id, comment_text};
      const result = await createComment(newComment);
      res.status(201);
      res.json({message: 'New comment added', ...result});
    } else {
      res.sendStatus(400);
    }
};

const putComment = async (req, res) => {
  const id = req.params.id;
  const {comment_text} = req.body;
  if (comment_text) {
    const updatedComment = req.body;
    const result = await updateComment(updatedComment, id);
    res.status(201);
    res.json({message: 'Comment updated', ...result});
  } else {
    res.sendStatus(400);
  }
};

const deleteComment = async (req, res) => {
  const id = req.params.id;
  const result = await removeComment(id);
  if (result) {
    res.sendStatus(204);
  } else {
    res.status(404);
    res.json({error: 'Not found', comment_id: req.params.id});
  }
}

export {getMediaComments, getUserComments, postComment, putComment, deleteComment};