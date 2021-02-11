import express from 'express';
import 'express-async-errors';
import morgan from 'morgan';

import uploadConfig from './config/upload';

import AppError from './erros/AppError';

import allowCors from './middlewares/cors';
import routes from './routes/index';

require('./database/index');

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(allowCors);

    this.server.use(
      morgan(`[:date] - :method [:status] :url - :response-time ms`)
    );
  }

  routes() {
    this.server.use('/files', express.static(uploadConfig.directory));
    this.server.use(routes);
    this.server.use((err, req, res, next) => {
      if (err instanceof AppError) {
        return res
          .status(err.statusCode)
          .json({ status: 'error', message: err.message });
      }

      console.error(err);

      return res
        .status(500)
        .json({ status: 'error', message: 'Internal Server Error' });
    });
  }
}

export default new App().server;
