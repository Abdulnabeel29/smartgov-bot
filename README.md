# SmartGov Bot 🚀

SmartGov Bot is an AI-powered web app that helps Indian citizens discover government schemes they are eligible for — based on their personal data like age, income, caste, and location.

## 🔧 Tech Stack
- Frontend: HTML, CSS, JS (optionally Tailwind)
- Backend: Node.js, Express.js
- Database: MongoDB (via Mongoose)
- AI: OpenAI GPT API (for dynamic explanation + scheme suggestions)
- Extras: Web Speech API, Twilio (WhatsApp), Google Maps API

## 📁 Project Structure
smartgov-bot/
│
├── client/                  # Frontend
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   └── assets/              # Images/icons
│
├── server/                  # Backend
│   ├── models/
│   │   └── Scheme.js
│   ├── routes/
│   │   └── schemes.js
│   ├── config/
│   │   └── db.js
│   ├── .env                 # For DB_URI, etc.
│   └── server.js
│
├── .gitignore
├── README.md
├── package.json
