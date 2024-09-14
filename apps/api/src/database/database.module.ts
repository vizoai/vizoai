import {
  type DynamicModule,
  Module,
  OnApplicationShutdown,
} from "@nestjs/common";

import { ConfigService } from "../config/config.service";
import { DatabaseService } from "./database.service";
import { DatabaseModuleOptions } from "./constant";

@Module({})
export class DatabaseModule implements OnApplicationShutdown {
  static forRoot(options: DatabaseModuleOptions = {}): DynamicModule {
    const { logger = false, timeout = 3000 } = options;
    return {
      module: DatabaseModule,
      providers: [
        {
          provide: DatabaseService,
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => {
            return new DatabaseService(configService, {
              logger,
              timeout,
            });
          },
        },
      ],
      global: true,
      exports: [DatabaseService],
    };
  }

  async onApplicationShutdown(): Promise<void> {}
}
