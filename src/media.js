
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

  
