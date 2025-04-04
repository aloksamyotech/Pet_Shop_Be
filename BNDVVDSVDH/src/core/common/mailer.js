import nodemailer from "nodemailer";
import PDFDocument from "pdfkit";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
    auth: {
        user: "879aaa001@smtp-brevo.com", 
        pass: "B6sYF2k9Et5qHxmS",   
    }
});


const sendMail = async (to, subject, text, html,attachmentPath) => {
    try {
        const mailOptions = {
            from: 'ps8941844@gmail.com', 
            to: to, 
            subject: subject,
            text: text, 
            html: html ,
            attachments: [
                {
                  filename: "invoice.pdf",
                  path: attachmentPath,
                }
              ]
        };

        const info = await transporter.sendMail(mailOptions);
        
        return info;
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
};

export default sendMail;
