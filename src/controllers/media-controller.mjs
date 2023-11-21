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

const postMedia = async (req, res) => {
    console.log('uploaded file', req.file);
    console.log('uploaded form data', req.body);
    const {title, description, user_id} = req.body;
    const {filename, mimetype, size} = req.file;
    if (filename && title && user_id) {
      const newMedia = {title, description, user_id, filename, mimetype, size};
      const result = await addMedia(newMedia);
      res.status(201);
      res.json({message: 'New media item added', ...result});
    } else {
      res.sendStatus(400);
    }
  };

  const putMedia = async (req, res) => {
    const id = req.params.id;
    const {filename, title, description} = req.body;
    if (filename && title && description) {
      const updatedMedia = req.body;
      const result = await changeMedia(updatedMedia, id);
      if (result) {
        res.status(201);
        res.json({message: 'Media updated', ...result});
      } else {
      res.sendStatus(400);
    }
  }};

    const deleteMedia = async (req, res) => {
        const result = await removeMedia(req.params.id); 
          if (result) {
          res.sendStatus(204);
        } else {
            res.status(404);
            res.json({error: 'Not found', media_id: req.params.id});
        }
    };

    export {getMedia, getMediaById, postMedia, putMedia, deleteMedia}