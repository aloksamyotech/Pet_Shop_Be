export const generateBookingPendingEmail = (name, email, phone) => {
    return `
      <div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
        <h2 style="color: #FFA500;">🐾 Pet Shop Grooming - Booking Received</h2>
        <p>Dear <strong>${name}</strong>,</p>
  
        <p>Thank you for booking grooming services with <strong>Pet Shop Grooming</strong>! 🙏</p>
        <p>We have received your booking and it is currently <strong style="color: #FFA500;">pending approval</strong>.</p>
  
        <h4>📋 Booking Details:</h4>
        <ul style="line-height: 1.6;">
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Phone:</strong> ${phone}</li>
        </ul>
  
        <p>Our team will review your request shortly and get in touch with you as soon as possible to confirm the details.</p>
  
        <p>If you have any questions in the meantime, feel free to reply to this email. We're here to help!</p>
  
        <br>
        <p>Warm regards,</p>
        <p><strong>Pet Shop Grooming</strong><br>
        ✂️ Caring for your pets with love</p>
      </div>
    `;
  };
  