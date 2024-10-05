import express, { Application } from "express";
import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USERNAME, PORT } from "./constants";
import { logger } from "./utils/logger";
import IRoute from "./interface/route.interface";
import UnknownEndpoint from "./controllers/unknown.controller";
import errorMiddleware from "./middlewares/error.middleware";
import { Database } from "./core/database";

export default class App {
  private app: Application
  private port: number

  constructor(routes: IRoute[]) {
    this.app = express();
    this.port = PORT;
    this.initializeRoutes(routes);
    this.initializeMiddlewares();
    this.handleUnknownEndpoint();
    this.initializeDatabase();
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

  private async initializeDatabase(): Promise<void> {
    await new Database({
      dialect: 'postgres',
      host: DB_HOST,
      port: DB_PORT,
      username: DB_USERNAME,
      password: DB_PASSWORD,
      database: DB_DATABASE,
    }).connect();
  }

  public getServer(): Application {
    return this.app;
  }
}
