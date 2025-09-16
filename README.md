# Inventory Management System (MERN Stack)

A full-stack inventory management system built with the MERN stack (MongoDB, Express.js, React, Node.js). This project allows users to manage products, categories, suppliers, orders, and user authentication with a modern UI and robust backend.

## Features

- User authentication (JWT-based)
- Product CRUD (Create, Read, Update, Delete)
- Category and Supplier management
- Order management
- Dashboard with statistics
- Responsive React frontend (Vite + Tailwind CSS)
- RESTful API backend (Express + Mongoose)

## Project Structure

```
├── frontend/           # React + Vite + Tailwind CSS
│   └── src/
│       └── components/
│       └── pages/
│       └── contex/
├── server/             # Node.js + Express + MongoDB
│   └── controllers/
│   └── models/
│   └── routes/
│   └── db/
│   └── seed.js
│   └── index.js
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB (local or Atlas)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Chanuka999/inventory_management_system.git
   cd inventory_management_system
   ```
2. **Install backend dependencies:**
   ```bash
   cd server
   npm install
   ```
3. **Install frontend dependencies:**
   ```bash
   cd ../frontend
   npm install
   ```

### Environment Variables

- Create a `.env` file in the `server/` directory with the following:
  ```env
  MONGO_URL=your_mongodb_connection_string
  JWT_SECRET=your_jwt_secret
  PORT=5000
  ```

### Running the App

- **Start the backend:**
  ```bash
  cd server
  npm run dev
  ```
- **Start the frontend:**
  ```bash
  cd frontend
  npm run dev
  ```
- The frontend will run on `http://localhost:5173` (or as configured by Vite).
- The backend will run on `http://localhost:5000`.

## Usage

- Register or login as a user.
- Manage products, categories, suppliers, and orders from the dashboard.
- Filter, search, and edit inventory in real time.

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, Axios
- **Backend:** Node.js, Express.js, Mongoose, JWT
- **Database:** MongoDB

## License

This project is licensed under the MIT License.

---

**Author:** Chanuka999

Feel free to contribute or open issues for improvements!

# inventory_management_system
