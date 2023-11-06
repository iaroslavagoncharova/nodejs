import express from 'express';
import path from 'path';
import {fileURLToPath} from 'url';
import { getItems, getItemsById, deleteItem, putItem, postItem } from './media.js';

const hostname = '127.0.0.1';
const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'pug');
app.set('views', 'src/views')
app.use(express.json());
app.use('/docs', express.static(path.join(__dirname, '../docs')));
app.use('/media', express.static(path.join(__dirname, './media')));
// simple custom middleware for login/debugging 
app.use((req, res, next) => {
  console.log('Time:', Date.now(), req.method, req.url)
  next()
})

app.get('/', (req, res) => {
  const values = {title: "Media REST API", message: "TODO: the task???"};
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

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});