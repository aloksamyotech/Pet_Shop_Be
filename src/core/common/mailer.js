import Brevo from "@getbrevo/brevo";
import SibApiV3Sdk from "sib-api-v3-sdk";
import dotenv from "dotenv";
dotenv.config();

const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey = process.env.BREVO_API_KEY;

const sendEmail = async (to, subject, text) => {
    try {
      const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi
      const emailData = new SibApiV3Sdk.SendSmtpEmail();
      emailData.sender = { 
        email: "priti.sahu@samyotech.com", 
        name: "Priti Sahu" 
      }; 
      emailData.to = [{ email: to }];
      emailData.subject = subject;
      emailData.htmlContent = `<p>${text}</p>`;
  
      const response = await apiInstance.sendTransacEmail(emailData);
  } catch (error) {
      console.error("Error sending email:", JSON.stringify(error.response?.body || error.message, null, 2));
    }
  };
  
export default sendEmail;
