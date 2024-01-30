export const sendOtpHtmlContent = (otp: any) => {
  const otpHtmlContent = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      body {
        text-align: center;
      }
      .container{
          margin: 0 0 20px 20px ;
        padding: 0 0  20px;
         border: 1px solid #3498db;
        border-radius: 5px;
          text-align: center;
      }
      .header{
         background-color: #2980b9;
      
         color: #ffffff;
        padding: 20px 20px;
        font-weight:bold
      }
    
      .otp {
        font-size: 24px;
        font-weight: bold;
        color: #3498db;
      }
  
      .button {
        display: inline-block;
        padding: 10px 20px;
        font-size: 16px;
        text-align: center;
        text-decoration: none;
        background-color: #3498db;
        color: #ffffff;
        border: 1px solid #3498db;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s;
      }
  
      /* Add a hover effect to the button */
      .button:hover {
        background-color: #2980b9; /* Darker blue on hover, you can change this */
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">XChange</div>
        <div class="otp-container">
      
      <p>Your One-Time Password (OTP)   </p>
      <p class="otp">${otp}</p>
      <a href="#" class="button">Verify OTP</a>
    </div>
    </div>
  
  </body>
  </html>
  `;

  return otpHtmlContent;
};
