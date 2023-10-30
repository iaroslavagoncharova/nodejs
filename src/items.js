  // mock items data
const items = [
    {id: 1, name: 'maito'},
    {id: 2, name: 'munat'},
    {id: 3, name: 'omenat'},
    {id: 4, name: 'juusto'},
    {id: 5, name: 'musta tee'}
  ];
  
  const getItems = (res) => {
    // get all existing items
    res.writeHead(200, {'Content-Type': 'application/json'});
    const jsonItems = JSON.stringify(items);
    res.end(`{"message": "The list", "items": ${jsonItems}}`);
  };
  
  const getItemsById = (res, id) => {
    // if item with id exists send it, otherwise send 404
    const item = items.find((element) => element.id == id);
    if (item) {
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(JSON.stringify(item));
    } else {
      res.writeHead(404, {'Content-Type': 'application/json'});
      res.end('{"message": "Item not found"}');
    }
  };
  
  const postItem = (req, res) => {
    // create a new item
    let body = [];
    req
      .on('error', (err) => {
        console.error(err);
      })
      .on('data', (chunk) => {
        body.push(chunk);
      })
      .on('end', () => {
        body = Buffer.concat(body).toString();
        console.log('req body', body);
        body = JSON.parse(body);
        // check if body is "valid"
        if (!body.name) {
          res.writeHead(400, {'Content-Type': 'application/json'});
          res.end(`{"message": "Missing data"}`);
          return;
        }
        // check id of the last item in items and add 1
        const newId = items[items.length - 1].id + 1;
        items.push({id: newId, name: body.name});
        res.writeHead(201, {'Content-Type': 'application/json'});
        res.end(`{"message": "New item added"}`);
      });
  };

  const putItem = (req, res, id) => {
    // if item exists in the array, update it based on id, otherwise send 404
    const item = items.find((element) => element.id == id);
    if (item) {
        let body = [];
        req
      .on('error', (err) => {
        console.error(err);
      })
      .on('data', (chunk) => {
        body.push(chunk);
      })
      .on('end', () => {
        body = Buffer.concat(body).toString();
        body = JSON.parse(body);
        // check if body is "valid"
        if (!body.name) {
          res.writeHead(400, {'Content-Type': 'application/json'});
          res.end(`{"message": "Missing data"}`);
          return;
        }
        item.name = body.name;
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(`{"message":"Item modified"}`);
        })} else {
      res.writeHead(404, {'Content-Type': 'application/json'});
      res.end(`{"message": "Item not found"}`);}
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

  export {getItems, getItemsById, postItem, putItem, deleteItem};