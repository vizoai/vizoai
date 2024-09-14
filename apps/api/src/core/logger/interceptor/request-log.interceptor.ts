import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  Logger,
  NestInterceptor,
} from "@nestjs/common";
import { tap } from "rxjs";
import { HttpService } from "@nestjs/axios";
import { FastifyReply, FastifyRequest } from "fastify";
import { getClientIp } from "request-ip";

@Injectable()
export class RequestLogInterceptor implements NestInterceptor {
  private readonly logger = new Logger(RequestLogInterceptor.name);

  @Inject(HttpService)
  private httpService: HttpService;

  async ipToCity(ip: string) {
    const response = await this.httpService.axiosRef.get(
      `https://whois.pconline.com.cn/ipJson.jsp?ip=${ip}&json=true`,
      { responseType: "arraybuffer" },
    );
    return JSON.parse(new TextDecoder("gbk").decode(response.data)).addr;
  }

  async intercept(context: ExecutionContext, next: CallHandler<any>) {
    const request = context.switchToHttp().getRequest<FastifyRequest>();
    const response = context.switchToHttp().getResponse<FastifyReply>();

    const userAgent = request.headers["user-agent"];

    const { method, url } = request;

    const clientIp = getClientIp(request);
    console.log("clientIp", clientIp);
    const city = await this.ipToCity(clientIp);

    this.logger.log(
      `${method} ${url} ${clientIp} ${userAgent}: ${context.getClass().name} ${
        context.getHandler().name
      } city: ${city}`,
    );

    const now = Date.now();

    return next.handle().pipe(
      tap((res) => {
        this.logger.log(
          `${method} ${url} ${clientIp} ${userAgent}: ${response.statusCode}: ${Date.now() - now}ms`,
        );
        this.logger.debug(`Response: ${JSON.stringify(res)}`);
      }),
    );
  }
}
