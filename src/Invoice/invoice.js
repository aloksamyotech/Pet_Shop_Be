import fs from "fs";
import path from "path";
import PDFDocument from "pdfkit";

const generateInvoicePDF = async (order, filePath) => {
  return new Promise((resolve, reject) => {
    const directory = path.dirname(filePath);
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }

    const doc = new PDFDocument({ margin: 50 });

    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);


    doc
      .fillColor("#6d42b9")
      .fontSize(20)
      .text("The Pet Stop", { align: "center" })
      .fontSize(16)
      .text("1234 Happy Paws Street, 87876", { align: "center" })
      .text("United States", { align: "center" })
      .moveDown();

    doc
      .fillColor("black")
      .fontSize(12)
      .text(`Invoice ID: ${order.orderId}`)
      .text(`Date: ${new Date(order.createdAt).toLocaleDateString()}`)
      .text(
        `Time: ${new Date(order.createdAt).toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })}`
      )
      .moveDown();

    doc
      .fillColor("#9053bc")
      .fontSize(14)
      .text("Customer Information", { underline: true })
      .moveDown();

    doc.fillColor("black").fontSize(12).text(`Name: ${order.customerName}`);
    doc.text(`Email: ${order.customerEmail}`);
    doc.text(`Phone: ${order.customerPhone}`).moveDown();

   
    doc
      .fillColor("#9053bc")
      .fontSize(14)
      .text("Products Purchased", { underline: true })
      .moveDown();

    const tableTop = doc.y;
    const itemX = 50;
    const qtyX = 300;
    const priceX = 400;
    const totalX = 500;

    doc
      .fontSize(12)
      .fillColor("black")
      .text("Product Name", itemX, tableTop)
      .text("Quantity", qtyX, tableTop)
      .text("Price", priceX, tableTop)
      .text("Total", totalX, tableTop);

    doc.moveDown(0.5);
    doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke(); 


    order.products.forEach((item, index) => {
      const yPos = doc.y + 10;

      doc
        .fillColor("black")
        .text(item.productName, itemX, yPos)
        .text(item.quantity, qtyX, yPos)
        .text(`Rs.${item.price}`, priceX, yPos)
        .text(`Rs.${item.quantity * item.price}`, totalX, yPos);

      doc.moveDown();
    });

    doc.moveDown().fontSize(14).text(`Total Amount: Rs.${order.totalAmount}`, {
      bold: true,
    });

   
    // doc
    // .fillColor("gray")
    // .fontSize(10)
    // .text(
    //   "Thank you for visiting our shop! We truly appreciate your trust in us to care for your beloved pets. We look forward to serving you again soon!",
    //   { align: "center", width: 500 }
    // );
  

    doc.end();

    stream.on("finish", () => {
      console.log("Invoice PDF generated:", filePath);
      resolve();
    });

    stream.on("error", (err) => {
      console.error("Error generating PDF:", err);
      reject(err);
    });
  });
};

export default generateInvoicePDF;
