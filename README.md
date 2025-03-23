# React + Express Application

This project is a full-stack web application built with **React** (frontend) and **Express** (backend). It includes product CRUD, image upload via Multer, and REST API integration.

---

## Folder Structure

```
/client      -> React frontend
/server      -> Express backend
README.md
```

## Features

- React frontend with Bootstrap UI
- Express backend with Sequelize ORM (MySQL)
- Multer for image uploads
- Product management (add, edit, view, list)
- Axios API integration
- Environment configuration with `.env`

## Tech Stack

- **Frontend:** React, Axios, Bootstrap, Formik, Yup
- **Backend:** Node.js, Express, Sequelize
- **Database:** MySQL
- **Others:** Multer, CORS, Dotenv

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/kannadotwings/Learning.git
cd Learning
```

### 2. Backend Setup (Express)
```bash
cd server
npm install
npm run dev           # start Express (e.g., port 5000)
```

### 3. Frontend Setup (React)
```bash
cd client
npm install
npm start             # start React (e.g., port 3000)
```

## Image Upload (Multer)

- Upload folder: `/server/uploads/products`
- Only image filenames are saved (e.g., `image.jpg`)
- Access images at:
```
IMAGE_URL = http://localhost:5000/uploads/products/image.jpg
```

## API Endpoints

| Method | Endpoint               | Description               |
| ------ | ---------------------- | ------------------------- |
| POST   | `/v1/products/create`  | Create product            |
| GET    | `/v1/products/:id`     | View product by ID        |
| PUT    | `/v1/products/:id`     | Update product            |
| GET    | `/v1/products`         | List all products         |
| DELETE | `/v1/products/:id`     | Delete product by ID      |

## Production Build

### Build React
```bash
cd client
npm run build
```

## Notes

- Add `.env` for both client & server
- Handle CORS for API requests
- Form validation using Formik + Yup

## License

MIT License © 2025

