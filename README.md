# Contact Book App

A web-based contact book where users can **add**, **view**, and **delete** contacts. The app is **responsive** (works on both mobile and desktop) and supports **pagination** for viewing contacts.

---

## Project Overview

This app allows users to manage contacts efficiently. Contacts are stored in a database (SQLite or MongoDB) and can be fetched with pagination. The UI is built with React and is fully responsive.

---

## Tech Stack

- **Frontend:** React, Axios, CSS (or Bootstrap/Tailwind)  
- **Backend:** Node.js, Express  
- **Database:** SQLite 
- **Tools:** VS Code, Postman  

---

## Features

- Add new contacts with **name**, **email**, and **phone number**  
- View a paginated list of contacts  
- Delete contacts  
- Responsive UI for desktop and mobile  
- Input validation on both frontend and backend  

---

## Setup Instructions

### Backend

1. Navigate to the backend folder:  
   ```bash
   cd backend

Install dependencies:

npm install


Create a .env file (if using MongoDB) and add your connection string.

Run the server:

node server.js


Backend runs on https://contact-book-app-4vmv.onrender.com

Frontend

Navigate to the frontend folder:

cd frontend


Install dependencies:

npm install


Run the React app:

npm start


Frontend runs on http://localhost:3000

To avoid CORS issues, either configure proxy in package.json ("proxy": "http://localhost:5000") or enable CORS in backend.