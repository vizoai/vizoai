import {
  type MiddlewareConsumer,
  Module,
  type NestModule,
  type OnModuleInit,
} from "@nestjs/common";

import { VizoModule } from "./modules/vizo.module";
import { LoggerModule } from "./core/logger";

@Module({
  imports: [
    LoggerModule.forRoot({ global: true }),
    VizoModule,
  ],
})
export class RootModule implements OnModuleInit, NestModule {
  onModuleInit() { }
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware).forRoutes("*");
  }
}
