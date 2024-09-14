import { type DynamicModule, Module } from "@nestjs/common";

import { RequestLogInterceptor } from "./interceptor/request-log.interceptor";
import { HttpModule } from "@nestjs/axios";

@Module({})
export class LoggerModule {
  static forRoot(): DynamicModule {
    const providers = [RequestLogInterceptor];

    return {
      global: true,
      exports: providers,
      imports: [
        HttpModule.register({
          timeout: 5000,
        }),
      ],
      providers: providers,
      module: LoggerModule,
    };
  }
}
