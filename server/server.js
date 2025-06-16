const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

// Parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Serve static files from /Client
app.use(express.static(path.join(__dirname, '../Client')));

// ✅ Save contact messages to messages.json in /Client
app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;
  const newMessage = {
    name,
    email,
    message,
    timestamp: new Date().toISOString()
  };

  const messagesPath = path.join(__dirname, '../Client/messages.json');

  fs.readFile(messagesPath, 'utf-8', (err, data) => {
    let messages = [];
    if (!err && data) {
      messages = JSON.parse(data);
    }

    messages.push(newMessage);

    fs.writeFile(messagesPath, JSON.stringify(messages, null, 2), err => {
      if (err) {
        console.error("❌ Error saving message:", err);
        return res.status(500).json({ success: false, error: "Failed to save message." });
      }

      console.log("✅ Message saved.");
      res.json({ success: true });
    });
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
