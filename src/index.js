import express from 'express';
import path from 'path';
import {fileURLToPath} from 'url';
import mediaRouter from './routes/media-router.mjs';
import userRouter from './routes/user-router.mjs';
import { logger } from './middlewares/middlewares.mjs';

const hostname = '127.0.0.1';
const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'pug');
app.set('views', 'src/views')
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/docs', express.static(path.join(__dirname, '../docs')));
// serve uploaded mediafiles url: /media/{file}
app.use('/media', express.static(path.join(__dirname, '../uploads')));

// simple custom middleware for logging/debugging all requests
app.use(logger);

// render pug a file (home.pug) example
app.get('/', (req, res) => {
  const values = {title: "Media REST API", message: "This API has a basic functionality and can be used to retrieve, create, change, or delete mock data, such as media objects or users. This functionality is achieved by using basic REST-methods, such as GET, POST, PUT and DELETE, and displaying status codes 200, 201, 204, 404 and 400. Mock media files are also present as real images and can be served anywhere in the API"};
  res.render('home', values);
});

// media endpoints
app.use('/api/media', mediaRouter);

// user endpoints
app.use('/api/users', userRouter);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});