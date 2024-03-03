import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import authorizationRoutes from './routes/authorization.routes';
import healthcheck from './endpoints/health/healthcheck.endpoint';
import testRoutes from './routes/testroute';

/**
 * Application configuration for routes and middlewares
 * @module app
 * @requires express
 * @requires morgan
 * @requires cors
 * @requires authorizationRoutes
 * @requires verifyToken
 * @requires healthcheck
 * **/

class Boostrap {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  private config(): void {
    this.app.use(morgan('dev'));
    this.app.use(express.json());
    this.app.use(cors());
  }

  private routes(): void {
    this.app.use('/authorization', authorizationRoutes);
    this.app.use('/healthcheck', healthcheck);
    this.app.use('/test', testRoutes);
  }
}

export default new Boostrap().app;