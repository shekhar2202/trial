# Complaint Management System - MERN Stack

A modern complaint management system built with the MERN stack (MongoDB, Express.js, React, Node.js).

## Features

- **User Authentication**: Login/Register with JWT tokens
- **Role-based Access**: Admin and Student roles
- **Complaint Management**: Submit, view, and track complaints
- **Admin Dashboard**: Manage all complaints with status updates
- **Modern UI**: Clean, responsive design with modern styling
- **Real-time Updates**: Status changes reflect immediately

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation

### Frontend
- **React** - UI library
- **Vite** - Build tool
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **CSS3** - Styling

## Project Structure

```
complaint-system/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── App.jsx        # Main app component
│   │   └── App.css        # Styles
│   └── package.json
├── server/                 # Express backend
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── middleware/        # Custom middleware
│   ├── server.js          # Main server file
│   └── package.json
└── package.json           # Root package.json
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (running locally or MongoDB Atlas)

### 1. Clone the repository
```bash
git clone <repository-url>
cd complaint-system
```

### 2. Install dependencies
```bash
# Install root dependencies
npm install

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 3. Environment Setup

Create a `.env` file in the server directory:
```bash
cd server
# Create config.env file with:
PORT=5000
MONGODB_URI=mongodb://localhost:27017/complaintapp
JWT_SECRET=your_jwt_secret_key_here
```

### 4. Start MongoDB
Make sure MongoDB is running on your system:
```bash
# Start MongoDB (Windows)
mongod

# Or if using MongoDB service
net start MongoDB
```

### 5. Run the application

#### Development Mode (Both client and server)
```bash
# From root directory
npm run dev
```

#### Run separately
```bash
# Terminal 1 - Start server
npm run server

# Terminal 2 - Start client
npm run client
```

## Usage

### Access the Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000

### User Roles

#### Student
- Register/Login
- Submit complaints
- View their own complaints
- Track complaint status

#### Admin
- All student features
- View all complaints
- Update complaint status
- Access admin dashboard

### API Endpoints

#### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/user` - Get current user

#### Complaints
- `GET /api/complaints` - Get complaints (filtered by role)
- `POST /api/complaints` - Create new complaint
- `GET /api/complaints/:id` - Get specific complaint
- `PUT /api/complaints/:id/status` - Update complaint status (admin only)
- `DELETE /api/complaints/:id` - Delete complaint

#### Users (Admin only)
- `GET /api/users` - Get all users
- `GET /api/users/students` - Get all students

## Features

### Authentication
- JWT-based authentication
- Password hashing with bcrypt
- Role-based access control
- Protected routes

### Complaint Management
- Submit complaints with detailed information
- Track complaint status (pending, in-progress, resolved)
- Admin can update complaint status
- Students can view their own complaints

### Admin Dashboard
- Overview statistics
- Complete complaint list
- Status management
- User management

### Modern UI/UX
- Responsive design
- Clean, modern interface
- Smooth animations
- Intuitive navigation

## Development

### Adding New Features
1. Create API endpoints in `server/routes/`
2. Add corresponding React components in `client/src/components/`
3. Update navigation and routing as needed

### Database Schema
- **Users**: name, username, email, password, role
- **Complaints**: name, email, contact, description, status, submittedBy

## Deployment

### Build for Production
```bash
# Build React app
npm run build

# The built files will be in client/dist/
```

### Environment Variables
Make sure to set proper environment variables for production:
- `MONGODB_URI` - Production MongoDB connection string
- `JWT_SECRET` - Strong secret key
- `PORT` - Server port

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details
