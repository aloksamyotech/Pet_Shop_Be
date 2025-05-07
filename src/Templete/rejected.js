export const generateBookingRejectionEmail = (name, email, phone) => {
    return `
      <div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
        <h2 style="color: #f44336;">🐾 Pet Shop Grooming - Booking Rejected</h2>
        <p>Dear <strong>${name}</strong>,</p>
  
        <p>Thank you for choosing <strong>Pet Shop Grooming</strong>. We regret to inform you that your recent grooming booking request has been <strong style="color: #f44336;">rejected</strong>.</p>
  
        <h4>❗Booking Details:</h4>
        <ul style="line-height: 1.6;">
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Phone:</strong> ${phone}</li>
        </ul>
  
        <p>This decision may be due to limited availability or scheduling conflicts. We sincerely apologize for any inconvenience this may cause.</p>
  
        <p>If you have any questions or would like to rebook for another date, please don't hesitate to reach out to us via this email.</p>
  
        <p>We truly appreciate your interest in our services and hope to serve you in the future.</p>
  
        <br>
        <p>Warm regards,</p>
        <p><strong>Pet Shop Grooming</strong><br>
        ✂️ Caring for your pets with love</p>
      </div>
    `;
  };
  