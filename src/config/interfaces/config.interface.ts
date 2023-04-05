export type NodeEnv = 'development' | 'production' | 'staging';

export interface PostgresConfig {
  DB_HOST: string;
  DB_PORT: number;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_NAME: string;
}

export interface Config {
  nodeEnv: NodeEnv;
  port: number;
  db: PostgresConfig;
}
