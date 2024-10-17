# Chef Memo

A community-driven recipe sharing web application where both amateur and professional chefs can share their culinary creations.

## 🚀 Features

- User authentication and profiles
- Recipe posting and sharing
- Image upload functionality
- Community interactions through comments
- Responsive design for all devices

## ⚙️ Tech Stack

- **Frontend**: React.js, Bootstrap, React Toastify, SweetAlert, Lucide
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **File Storage**: Cloudinary
- **Additional Technologies**:
  - Multer for file handling
  - Nodemailer for email functionality
  - Axios for HTTP requests
  - React Moment for date formatting

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm (Node Package Manager)
- MongoDB (local installation or MongoDB Atlas account)

## 🛠️ Installation & Setup

1. **Clone the Repository**
```bash
git clone [your-repository-link]
```

2. **Backend Setup**
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file and add your environment variables:
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Start the backend server
npm run dev
```

3. **Frontend Setup**
```bash
# Open a new terminal
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the frontend application
npm start
```

## 🌐 Environment Variables

Create a `.env` file in the backend directory with the following variables:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

## 🚦 Running the Application

1. **Start the Backend Server**
```bash
cd backend
npm run dev
```
The server will start on `http://localhost:5000`

2. **Start the Frontend Application**
```bash
cd frontend
npm start
```
The application will open in your default browser at `http://localhost:3000`

## 🔑 API Endpoints

The application exposes the following API endpoints:

- `/api/auth` - Authentication routes
- `/api/recipes` - Recipe management
- `/api/users` - User management
- [Add other endpoints specific to your application]
