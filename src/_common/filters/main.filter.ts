import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  BadRequestException,
  Logger,
} from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";
import { log } from "console";
import { I18nContext } from "nestjs-i18n";
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  protected readonly logger: Logger;
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {
    this.logger = new Logger(AllExceptionsFilter.name);
  }

  async catch(exception: any, host: ArgumentsHost): Promise<void> {
    this.logger.warn(exception?.message);
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const i18n = I18nContext.current(host);
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let responseBody;

    if (exception?.name === "UpdateValuesMissingError") {
      responseBody = {
        statusCode: httpStatus,
        timestamp: new Date().toISOString(),
        message: exception.message,
        path: httpAdapter.getRequestUrl(ctx.getRequest()),
      };
    }

    if (exception?.errno === 1054) {
      if (exception.sql.includes("NaN")) {
        exception.message =
          "Please, Make sure to send numbers only, Do NOT send letters with it.";
      } else {
        exception.message = "Please, Check from the input data!";
      }
    }

    responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      message: exception.message,
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
    };
    if (exception instanceof BadRequestException) {
      responseBody = exception.getResponse();
      responseBody["errors"] = {};
      if (Array.isArray(responseBody.message)) {
        for (let iterator of responseBody.message) {
          // get errors key from message key before translation
          let key = iterator.split(" ")[0];
          let transKey = iterator.split(".")[1];
          if (transKey && transKey.split("_")[0]) {
            key = iterator.split(".")[1].split("_")[0];
            iterator = i18n.t(iterator);
          }
          console.log("key", key);

          if (responseBody["errors"][key]) {
            responseBody["errors"][key] = [
              ...responseBody["errors"][key],
              iterator,
            ];
            continue;
          }
          responseBody["errors"][key] = [iterator];
        }
      }
    }

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
