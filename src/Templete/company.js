export const companyNotificationTemplate = (companyName, companyEmail, phoneNumber, address) => {
    return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px; border-radius: 10px;">
            <h2 style="color: #4CAF50; text-align: center;">Company Registration</h2>
            <p>Dear <strong>${companyName}</strong>,</p>
            <p>Congratulations! You have successfully registered in the Pet Shop System..</p>

            <h3 style="color: #333;">Company Details:</h3>
            <ul>
                <li><strong>Name:</strong> ${companyName}</li>
                <li><strong>Email:</strong> ${companyEmail}</li>
                <li><strong>Phone:</strong> ${phoneNumber}</li>
                <li><strong>Address:</strong> ${address}</li>
            </ul>

            <hr style="border: none; border-top: 1px solid #ddd;">
            <p style="text-align: center;">
                <a href="https://your-petshop-website.com/admin" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">View POS</a>
            </p>
            <p>Thank you for joining us!! 🐶🐱</p>
            <p>Best regards,</p>
            <p><strong>Pet Shop System</strong></p>
        </div>
    `;
};
