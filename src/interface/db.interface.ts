export interface DB {
  readonly database: string;
  readonly username: string;
  readonly password: string;
  readonly host: string;
  readonly dialect: 'postgres' | 'mysql' | 'sqlite' | 'mariadb' | 'mssql';
  readonly port?: number;
}
