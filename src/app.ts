import express, { Application } from "express";
import { PORT } from "./constants";
import { logger } from "./utils/logger";
import IRoute from "./interface/route.interface";
import UnknownEndpoint from "./controllers/unknown.controller";
import errorMiddleware from "./middlewares/error.middleware";

export default class App {
  private app: Application
  private port: number

  constructor(routes: IRoute[]) {
    this.app = express();
    this.port = PORT;
    this.initializeRoutes(routes);
    this.initializeMiddlewares();
    this.handleUnknownEndpoint();
    this.initializeGlobalErrorHandler();
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      logger.info('==================================');
      logger.info(`App listening on localhost:${this.port} 🚀`);
      logger.info('==================================');
    })
  }

  private initializeRoutes(routes: IRoute[]): void {
    routes.forEach(route => this.app.use('/v1', route.router))
  }

  private initializeMiddlewares(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private async handleUnknownEndpoint() {
    this.app.all('*', UnknownEndpoint.handler);
  }

  private initializeGlobalErrorHandler() {
    this.app.use(errorMiddleware);
  }

  public getServer(): Application {
    return this.app;
  }
}
