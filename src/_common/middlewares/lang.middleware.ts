import { Injectable, NestMiddleware } from "@nestjs/common";
import { UserRequest } from "../classes/static-user-request.class";

@Injectable()
export class RequestLangMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: () => any): Promise<any> {
    console.log("RequestLangMiddleware works");

    UserRequest.setLang(req.headers["accept-language"] || "ar");
    if (!req.headers["accept-language"]) req.headers["accept-language"] = "ar";
    next();
  }
}
