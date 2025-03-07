import sendEmail from "../core/common/mailer.js";

export const loginEmailTemplate = async (email, userName) => {
    
  const emailContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; padding: 20px;">
      <div style="text-align: center; background-color: #ffcc00; padding: 15px; border-radius: 8px 8px 0 0;">
        <h2 style="color: #333;">🐾 Welcome to Pets Shop! 🐾</h2>
      </div>
      <div style="padding: 20px;">
        <p style="font-size: 16px; color: #555;">
          Hello <strong>${userName}</strong>,  
        </p>
        <p style="font-size: 16px; color: #555;">
          You have successfully logged into <strong>Pets Shop</strong>. We are thrilled to have you back!
        </p>
        <p style="font-size: 16px; color: #555;">
          Explore our latest pet collections, food, and accessories designed for your furry friends! 🐶🐱
        </p>
        <div style="text-align: center; margin: 20px 0;">
          <a href="https://your-petshop.com" style="text-decoration: none; background-color: #ffcc00; color: #333; padding: 10px 20px; border-radius: 5px; font-size: 16px;">Visit Pets Shop</a>
        </div>
        <p style="font-size: 14px; color: #888; text-align: center;">
          If you didn’t log in, please contact our support team immediately.
        </p>
      </div>
      <div style="background-color: #f4f4f4; padding: 10px; text-align: center; border-radius: 0 0 8px 8px;">
        <p style="font-size: 12px; color: #666;">&copy; 2025 Pets Shop. All rights reserved.</p>
      </div>
    </div>
  `;

  await sendEmail(email, "Welcome to Pets Shop!", emailContent);
};
