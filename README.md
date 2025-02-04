# File Uploader

This project is a file uploader built using Node.js, Prisma, and a frontend with JavaScript. It allows users to upload, view, and delete files from a database.

## Features

- 📤 Upload files to the server and store metadata in a database.
- 📂 Retrieve and display uploaded files.
- ❌ Delete files from the database and the server.

## Tech Stack

- **Backend**: Node.js, Express.js, Prisma, PostgreSQL/MySQL
- **Frontend**: HTML, CSS, JavaScript
- **Database**: PostgreSQL/MySQL (configured via Prisma)

## Installation

### 🚀 Clone the Repository

```bash
git clone https://github.com/your-username/file-uploader.git
cd file-uploader
```

### 📦 Install Dependencies
```bash
npm install
```

### 🛠️ Set Up Database
Update your .env file with the database URL:
```bash
DATABASE_URL="postgresql://user:password@localhost:5432/mydb"
```

### Run Prisma migrations:

```bash
npx prisma migrate dev --name init
```

### ▶️ Start the Server
```bash
npm start
```
The server will run on http://localhost:3000.

## 📜 License
MIT

## 👨‍💻 Author
Divy Pratap (@Divy__pratap)
