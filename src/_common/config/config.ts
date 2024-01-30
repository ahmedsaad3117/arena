import * as dotenv from "dotenv";
dotenv.config();
let Config = {
  APPROVE_REQUESTS: process.env.APPROVE_REQUESTS,
  APP_PORT: process.env.APP_PORT,
  DB_HOST: process.env.DB_HOST,
  DB_TYPE: process.env.DB_TYPE,
  DB_PORT: process.env.DB_PORT,
  DB_NAME: process.env.DB_NAME,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  APP_NAME: process.env.APP_NAME,
  APP_URL: process.env.APP_URL,
  APP_PATH_URL: process.env.APP_PATH_URL,
  NODEMAILER_EMAIL: process.env.NODEMAILER_EMAIL,
  NODEMAILER_PASSWORD: process.env.NODEMAILER_PASSWORD,
  NODEMAILER_NAME: process.env.NODEMAILER_NAME,
  TAP_PAYMENT: process.env.TAP_PAYMENT,
  FRONTEND_URL: process.env.FRONTEND_URL,
  TAP_PAYMENT_SECRET_KEY: process.env.TAP_PAYMENT_SECRET_KEY,
  JWT_SECRET: process.env.JWT_SECRET,
  MAILER_PROVIDER: process.env.MAILER_PROVIDER,
};

export default Config;
