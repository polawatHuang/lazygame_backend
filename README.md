# 💤 พักบ้างนะ (Take a Break!)
Backend REST API for Lazy & Chill Game  
Built with **Node.js + Express + PostgreSQL**

---

## 🎮 Game Concept

"พักบ้างนะ" คือเกมแนว Casual / Simulation  
สำหรับวัยนักศึกษาและวัยทำงานที่อยากพักจากชีวิตจริง  
ผู้เล่นสะสม **คะแนนความขี้เกียจ (Lazy Score)**  
เพื่อนำไปแต่งตัวละคร ตกแต่งห้อง และแชร์ความขี้เกียจไป Social Media

---

## 🧠 Core Features

- User Authentication (Register / Login)
- Life Style Quiz → Lazy Personality
- Lazy Score Engine
- Character Outfit System
- Room Decoration System
- Lazy Shop & Monetization
- Achievement & Event System
- Social Sharing

---

## 🏗️ Tech Stack

| Layer | Tech |
|-----|-----|
| Runtime | Node.js 20+ |
| Framework | Express.js |
| Database | PostgreSQL |
| Auth | JWT |
| Hash | bcrypt |
| Client | Unity / Web / Mobile |

---

## 📁 Project Structure
server/
├── src
│ ├── app.js
│ ├── server.js
│ ├── config
│ │ └── db.js
│ ├── controllers
│ ├── services
│ ├── routes
│ ├── middlewares
│ │ └── auth.middleware.js
│ └── utils
├── .env
└── README.md

---


---

## ⚙️ Environment Variables

Create `.env`

```env
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/lazy_game
JWT_SECRET=super_secret_lazy_key

🚀 Getting Started
1️⃣ Install dependencies
npm install

2️⃣ Run database migration
psql -d lazy_game -f schema.sql

3️⃣ Start server
npm run dev


Server will run at:

http://localhost:3000

🔐 Authentication Flow
Register
POST /api/auth/register

{
  "email": "user@lazy.com",
  "password": "123456",
  "nickname": "ขี้เกียจขั้นเทพ"
}

Login
POST /api/auth/login


Response:

{
  "token": "JWT_TOKEN"
}


Use token in header:

Authorization: Bearer <JWT_TOKEN>

😴 Lazy Score API
Add Lazy Score
POST /api/lazy/add

{
  "score": 50,
  "source": "ITEM_USE"
}

🛍️ Items API
Get All Items
GET /api/items

👤 User Profile
Get Profile
GET /api/user/me

🎮 Unity Integration Example
UnityWebRequest req =
  UnityWebRequest.Get("https://api.yourgame.com/api/user/me");

req.SetRequestHeader(
  "Authorization",
  "Bearer " + playerToken
);

🔐 Security

JWT Authentication

Password hashed with bcrypt

No plain-text password

Token expiration supported

🧪 Testing
npm run test


(Add Jest / Supertest if needed)

🚀 Deployment

Recommended:

Render

Railway

Supabase

AWS EC2 / RDS

🔜 Roadmap

Refresh Token

Anti-Cheat System

Daily / Weekly Events

Gacha System

Admin Dashboard

Payment (IAP / PromptPay)

🧑‍💻 Author

Lazy Studio 💤
Built with ❤️ and laziness

📜 License

MIT License
