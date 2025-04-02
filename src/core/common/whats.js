const twilio = require("twilio");

const accountSid = "your_account_sid";
const authToken = "your_auth_token";
const client = new twilio(accountSid, authToken);

client.messages
    .create({
        body: "Hello from Node.js!",
        from: "+1234567890", 
        to: "+0987654321", 
    })
    .then((message) => console.log("Message sent:", message.sid))
    .catch((error) => console.error("Error:", error));
