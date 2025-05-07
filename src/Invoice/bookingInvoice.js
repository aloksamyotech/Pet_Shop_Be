import fs from "fs";
import path from "path";
import PDFDocument from "pdfkit";

const generateInvoicePDFBooking = async (invoiceData, filePath) => {
  return new Promise((resolve, reject) => {
    const directory = path.dirname(filePath);
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }

    const doc = new PDFDocument({ margin: 40 });
    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    const { customerInfo, paymentInfo, extraItems, bookingDateTime, packageName, bookingId, petName, breed, bookingStatus, service } = invoiceData;

    // Header
    doc.fontSize(22).fillColor("#6A9C89").text("Pet Warehouse Invoice", { align: "center" });
    doc.fontSize(12).fillColor("black").text(`Generated on: ${new Date().toLocaleString()}`, { align: "center" });
    doc.moveDown(2);

    // Booking Details
    doc.fontSize(14).fillColor("#333").text("Booking Details", { underline: true });
    doc.moveDown(0.5);
    doc.fontSize(12)
      .text(`Booking ID: ${bookingId}`)
      .text(`Pet Name: ${petName}`)
      .text(`Breed: ${breed}`)
      .text(`Booking Status: ${bookingStatus}`)
      .text(`Package: ${packageName}`)
      .text(`Service: ${service}`)
      .text(`Booking Date & Time: ${bookingDateTime}`);
    doc.moveDown();

    // Customer Info
    doc.fontSize(14).fillColor("#333").text("Customer Information", { underline: true });
    doc.moveDown(0.5);
    doc.fontSize(12)
      .text(`Name: ${customerInfo.name}`)
      .text(`Email: ${customerInfo.email}`)
      .text(`Phone: ${customerInfo.phone}`)
      .text(`Address: ${customerInfo.address}`);
    doc.moveDown();

    // Payment Info
    doc.fontSize(14).fillColor("#333").text("Payment Information", { underline: true });
    doc.moveDown(0.5);
    doc.fontSize(12)
      .text(`Status: ${paymentInfo.status}`)
      .text(`Type: ${paymentInfo.type}`)
      .text(`Date: ${paymentInfo.date}`)
      .text(`Package Price: ₹${paymentInfo.price}`)
      .text(`Advance Payment: ₹${paymentInfo.advance}`)
      .text(`Remaining Payment: ₹${paymentInfo.price - paymentInfo.paid}`);
    doc.moveDown();

    // Extra Items
    if (extraItems && extraItems.length > 0) {
      doc.fontSize(14).fillColor("#333").text("Extra Items", { underline: true });
      doc.moveDown(0.5);

      const itemX = 50, descX = 200, priceX = 450;
      doc.fontSize(12).fillColor("black")
        .text("Item", itemX)
        .text("Description", descX)
        .text("Price", priceX);
      doc.moveDown(0.3);
      doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();

      extraItems.forEach((item) => {
        doc.moveDown(0.3)
          .text(item.name, itemX)
          .text(item.description, descX)
          .text(`₹${item.price}`, priceX);
      });

      const extraTotal = extraItems.reduce((sum, item) => sum + item.price, 0);
      doc.moveDown().fontSize(12).text(`Extra Items Total: ₹${extraTotal}`, { align: "right" });
    }

    // Total Amount
    const totalAmount = paymentInfo.price + extraItems.reduce((sum, item) => sum + item.price, 0);
    doc.moveDown(2).fontSize(16).fillColor("#000").text(`Total Amount: ₹${totalAmount}`, { align: "right", bold: true });

    doc.end();

    stream.on("finish", () => resolve());
    stream.on("error", (err) => reject(err));
  });
};

export default generateInvoicePDFBooking;
