# 🗳️ Online Polling System

## 📌 Project Overview

The **Online Polling System** is a web-based application that allows users to participate in polls securely and conveniently. It is designed to make the voting process **faster, transparent, and easily accessible** from anywhere.

This project demonstrates the use of **web technologies (HTML, CSS, JavaScript, Node.js, Express, MongoDB)** to build a real-time polling platform.

---
---

## ⚙️ Features

* User authentication & secure login.
* Create polls with multiple options.
* Users can cast one vote per poll.
* Real-time result updates with charts.
* Responsive UI for desktop & mobile.
* Admin dashboard for poll management.

---

## 📂 Project Structure

```

```
polling-system/
│
├── polling-backend/                 # Backend (API + Database)
│   ├── models/                      # Mongoose Schemas
│   │   ├── Poll.js
│   │   ├── User.js
│   │   └── Vote.js
│   │
│   ├── routes/                      # Express Routes
│   │   ├── polls.js
│   │   └── votes.js
│   │
│   ├── package.json                 # Backend dependencies
│   ├── package-lock.json
│   ├── server.js                    # Backend entry point
│   └── .gitignore
│
├── polling-frontend/                # Frontend (React App)
│   ├── public/                      # Static assets
│   │   ├── favicon.jpeg
│   │   ├── index.html
│   │   ├── logo192.png
│   │   ├── logo512.png
│   │   ├── manifest.json
│   │   └── robots.txt
│   │
│   ├── src/                         # Source code
│   │   ├── App.css
│   │   ├── App.js
│   │   ├── index.css
│   │   ├── index.js
│   │   │
│   │   ├── components/              # Reusable UI Components
│   │   │   └── (Your custom components here)
│   │   │
│   │   ├── context/                 # React Context for state mgmt
│   │   │   └── AuthContext.js
│   │   │
│   │   └── pages/                   # Main Pages
│   │       ├── CreatePollPage.js
│   │       ├── EditPollPage.js
│   │       ├── HomePage.js
│   │       ├── LoginPage.js
│   │       ├── PollDetailPage.js
│   │       └── SignupPage.js
│   │
│   ├── package.json                 # Frontend dependencies
│   ├── package-lock.json
│   ├── README.md                    # Frontend documentation
│   └── .gitignore
│
└── README.md                        # Main project documentation
```

---

## ✅ Explanation of Major Folders/Files

* **polling-backend/**

  * `server.js` → Starts the Express server, connects MongoDB.
  * `models/` → Database schemas (Poll, User, Vote).
  * `routes/` → API routes for polls and votes.

* **polling-frontend/**

  * `public/` → Static files like index.html, icons, manifest.
  * `src/`

    * `App.js` → Root React component.
    * `pages/` → Different screens (login, signup, poll detail, etc.).
    * `context/` → Global state management (authentication).
    * `components/` → Reusable UI elements (e.g., buttons, forms).

---

This structure is now **complete and clean** with both frontend & backend files included

```

---

## 🛠️ Tech Stack

* **Frontend:** HTML, CSS, JavaScript
* **Backend:** Node.js, Express.js
* **Database:** MongoDB + Mongoose
* **Other Tools:** Nodemon (dev), bcrypt (encryption), Chart.js (results visualization)

---

## 🚀 Installation & Setup

1. Clone the repository:

   ```bash
   git clone <repo-link>
   cd online-polling-system
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Start MongoDB (local or cloud, e.g., MongoDB Atlas).
4. Run the server:

   ```bash
   nodemon index.js
   ```
5. Open the app in your browser at:

   ```
   http://localhost:3000
   ```

---

## 📖 How It Works

1. Users **sign up / log in**.
2. Polls are displayed on the dashboard.
3. Users select their choice and cast their vote.
4. The system records the vote securely in the database.
5. Results are updated in real-time with a **visual chart**.

---

## ✅ Key Learnings

* How to use **Node.js + Express.js** to build APIs.
* Connecting a web app with **MongoDB** for data storage.
* Implementing **authentication & authorization**.
* Using **Chart.js** for real-time result visualization.
* Team collaboration in full-stack project development.

---

## 📌 Future Enhancements

* OTP / Email verification for voters.
* Role-based access (Admin, Voter).
* Support for multiple languages.
* Deployment on cloud (Heroku/AWS).

---

