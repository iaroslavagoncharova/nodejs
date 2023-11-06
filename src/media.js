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

  /**
* Gets all items
*
* @param {object} req - http request
* @param {object} res - http response
*/

const getItems = (req, res) => {
    console.log('getItems');
    const limit = req.query.limit;
    // TODO: check that the param value is int before using
    if (mediaItems) {
    if (limit) {
      res.status(200);
      res.json(mediaItems.slice(0, limit));
    } else {
      res.status(200);
      res.json(mediaItems);
    }
  } else {
    res.status(404);
    res.json({message: "Items not found"});
}
};
  const getItemsById = (req, res) => {
    // if item with id exists send it, otherwise send 404
    console.log('getItemsById', req.params);
    const item = mediaItems.find((element) => element.media_id == req.params.id);
    if (item) {
      res.status(200);
      res.json(item);
    } else {
      res.status(404);
      res.json({message: "Item not found."});
    }
  };

    
  const postItem = (req, res) => {
    console.log('postItem', req.body.filename);
    if (req.body.filename) {
      mediaItems.push({media_id: Math.floor(100 + Math.random() * 900), filename: req.body.filename, title: req.body.title, description: req.body.description, user_id: req.body.user_id, media_type: req.body.media_type});
      res.status(201);
      res.json({message: `Item ${req.body.filename} posted`});
    } else {
      res.status(400);
      res.json({message: "Missing filename"})
    }
  };

  const putItem = (req, res) => {
    console.log('putItem with id', req.params.id);
    if (req.body.title && req.body.description) {
      // if item exists in the array, update it based on id, otherwise send 404
      const item = mediaItems.find((element) => element.media_id == req.params.id);
      if (item) {
          item.title = req.body.title;
          item.description = req.body.description;
          res.status(200);
          res.json({message: `Item with id ${req.params.id} changed`});
      } else {
        res.status(404);
        res.json({message: "Item not found"})
      }
} else {
  res.status(400);
  res.json({message: "Missing data"})
}
};
  const deleteItem = (req, res) => {
    console.log('deleteItem', req.params);
    // if item exists in the array, delete it based on id, otherwise send 404
    const index = mediaItems.findIndex((element) => element.media_id == req.params.id);
    // when item is not found, index -1 is returned; if-statement is used here to prevent it
    if (index != -1) {
    mediaItems.splice(index, 1);
    res.status(204);
    }
    else {
        res.status(404);
        res.json({message: "Item not found."});
    }
  }

  

export {getItems, getItemsById, postItem, deleteItem, putItem}