import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

import { Config, EnvironmentVariables } from '../interfaces';

@Injectable()
export class ConfigService {
  private readonly _config: Config;

  constructor(private readonly _nestJsConfigService: NestConfigService<EnvironmentVariables>) {
    this._config = this.createConfig();
  }

  private createConfig(): Config {
    const config = this._nestJsConfigService;

    const port = config.get('APP_PORT') ?? 3000;
    const nodeEnv = config.get('NODE_ENV') ?? 'development';
    return {
      nodeEnv,
      port,
      db: {
        DB_HOST: 'localhost',
        DB_PORT: 5432,
        DB_USER: 'postgres',
        DB_PASSWORD: 'qwerty123456',
        DB_NAME: 'main',
      },
    };
  }

  isDev(): boolean {
    return this.config.nodeEnv === 'development';
  }

  isProduction(): boolean {
    return this.config.nodeEnv === 'production';
  }

  public get config(): Config {
    return this._config;
  }
}
