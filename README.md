# 🎓 TutorFind

**TutorFind** is a full-stack web application that connects students with qualified tutors across various subjects. It enables students to search, view tutor profiles, book sessions via a calendar system, and leave reviews — all in a user-friendly, responsive interface. Admins can approve tutor registrations and manage the platform effectively.

---

## 📌 Table of Contents
- [About the Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Screenshots](#screenshots)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

---

## 🧠 About the Project

**TutorFind** aims to provide an accessible and efficient platform for personalized learning. Whether you're a student looking for subject help or a tutor offering services, TutorFind simplifies scheduling, communication, and feedback — all in one place.

---

## ✨ Features

### 👩‍🏫 For Students:
- Browse and search tutors by subject (e.g., Math, Coding, Science)
- View tutor profiles (bio, ratings, availability, hourly rate)
- Book sessions using an interactive calendar
- View upcoming and past sessions in your personal dashboard
- Leave reviews after completed sessions
- Receive email confirmations upon booking

### 🧑‍🏫 For Tutors:
- Create and update personal profile
- Manage availability
- View session requests and booking history

### 🛡️ For Admins:
- Approve or reject new tutor applications
- Monitor user activity
- Manage reported reviews

### 📱 UI/UX:
- Mobile-first, fully responsive layout
- Clean design using Tailwind CSS
- Simple and intuitive calendar-based booking system

---

## 🛠️ Tech Stack

### Frontend:
- React.js
- Tailwind CSS
- React Router
- FullCalendar (for scheduling UI)

### Backend:
- Node.js
- Express.js
- MongoDB with Mongoose

### Authentication:
- JWT (JSON Web Token) for secure login
- bcrypt for password hashing

### Dev & Tools:
- VS Code
- Postman (API testing)
- Git & GitHub
- MongoDB Atlas (cloud database)
- Nodemailer (for email notifications)

---

## 🖼️ Screenshots

> 📸 Add screenshots of homepage, tutor profile, calendar, dashboard, and admin panel here.

---

## 🚀 Installation

1. **Clone the repository:**
```bash
git clone https://github.com/your-username/tutorfind.git
cd tutorfind
````

2. **Install frontend & backend dependencies:**

```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

3. **Set up environment variables** (see below)

4. **Run the app:**

```bash
# Start backend server
cd server
npm run dev

# Start frontend
cd ../client
npm start
```

---

## 🔐 Environment Variables

Create a `.env` file in the `server` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password_or_app_token
```

---

## 🧾 Project Structure

```
tutorfind/
│
├── client/               # React frontend
│   ├── components/
│   ├── pages/
│   ├── App.js
│   └── ...
│
├── server/               # Express backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── server.js
│
├── .env
├── README.md
└── package.json
```

---

## 🤝 Contributing

1. Fork the project
2. Create your feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m "Add feature"`
4. Push to the branch: `git push origin feature-name`
5. Open a pull request

---

## 📜 License

This project is licensed under the MIT License.

---

## 📫 Contact

**Project Lead**: \[Your Name]
GitHub: [@yourhandle](https://github.com/yourhandle)
Email: [your@email.com](mailto:your@email.com)