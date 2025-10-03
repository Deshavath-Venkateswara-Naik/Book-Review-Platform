# Book Review Platform

A full-stack MERN application where users can sign up, log in, add books, review books, and see rating distributions. Includes search, filter, sorting, dark/light mode, pagination, charts, and profile page.

---

## **Tech Stack**
- Frontend: React, React Router, Context API, Tailwind CSS, Recharts
- Backend: Node.js, Express, MongoDB, Mongoose, JWT, bcrypt
- Database: MongoDB Atlas
- Deployment: Optional (Vercel/Netlify + Render/Heroku)
- Authentication: JWT tokens with protected routes

---

## **Features**
- **User Authentication:** Signup/Login with hashed password and JWT tokens
- **Book Management:** Add/Edit/Delete (creator only), view all books
- **Review System:** Add/Edit/Delete own reviews, show average rating
- **Pagination:** 5 books per page
- **Search & Filter:** By title, author, genre
- **Sorting:** By published year or average rating
- **Charts:** Bar chart for rating distribution (Recharts)
- **Dark/Light Mode:** Persistent toggle
- **Profile Page:** View user's own books

---

## **Setup Instructions**

### Backend
1. Navigate to `backend/`
2. Install dependencies:  
```bash
npm install
API Endpoints
Auth

POST /api/auth/signup – Register new user

POST /api/auth/login – Login user

Books

GET /api/books?page=1&search=&genre=&sort= – Get paginated books

GET /api/books/:id – Get single book + reviews

POST /api/books – Add new book (protected)

PUT /api/books/:id – Edit book (creator only)

DELETE /api/books/:id – Delete book (creator only)

Reviews

POST /api/reviews – Add review (protected)

PUT /api/reviews/:id – Edit review (owner only)

DELETE /api/reviews/:id – Delete review (owner only)

Bonus Features

Search & Filter books by title/author/genre

Sort books by year or average rating

Rating distribution charts using Recharts

Dark/Light mode toggle

Profile page with user's books

Postman Collection

Import BookReview.postman_collection.json (optional)

Preconfigure base URL: http://localhost:5000/api

Includes all Auth, Book, Review routes

Author

Deshavath Venkateswara Naik (Venky) – 2025


---

# **📂 Postman Collection (Optional)**

```json
{
  "info": { "name": "BookReview", "_postman_id": "abc123", "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json" },
  "item": [
    {
      "name": "Signup",
      "request": { "method": "POST", "header": [], "body": { "mode": "raw", "raw": "{\"name\":\"Venky\",\"email\":\"venky@example.com\",\"password\":\"123456\"}" }, "url": { "raw": "http://localhost:5000/api/auth/signup", "protocol": "http", "host":["localhost"], "port":"5000", "path":["api","auth","signup"] } }
    },
    {
      "name": "Login",
      "request": { "method": "POST", "header": [], "body": { "mode": "raw", "raw": "{\"email\":\"venky@example.com\",\"password\":\"123456\"}" }, "url": { "raw": "http://localhost:5000/api/auth/login", "protocol": "http", "host":["localhost"], "port":"5000", "path":["api","auth","login"] } }
    }
    // Add Books and Reviews endpoints similarly
  ]
}# Book-Review-Platform
