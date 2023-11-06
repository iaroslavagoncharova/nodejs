// mock items data
const items = [
    {id: 1, name: 'maito'},
    {id: 2, name: 'munat'},
    {id: 3, name: 'omenat'},
    {id: 4, name: 'juusto'},
    {id: 5, name: 'musta tee'}
  ];

/**
* Gets all items
*
* @param {object} req - http request
* @param {object} res - http response
*/

const getItems = (req, res) => {
  const limit = req.query.limit;
  // TODO: check that the param value is int before using
  if (limit) {
    res.json(items.slice(0, limit));
  } else {
    res.json(items);
  }
};
  
  const getItemsById = (req, res) => {
    // if item with id exists send it, otherwise send 404
    console.log('getItemsById', req.params);
    const item = items.find((element) => element.id == req.params.id);
    if (item) {
      res.json(item);
    } else {
      res.status(404);
      res.json({message: "Item not found."});
    }
  };
  
  const postItem = (req, res) => {
    console.log('new item posted', req.body);
    // TODO: check last weeks example for generating an id
    if (req.body.name) {
      items.push({id: 0, name: req.body.name});
      res.sendStatus(201);
    } else {
      res.sendStatus(400);
    }
  };
  
  const deleteItem = (res, id) => {
    // if item exists in the array, delete it based on id, otherwise send 404
    const index = items.findIndex((element) => element.id == id);
    // when item is not found, index -1 is returned; if-statement is used here to prevent it
    if (index != -1) {
    items.splice(index, 1);
    res.writeHead(204, {'Content-Type': 'application/json'});
    res.end(`{"message":"Item deleted"}`);
    }
    else {
        res.writeHead(404, {'Content-Type': 'application/json'});
        res.end(`{"message": "Item not found"}`);
    }
  }

  // TODO: add deleteItem(), putItem() and routing for those in index.js
  
  export {getItems, getItemsById, postItem, deleteItem}