File Uploader

This project is a file uploader built using Node.js, Prisma, and a frontend with JavaScript. It allows users to upload, view, and delete files from a database.

Features

📤 Upload files to the server and store metadata in a database.

📂 Retrieve and display uploaded files.

❌ Delete files from the database and the server.

Tech Stack

Backend: Node.js, Express.js, Prisma, PostgreSQL/MySQL

Frontend: HTML, CSS, JavaScript

Database: PostgreSQL/MySQL (configured via Prisma)

Installation

🚀 Clone the Repository

git clone https://github.com/your-username/file-uploader.git
cd file-uploader

📦 Install Dependencies

npm install

🛠️ Set Up Database

Update your .env file with the database URL:

DATABASE_URL="postgresql://user:password@localhost:5432/mydb"

Run Prisma migrations:

npx prisma migrate dev --name init

▶️ Start the Server

npm start

The server will run on http://localhost:3000

API Endpoints

📤 Upload File

POST /upload

Body: multipart/form-data

Response:

{ "success": true, "file": { /_ file details _/ } }

📂 Get Files

GET /files

Response:

[ { "id": 1, "filename": "example.png", "publicId": "abc123", "createdAt": "2025-01-01T12:00:00Z" } ]

❌ Delete File

DELETE /file/:publicId

Response:

{ "success": true, "deletedFile": { /_ file details _/ } }

Frontend Usage

To dynamically set an onclick event for deleting a file:

document.querySelector(".delete-btn").setAttribute("onclick", `deleteFile('${publicId}', '${filename}')`);

This will call the deleteFile function to remove a file from the database.

📜 License

MIT

👨‍💻 Author

Your Name (@your-username)
