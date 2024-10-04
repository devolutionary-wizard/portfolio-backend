import express, { Application } from "express";
import { PORT } from "./constants";
import { logger } from "./utils/logger";
import IRoute from "./interface/route.interface";

export default class App {
  private app: Application
  private port: number

  constructor(routes: IRoute[]) {
    this.app = express();
    this.port = PORT;
    this.initializeRoutes(routes)
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

  public getServer(): Application {
    return this.app;
  }
}
