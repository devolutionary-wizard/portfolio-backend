import express, { Application } from "express";
import { PORT } from "./constants";
import { logger } from "./utils/logger";

export default class App {
  private app: Application
  private port: number

  constructor() {
    this.app = express();
    this.port = PORT
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      logger.info('==================================');
      logger.info(`App listening on localhost:${this.port} 🚀`);
      logger.info('==================================');
    })
  }
}
