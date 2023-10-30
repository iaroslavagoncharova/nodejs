import http from 'http';
import {getItems, getItemsById, postItem, putItem, deleteItem} from './items.js';
const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  console.log('request', req.method, req.url);
  const {method, url} = req;
  const reqParts = url.split('/');
  // check method, url and generate response accordingly (=routing)
  if (method === 'GET' && url === '/') {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<h1>Here is my dummy REST API: </h1>');
    res.write('<p>a shopping list with some items</p>');
    res.end();
  } else if (method === 'GET' && reqParts[1] === 'items' && reqParts[2]) {
    console.log('GETting the item with id', reqParts[2]);
    getItemsById(res, reqParts[2]);
  } else if (method === 'GET' && reqParts[1] === 'items') {
    console.log('GETting all items');
    getItems(res);
  } else if (method === 'POST' && reqParts[1] === 'items') {
    console.log('POSTing a new item');
    postItem(req, res);
  } else if (method === 'PUT' && reqParts[1] === 'items' && reqParts[2]) {
    console.log('PUTting the item with id', reqParts[2]);
    putItem(req, res, reqParts[2])}
    else if (method === 'DELETE' && reqParts[1] === 'items' && reqParts[2]){
      console.log('DELETing the item with id', reqParts[2]);
      deleteItem(res, reqParts[2])
    }
    else {
    res.writeHead(404, {'Content-Type': 'application/json'});
    res.end('{"message": "404 Resource not found!"}');
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});