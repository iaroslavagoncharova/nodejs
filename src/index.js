import express from 'express';
import path from 'path';
import {fileURLToPath} from 'url';
import { getItems, getItemsById, deleteItem, putItem, postItem } from './media.js';
import { getUsers, getUsersById, postUser, putUser, deleteUser} from './users.js';

const hostname = '127.0.0.1';
const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'pug');
app.set('views', 'src/views')
app.use(express.json());
app.use('/docs', express.static(path.join(__dirname, '../docs')));
app.use('/media', express.static(path.join(__dirname, '/media')));
// simple custom middleware for login/debugging 
app.use((req, res, next) => {
  console.log('Time:', Date.now(), req.method, req.url)
  next()
})

app.get('/', (req, res) => {
  const values = {title: "Media REST API", message: "This API has a basic functionality and can be used to retrieve, create, change, or delete mock data, such as media objects or users. This functionality is achieved by using basic REST-methods, such as GET, POST, PUT and DELETE, and displaying status codes 200, 201, 204, 404 and 400. Mock media files are also present as real images and can be served anywhere in the API"};
  res.render('home', values);
});

// get all items
app.get('/api/media', getItems);
// get an item by id
app.get('/api/media/:id', getItemsById);
// modify an item by id
app.put('/api/media/:id', putItem);
// add a new item
app.post('/api/media', postItem);
// remove an existing item by id
app.delete('/api/media/:id', deleteItem);

// get all users
app.get('/api/user', getUsers);
// get a user by id
app.get('/api/user/:id', getUsersById);
// modify a user by id
app.put('/api/user/:id', putUser);
// add a new user
app.post('/api/user', postUser);
// remove an existing user by id
app.delete('/api/user/:id', deleteUser);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});