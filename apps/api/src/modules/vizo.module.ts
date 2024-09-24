import {
  type MiddlewareConsumer,
  Module,
  type NestModule,
} from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";

import { AuthModule } from "../auth";
import { CacheModule } from "../cache";
import { ConfigModule } from "../config";
import { DatabaseModule } from "../database";
import { AccountModule } from "./account";
import { AppsModule } from "./apps";
import { FileModule } from "./file";
import { HealthModule } from "./health";
import { ModelModule } from "./model";
import { ProviderModule } from "./provider";
import { TaskModule } from "./task";
import { ToolModule } from "./tool";
import { UserModule } from "./user";
import { QueueModule } from "../queue/queue.module";

@Module({
  imports: [
    ConfigModule,
    QueueModule,
    CacheModule,
    UserModule,
    ScheduleModule.forRoot(),
    DatabaseModule.forRoot({ logger: true }),
    AuthModule,
    ModelModule,
    TaskModule,
    ProviderModule,
    AccountModule,
    ToolModule,
    FileModule,
    AppsModule,
    HealthModule,
  ],
})
export class VizoModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    //
  }
}
