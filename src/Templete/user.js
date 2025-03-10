export const registrationEmailTemplate = (firstName) => {
    return `
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; }
                .container { max-width: 600px; margin: auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); }
                .header { background: #4CAF50; padding: 15px; text-align: center; color: white; font-size: 24px; font-weight: bold; border-radius: 8px 8px 0 0; }
                .content { padding: 20px; font-size: 16px; color: #333; }
                .footer { text-align: center; padding: 15px; font-size: 14px; color: #777; }
                .btn { background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; font-weight: bold; border-radius: 5px; display: inline-block; margin-top: 10px; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">Welcome to Pet Shop!</div>
                <div class="content">
                    <p>Hi ${firstName},</p>
                    <p>We're excited to have you at <b>Pet Shop</b>! Thank you for registering with us.</p>
                    <p>We are committed to providing the best products and services for your beloved pets.</p>
                    <p>Explore our latest collections and offers by visiting our store.</p>
                    <p><a href="https://your-petshop.com" class="btn">Visit Pet Shop</a></p>
                </div>
                <div class="footer">
                    <p>Best Regards,</p>
                    <p><b>Pet Shop Team</b></p>
                </div>
            </div>
        </body>
        </html>
    `;
};
