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

/**
 * Deletes an item based on its id
 *
 * @param {object} req - http request with item id
 * @param {object} res - http response
 */

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

  
