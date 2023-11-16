// can be placed to a separate json file

import { fetchAllMedia, fetchMediaById } from "../models/media-model.mjs";

const mediaItems = [
    {
      "media_id": 9632,
      "filename": "ffd8.jpg",
      "filesize": 887574,
      "title": "Favorite drink",
      "description": "",
      "user_id": 1606,
      "media_type": "image/jpeg",
      "created_at": "2023-10-16T19:00:09.000Z"
    },
    {
      "media_id": 9626,
      "filename": "dbbd.jpg",
      "filesize": 60703,
      "title": "Miika",
      "description": "My Photo",
      "user_id": 3671,
      "media_type": "image/jpeg",
      "created_at": "2023-10-13T12:14:26.000Z"
    },
    {
      "media_id": 9625,
      "filename": "2f9b.jpg",
      "filesize": 30635,
      "title": "Aksux",
      "description": "friends",
      "user_id": 260,
      "media_type": "image/jpeg",
      "created_at": "2023-10-12T20:03:08.000Z"
    },
    {
      "media_id": 9592,
      "filename": "f504.jpg",
      "filesize": 48975,
      "title": "Desert",
      "description": "",
      "user_id": 3609,
      "media_type": "image/jpeg",
      "created_at": "2023-10-12T06:59:05.000Z"
    },
    {
      "media_id": 9590,
      "filename": "60ac.jpg",
      "filesize": 23829,
      "title": "Basement",
      "description": "Light setup in basement",
      "user_id": 305,
      "media_type": "image/jpeg",
      "created_at": "2023-10-12T06:56:41.000Z"
    }
  ]

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

const postMedia = (req, res) => {
    console.log('uploaded file', req.file);
    console.log('uploaded form data', req.body);
    const {title, description, user_id} = req.body;
    const {filename, mimetype, size} = req.file;
    const newId = mediaItems[0].media_id + 1;
    if (filename && title && user_id) {
        mediaItems.unshift({
            media_id: newId,
            filename,
            title,
            description,
            user_id,
            media_type: mimetype,
            filesize: size
        });
        res.status(201);
        res.json({message: 'New media item added', media_id: newId});
    } else {
      res.sendStatus(400);
    }
  };

  const putMedia = (req, res) => {
    // to be completed
    res.sendStatus(200);
  };

    const deleteMedia = (req, res) => {
        // to be completed
        res.sendStatus(200);
    };

    export {getMedia, getMediaById, postMedia, putMedia, deleteMedia}