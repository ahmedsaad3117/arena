import {
  BadRequestException,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import config from "../config/config";
import { log } from "console";
import { UsersBaseService } from "src/user/providers/users.base.service";
import { CustomerService } from "src/customer/providers/customer.service";
import { UserRequest } from "../classes/static-user-request.class";
import Config from "../config/config";

declare module "express" {
  export interface Request {
    user: any;
  }
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private userService: UsersBaseService,
    private customerService: CustomerService
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    console.log("AuthMiddleware works");

    const routePrefix = req.originalUrl.split("/")[1]; //    /v1/customer/cart/add => customer
    console.log("Request url : ", req.originalUrl);

    try {
      if (req.headers.authorization) {
        const jwtSecret = Config.JWT_SECRET;
        const token = req.headers.authorization.split(" ")[1];
        if (!token) return next();
        const decodedData: any = jwt.verify(token, jwtSecret);
        const id = decodedData.id;
        const email = decodedData.email;
        let adminOrCustomer = null;

        if (routePrefix === "customer") {
          UserRequest.setIsCustomerTrue();

          adminOrCustomer = await this.customerService.findOneWithoutError(
            null,
            { id, email }
          );
        } else if (routePrefix === "admin") {
          UserRequest.setIsAdminTrue();
          adminOrCustomer = await this.userService.findOnePopulatedHelper(
            null,
            { id, email }
          );
        }

        req.user = adminOrCustomer;
      }
    } catch (error) {
      return next();
    }

    return next();
  }
}
