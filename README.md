📄 Document Verification Backend
This is the backend API for a Document Verification System.
It handles user authentication (Register, Login), protected routes, and document uploads securely using JWT and MongoDB.

⚙️ Tech Stack
Node.js (Server-side runtime)

Express.js (Web framework)

MongoDB Atlas (Cloud Database)

JWT (Authentication Token)

bcryptjs (Password hashing)

🏗️ Features
User Registration

User Login with JWT Token Generation

Protected Routes using Middleware

Upload route accessible after login

Profile Fetch and Password Change APIs

📦 How to Run Locally
Clone the repository:

bash

git clone your-repo-link-here
Install the dependencies:

bash

npm install
Create a .env file inside the root folder and add:

bash

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
Start the server:

bash

npm start
Server will run on http://localhost:5000/

🛡️ Environment Variables
You must add a .env file manually with the following keys:


Variable	Description
MONGO_URI	Your MongoDB Atlas connection string
JWT_SECRET	Secret key for JWT token signing
PORT	Port where server runs (default 5000)
🚀 API Endpoints (Postman Tested)

Method	  Endpoint	                  Description	Protected
POST	 /api/auth/register	          Register a new user	❌
POST	 /api/auth/login	            Login user and get token	❌
GET	   /api/auth/protected	        Example protected route	✅
POST   /api/auth/upload	            Upload document	✅
GET	   /api/auth/profile	          Fetch user profile	✅
POST	 /api/auth/change-password	  Change user password	✅


🙌 Special Notes
Make sure .env file is NOT pushed to GitHub.

Add .env to .gitignore.

Passwords are hashed securely using bcrypt.

JWT token expires in 1 hour for better security.

😎 Thank You!
