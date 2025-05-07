
export const generateBookingApprovalEmail = (name, email, phone) => {
    return `
      <div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
        <h2 style="color: #4CAF50;">🐾 Pet Shop Grooming - Booking Approved</h2>
        <p>Dear <strong>${name}</strong>,</p>
        <p>We're happy to inform you that your grooming booking has been <strong>approved</strong>.</p>
  
        <h4>📋 Booking Details:</h4>
        <ul style="line-height: 1.6;">
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Phone:</strong> ${phone}</li>
        </ul>
  
        <p>If you have any queries, feel free to contact us at this email. We're always happy to help!</p>
  
        <p>For further details, our team will connect with you shortly.</p>
  
        <br>
        <p>Warm regards,</p>
        <p><strong>Pet Shop Grooming</strong><br>
        ✂️ Caring for your pets with love</p>
      </div>
    `;
  };
  