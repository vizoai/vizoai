import { NestFastifyApplication } from "@nestjs/platform-fastify";
import { createFastifyAdapter } from "./shared/adapters";
import { NestFactory } from "@nestjs/core";
import { RootModule } from "./root.module";
import { generateSwagger } from "./swagger";
import { VERSION_NEUTRAL, VersioningType } from "@nestjs/common";
import { RequestLogInterceptor } from "./core/logger";

const prefix = "/api";

export class Vizo {
  protected static _this: Vizo;
  protected config: any;
  protected app: NestFastifyApplication;
  public readonly port: string;

  constructor() {
    process.env.PORT = process.env.PORT || "3001";
    this.port = process.env.PORT;
  }

  static async init() {
    const now = Date.now();
    const vizo = new Vizo();
    const fastifyAdapter = await createFastifyAdapter();
    const nestApp = await NestFactory.create<NestFastifyApplication>(
      RootModule,
      fastifyAdapter,
    );
    nestApp.setGlobalPrefix(prefix);
    const interceptors = [nestApp.get(RequestLogInterceptor)];
    nestApp.useGlobalInterceptors(...interceptors);

    nestApp.enableVersioning({
      type: VersioningType.HEADER,
      defaultVersion: [VERSION_NEUTRAL],
      header: "v",
    });

    nestApp.enableCors();
    nestApp.flushLogs();
    const port = vizo.port;
    const url = `http://localhost:${port}`;
    await nestApp.init();
    generateSwagger(nestApp, url);
    console.log(`Application started on: ${url} in ${Date.now() - now}ms`);
    vizo.app = nestApp;
    return vizo;
  }

  async run() {
    await this.app.listen(this.port, "0.0.0.0");
  }
}

export default Vizo;
