import express from 'express';
import path from 'path';
import {fileURLToPath} from 'url';
import mediaRouter from './routes/media-router.mjs';
import userRouter from './routes/user-router.mjs';
import authRouter from './routes/auth-router.mjs';
import { logger } from './middlewares/middlewares.mjs';
import commentsRouter from './routes/comments-router.mjs';
import {notFoundHandler, errorHandler} from './middlewares/middlewares.mjs';
import helmet from 'helmet';
import session from 'cookie-session';

const hostname = '127.0.0.1';
const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'pug');
app.set('views', 'src/views')
app.disable('x-powered-by');
app.use(helmet());

const expiryDate = new Date(Date.now() + 60 * 60 * 1000);

app.use(
  session({
    name: 'session',
    keys: ['key1', 'key2'],
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      domain: 'localhost',
      path: '/',
      expires: expiryDate,
    },
  })
);

app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', "script-src 'self' 'unsafe-eval'");
  next();
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/docs', express.static(path.join(__dirname, '../docs')));
// serve uploaded mediafiles url: /media/{file}
app.use('/media', express.static(path.join(__dirname, '../uploads')));

app.use(logger);

// auth endpoints
app.use('/api/auth', authRouter);

// media endpoints
app.use('/api/media', mediaRouter);

// user endpoints
app.use('/api/users', userRouter);

// comments endpoints
app.use('/api/comments', commentsRouter);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});