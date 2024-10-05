import { Sequelize } from "sequelize-typescript";
import { DB } from "../interface/db.interface";
import { logger } from "../utils/logger";
import Project from "../models/project.model";

class Database {
  private sequelize: Sequelize;

  constructor(db: DB) {
    this.sequelize = new Sequelize({
      dialect: db.dialect,
      host: db.host,
      port: db.port,
      username: db.username,
      password: db.password,
      database: db.database,
      models: [__dirname + '/../models'],
      logging: (msg) => logger.debug(msg),
    })
  }

  public async getInstance(): Promise<Sequelize> {
    try {
      return this.sequelize;
    } catch (error) {
      logger.error('Error creating the sequelize instance');
      throw error;
    }
  }

  public async connect(): Promise<void> {
    try {
      await this.sequelize.authenticate();
      this.alterDatabase();
      logger.info('Connection has been established successfully');
    } catch (error) {
      logger.error('Unable to connect to the database: ', error);
      throw error;
    }
  }

  public async disconnect(): Promise<void> {
    try {
      await this.sequelize.close();
      logger.info('Database has been successfully disconnected');
    } catch (error) {
      logger.error('Error disconnecting from the database:', error);
      throw error;
    }
  }

  public async alterDatabase(): Promise<void> {
    try {
      await this.sequelize.sync({ alter: true, logging: false });
      logger.info('Database has been successfully altered');
    } catch (error) {
      logger.error('Error altering the database:', error);
      throw error;
    }
  }

  public async dropDatabase(): Promise<void> {
    try {
      await this.sequelize.sync({ force: true });
      logger.info('Test database has been successfully dropped');
    } catch (error) {
      logger.error('Error dropping the database:', error);
      throw error;
    }
  }
}

export { Database };
