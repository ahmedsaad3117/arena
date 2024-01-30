// sms.service.ts

import { Injectable } from "@nestjs/common";
import axios from "axios";

@Injectable()
export class SmsService {
  async sendWelcomeAndOtp(user: any, otp: string): Promise<any> {
    console.log(`sending otp : ${otp} : user : ${user}`);

    const apiKey =
      "1b08ba9397efc6d2f528bbe038b00b51-a9b5feaf-0735-4345-b052-4ed798c35f51";
    const apiUrl = "https://8gxw51.api.infobip.com/sms/2/text/advanced";

    const messages = [
      {
        destinations: [{ to: user }],
        from: "NestSMS",
        text: `Test Nestjs,\n\nThis is a test message. Your OTP is: ${otp}. Have a nice day!`,
      },
    ];

    const payload = {
      messages,
    };

    const headers = {
      Authorization: `App ${apiKey}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    try {
      const response = await axios.post(apiUrl, payload, { headers });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error.message;
    }
  }
}
