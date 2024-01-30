/* import { HttpService } from '@nestjs/axios';

import config from '@app/config/config';
import axios from 'axios';
const ERR_MESSAGES = {
  10: 'إعدادات SMS غير صحيحة يرجى مراجعة الإدارة',
  20: 'الرقم المرسل منه غير صالح',
  21: 'الرقم المرسل منه غير صالح',
  40: 'تعذر إرسال الرسالة خطأ رقم 40',
  50: 'تعذر إرسال الرسالة خطأ رقم 50',
  51: 'تعذر إرسال الرسالة خطأ رقم 51',
  60: 'الرقم المرسل إليه غير صالح',
};
export class YamamahSmsService {
  sendMessage = (phone, msg) => {
    try {
      const url = `
        ${config.SMS.yamamah_service_base_url}/${config.SMS.msg_type}
      `;

      axios.post(
        url,
        {
          strUserName: config.SMS.user_account,
          strPassword: config.SMS.password,
          strRecepientNumber: phone,
          strTagName: config.SMS.sender,
          strMessage: msg,
          sendDateTime: 0,
        },
      )
    } catch (error) {
      throw new Error(error);
    }
            
    // return new Promise((resolve, reject) => {
    //   const url = `${config.SMS.yamamah_service_base_url}/${config.SMS.msg_type}`;
    //   axios
    //     .post(url, {
    //       strUserName: config.SMS.user_account,
    //       strPassword: config.SMS.password,
    //       strRecepientNumber: phone,
    //       strTagName: config.SMS.sender,
    //       strMessage: msg,
    //       sendDateTime: 0,
    //     })
    //     .catch((err) => {
    //       reject(err);
    //     })
    //     .then((res) => {
    //       if (!res) reject('network error');
    //       else {
    //         const error_code = Math.abs(res.data.d);
    //         if (ERR_MESSAGES[error_code]) {
    //           reject({ message: ERR_MESSAGES[error_code] });
    //         } else resolve('تم إرسال الرسالة بنجاح');
    //       }
    //     });
    // });
  };
}
 */
