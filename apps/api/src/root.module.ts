import {
  type MiddlewareConsumer,
  Module,
  type NestModule,
  type OnModuleInit,
} from "@nestjs/common";

import { LoggerMiddleware } from "./shared/middleware";
import { VizoModule } from "./modules/vizo.module";
import { LoggerModule } from "./core/logger";

@Module({
  imports: [VizoModule, LoggerModule.forRoot()],
})
export class RootModule implements OnModuleInit, NestModule {
  onModuleInit() {}
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*");
  }
}
