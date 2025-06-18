const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

// Parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from /client
app.use(express.static(path.join(__dirname, '../client')));

// Save main form data to userdata.json in /client
app.post('/userdata', (req, res) => {
  const { age, income, caste, state } = req.body;
  const newUserData = {
    age,
    income,
    caste,
    state,
    timestamp: new Date().toISOString()
  };

  const userDataPath = path.join(__dirname, '../client/userdata.json');

  fs.readFile(userDataPath, 'utf-8', (err, data) => {
    let users = [];
    if (!err && data) {
      try {
        users = JSON.parse(data);
      } catch (e) {
        users = [];
      }
    }

    users.push(newUserData);

    fs.writeFile(userDataPath, JSON.stringify(users, null, 2), err => {
      if (err) {
        return res.status(500).json({ success: false, error: "Failed to save user data." });
      }
      res.json({ success: true });
    });
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});