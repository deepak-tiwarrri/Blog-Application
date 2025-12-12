# Bite & Roam - Blog Application

> A modern, full-stack blog platform for sharing travel and food stories with a global community of passionate readers.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![MongoDB](https://img.shields.io/badge/MongoDB-13AA52?style=for-the-badge&logo=mongodb&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Project Structure](#project-structure)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Features in Detail](#features-in-detail)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

Bite & Roam is a sophisticated blog platform built with cutting-edge technologies, designed to provide an elegant and intuitive experience for bloggers and readers. Whether you're sharing travel adventures, culinary discoveries, or lifestyle insights, this platform empowers you to connect with a global audience through beautifully crafted stories.

**Live Demo:** [Coming Soon]

---

## ✨ Features

### For Users

- ✅ **User Authentication** - Secure JWT-based login and registration
- ✅ **Create & Publish Blogs** - Write, format, and publish articles with ease
- ✅ **Edit & Delete** - Full control over your published content
- ✅ **Browse All Blogs** - Discover stories from the community
- ✅ **Read Full Articles** - Dedicated blog detail pages with optimal readability
- ✅ **Interactive Elements** - Like, bookmark, and share blog posts
- ✅ **Pagination** - Smooth navigation through large blog collections
- ✅ **Responsive Design** - Perfect experience on mobile, tablet, and desktop
- ✅ **Dark Mode Ready** - Modern CSS variables for theme switching

### For Developers

- 🏗️ **Clean Architecture** - Well-organized component and folder structure
- 🎨 **Modern UI/UX** - Tailwind CSS + Material-UI + shadcn/ui components
- 📱 **Mobile-First** - Responsive breakpoints (sm, md, lg, xl)
- ♿ **Accessibility** - WCAG compliant components
- 🚀 **Performance Optimized** - Code splitting, lazy loading, optimized bundles
- 📦 **Component Library** - Reusable common components
- 🔐 **Security** - JWT authentication, secure API endpoints
- 📊 **State Management** - Redux for global state management

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| **React 18+** | UI library |
| **Vite** | Build tool & dev server |
| **Redux** | State management |
| **Tailwind CSS** | Utility-first styling |
| **Material-UI (MUI)** | Component library |
| **shadcn/ui** | Accessible components |
| **Lucide React** | Icon library |
| **React Router** | Client-side routing |
| **Sonner** | Toast notifications |
| **Axios** | HTTP client |
| **@fontsource** | Custom fonts (Playfair Display, Poppins) |

### Backend
| Technology | Purpose |
|------------|---------|
| **Node.js** | Runtime environment |
| **Express.js** | Web framework |
| **MongoDB** | Database |
| **Mongoose** | ODM (Object Document Mapper) |
| **JWT** | Authentication |
| **Bcrypt** | Password hashing |
| **CORS** | Cross-origin resource handling |
| **Dotenv** | Environment variables |

---

## 🏗️ Architecture

### Application Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                      BITE & ROAM PLATFORM                       │
└─────────────────────────────────────────────────────────────────┘

                    ┌──────────────┐
                    │   Browser    │
                    └──────┬───────┘
                           │
          ┌────────────────┼────────────────┐
          │                │                │
      ┌───▼────┐    ┌─────▼─────┐    ┌────▼──────┐
      │  Home  │    │  Auth     │    │  Blogs    │
      │  Page  │    │  (Login/  │    │ (Browse)  │
      └────────┘    │  Signup)  │    └───────────┘
                    └───────────┘
          │                │                │
          └────────────────┼────────────────┘
                           │
          ┌────────────────▼────────────────┐
          │     Redux Store (Auth)          │
          │  - User Token                   │
          │  - Logged In Status             │
          └────────────────┬────────────────┘
                           │
          ┌────────────────▼────────────────┐
          │      API Layer (Axios)          │
          │  - REST API Calls               │
          │  - JWT Header Management        │
          └────────────────┬────────────────┘
                           │
          ┌────────────────▼────────────────┐
          │    Express Backend Server       │
          │  - Authentication Routes       │
          │  - Blog CRUD Operations         │
          │  - User Management              │
          └────────────────┬────────────────┘
                           │
          ┌────────────────▼────────────────┐
          │       MongoDB Database          │
          │  - Users Collection             │
          │  - Blogs Collection             │
          └─────────────────────────────────┘
```

### User Authentication Flow

```
┌─────────────────┐
│   User Input    │
│  (Email/Pass)   │
└────────┬────────┘
         │
         ▼
┌─────────────────────┐
│  AuthForm Component │
└────────┬────────────┘
         │
         ▼
┌──────────────────────────┐
│  Validate Input          │
│  - Email format          │
│  - Password strength     │
└────────┬─────────────────┘
         │
         ▼
┌──────────────────────────┐
│  API Request             │
│  /auth/login (POST)      │
│  /auth/signup (POST)     │
└────────┬─────────────────┘
         │
         ▼
┌──────────────────────────┐
│  Backend Processing      │
│  - Hash password         │
│  - Validate credentials  │
│  - Generate JWT token    │
└────────┬─────────────────┘
         │
         ▼
┌──────────────────────────┐
│  Store Token             │
│  - localStorage          │
│  - Redux state           │
└────────┬─────────────────┘
         │
         ▼
┌──────────────────────────┐
│  Redirect to Home/Blogs  │
│  - Set auth header       │
└──────────────────────────┘
```

### Blog Reading Flow

```
Home Page
    │
    ├─→ "View All Blogs" button
    │
    ▼
Blogs Page (/blogs)
    │
    ├─→ Display all blogs with pagination
    ├─→ No login required (PUBLIC)
    │
    ▼
Click on Blog Card
    │
    ├─→ Navigate to blog detail page
    │
    ▼
BlogDetailPage (/blogs/:id)
    │
    ├─→ Fetch blog details
    ├─→ Display full content
    ├─→ Show author info & publish date
    ├─→ Interactive buttons (Like, Bookmark, Share)
    │
    ▼
User Interactions
    ├─→ Like blog (notification)
    ├─→ Bookmark blog (for future reading)
    ├─→ Share blog link (copy to clipboard)
    │
    ▼
Continue Reading
    └─→ "Explore More Blogs" button
```

### Blog Creation/Management Flow

```
Logged In User
    │
    ├─→ "Create Blog" button
    │
    ▼
AddBlog Page (/blogs/add)
    │
    ├─→ Form: Title, Description, Image
    ├─→ Client-side validation
    │
    ▼
Submit Blog
    │
    ├─→ API POST /blogs/create
    │
    ▼
Backend Processing
    │
    ├─→ Validate JWT token
    ├─→ Extract user ID
    ├─→ Create blog document
    ├─→ Save to MongoDB
    │
    ▼
Redirect to UserBlogs
    │
    ├─→ Display all user's blogs
    ├─→ Show edit/delete buttons
    │
    ▼
Manage Blog
    ├─→ Edit (/myblogs/:id) - Update content
    ├─→ Delete - Remove from database
    │
    ▼
Success Notification
    └─→ Toast message confirmation
```

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16.0 or higher) - [Download](https://nodejs.org/)
- **npm** (v8.0 or higher) or **yarn** (v3.0 or higher)
- **MongoDB** (v4.4 or higher) - [Download](https://www.mongodb.com/try/download/community)
  - Or use **MongoDB Atlas** (cloud version) - [Create Account](https://www.mongodb.com/cloud/atlas)
- **Git** - [Download](https://git-scm.com/)
- **VS Code** or any code editor

### Verify Installation

```bash
# Check Node.js
node --version    # Should output v16+

# Check npm
npm --version     # Should output 8+

# Check MongoDB
mongod --version  # Should output 4.4+
```

---

## 📥 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/deepak-tiwarrri/Blog-Application.git
cd Blog-Application
```

### 2. Setup Backend

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your configuration
nano .env  # or use your preferred editor
```

### 3. Setup Frontend

```bash
# Navigate to frontend directory
cd frontend1

# Install dependencies
npm install

# Create .env.local file (if needed)
cp .env.example .env.local
```

---

## ⚙️ Configuration

### Backend Environment Variables

Create a `.env` file in the `backend/` directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/blog-app
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/blog-app

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here_change_in_production
JWT_EXPIRY=7d

# CORS Configuration
CORS_ORIGIN=http://localhost:5173

# Email Configuration (Optional)
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password

# API Rate Limiting
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX_REQUESTS=100
```

### Frontend Environment Variables

Create a `.env.local` file in the `frontend1/` directory:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:5000/api

# Application
VITE_APP_NAME=Bite & Roam
VITE_APP_ENVIRONMENT=development
```

---

## 📂 Project Structure

```
Blog-Application/
├── backend/
│   ├── config/
│   │   ├── db.js              # Database connection
│   │   ├── token.js           # JWT configuration
│   │   └── generateSecret.js  # Secret generation
│   ├── controllers/
│   │   ├── blog-controller.js # Blog business logic
│   │   └── user-controller.js # User authentication
│   ├── middleware/
│   │   └── auth.js            # JWT verification
│   ├── models/
│   │   ├── Blog.js            # Blog schema
│   │   └── User.js            # User schema
│   ├── routes/
│   │   ├── blog-routes.js     # Blog endpoints
│   │   └── user-routes.js     # Auth endpoints
│   ├── index.js               # Express server
│   └── package.json
│
├── frontend1/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/        # Reusable components
│   │   │   │   ├── Loader.jsx
│   │   │   │   └── ErrorBoundary.jsx
│   │   │   ├── ui/            # shadcn/ui components
│   │   │   ├── layout/        # Layout components
│   │   │   │   ├── Header.jsx
│   │   │   │   └── Footer.jsx
│   │   │   ├── pages/         # Full page components
│   │   │   │   ├── Home.jsx
│   │   │   │   ├── Blogs.jsx
│   │   │   │   ├── UserBlogs.jsx
│   │   │   │   └── BlogDetailPage.jsx
│   │   │   ├── features/      # Feature-specific components
│   │   │   │   ├── Blog.jsx
│   │   │   │   ├── BlogCard.jsx
│   │   │   │   ├── AuthForm.jsx
│   │   │   │   ├── AddBlog.jsx
│   │   │   │   └── EditBlog.jsx
│   │   ├── api.js             # Axios configuration
│   │   ├── App.jsx            # Main app component
│   │   ├── index.css          # Global styles & CSS variables
│   │   ├── main.jsx           # Entry point
│   │   ├── lib/
│   │   │   ├── utils.js       # Utility functions
│   │   │   └── endpoints.js   # API endpoints
│   │   └── store/
│   │       └── index.js       # Redux store configuration
│   ├── public/
│   ├── vite.config.js
│   ├── package.json
│   └── README.md
│
└── README.md                  # This file
```

---

## 🚀 Running the Application

### 1. Start MongoDB

```bash
# If running locally
mongod

# Or use MongoDB Atlas (cloud)
# Connection string should be in .env file
```

### 2. Start Backend Server

```bash
cd backend

# Install dependencies (if not done)
npm install

# Start server
npm start

# Server runs on http://localhost:5000
# Output: "Server is running on port 5000"
```

### 3. Start Frontend Development Server

In a new terminal:

```bash
cd frontend1

# Install dependencies (if not done)
npm install

# Start development server
npm run dev

# Frontend runs on http://localhost:5173
# Open browser and navigate to http://localhost:5173
```

### Running in Production

```bash
# Backend
cd backend
npm run build  # (if applicable)
npm start      # NODE_ENV=production

# Frontend
cd frontend1
npm run build
npm run preview
```

---

## 🔌 API Endpoints

### Authentication Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---|
| POST | `/auth/signup` | Register new user | ❌ |
| POST | `/auth/login` | User login | ❌ |
| POST | `/auth/logout` | User logout | ✅ |

### Blog Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---|
| GET | `/blogs` | Fetch all blogs | ❌ |
| GET | `/blogs/:id` | Fetch single blog | ❌ |
| POST | `/blogs/create` | Create new blog | ✅ |
| PUT | `/blogs/:id` | Update blog | ✅ |
| DELETE | `/blogs/:id` | Delete blog | ✅ |
| GET | `/user-blogs/:userId` | Fetch user's blogs | ❌ |

---

## 🎨 Features in Detail

### 1. **Responsive Design**
- Mobile-first approach using Tailwind CSS
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- All pages fully responsive for all devices

### 2. **Authentication System**
- JWT-based authentication
- Secure password hashing with bcrypt
- Token stored in localStorage
- Redux state management for auth

### 3. **Blog Management**
- **Create**: Rich text input for blog content
- **Read**: Dedicated detail pages with optimal typography
- **Update**: Edit existing blogs with pre-filled forms
- **Delete**: Remove blogs with confirmation

### 4. **User Experience**
- Elegant typography with Playfair Display & Poppins fonts
- Smooth transitions and hover effects
- Loading states with Material-UI spinners
- Toast notifications for user feedback
- Error boundaries for graceful error handling

### 5. **Performance Optimizations**
- Code splitting with React Router
- Image optimization with lazy loading
- Efficient state management with Redux
- Pagination for large blog lists (6 items per page)

### 6. **Accessibility**
- Semantic HTML elements
- ARIA labels on interactive elements
- Keyboard navigation support
- Proper color contrast ratios
- Focus states on form inputs

---

## 🐛 Troubleshooting

### Common Issues and Solutions

#### Issue: "Cannot connect to MongoDB"

```bash
# Solution 1: Check MongoDB is running
mongod

# Solution 2: Verify connection string in .env
# Format: mongodb://localhost:27017/blog-app
# Or: mongodb+srv://username:password@cluster.mongodb.net/blog-app

# Solution 3: Check MongoDB permissions
sudo systemctl start mongod  # Linux
brew services start mongodb-community  # macOS
```

#### Issue: "Port 5000 already in use"

```bash
# Find process using port 5000
lsof -i :5000

# Kill the process
kill -9 <PID>

# Or use a different port in .env
PORT=5001
```

#### Issue: "CORS error when fetching from frontend"

```bash
# Solution: Ensure backend .env has correct frontend URL
CORS_ORIGIN=http://localhost:5173

# Check if frontend URL matches exactly
# (including port number)
```

#### Issue: "JWT token expired"

```bash
# Solution: User needs to login again
# Token expiry is set in backend .env
JWT_EXPIRY=7d

# Clear localStorage and login again
localStorage.clear()
```

#### Issue: "Vite build errors"

```bash
cd frontend1

# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
rm -rf .vite

# Try building again
npm run build
```

---

## 📚 Development Guidelines

### Code Style

- **JavaScript**: ES6+ syntax
- **CSS**: Tailwind utility classes (prefer utilities over CSS files)
- **Components**: Functional components with React Hooks
- **State**: Redux for global state, useState for local state

### Component Organization

```jsx
// Component template
import { useState } from 'react';
import { useSelector } from 'react-redux';

const MyComponent = () => {
  // Hooks
  const [state, setState] = useState();
  const reduxState = useSelector(state => state);

  // Functions
  const handleAction = () => {};

  // Render
  return (
    <div>
      {/* JSX content */}
    </div>
  );
};

export default MyComponent;
```

### Naming Conventions

- Components: PascalCase (`BlogCard.jsx`)
- Functions: camelCase (`handleSubmit()`)
- Constants: UPPER_SNAKE_CASE (`API_BASE_URL`)
- CSS classes: kebab-case (`.blog-card`)

---

## 🤝 Contributing

### How to Contribute

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Pull Request Guidelines

- Clear description of changes
- Reference any related issues
- Include screenshots for UI changes
- Ensure all tests pass
- Update documentation as needed

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 About the Developer

**Deepak Tiwari** - Full Stack Developer
- GitHub: [@deepak-tiwarrri](https://github.com/deepak-tiwarrri)
- Portfolio: [Coming Soon]
- Email: deepak.tiwari@example.com

---

## 📞 Support

For support, email support@biteandroam.com or open an issue on GitHub.

### Useful Resources

- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express.js Guide](https://expressjs.com/)
- [Redux Documentation](https://redux.js.org/)

---

## 🙏 Acknowledgments

- Built with ❤️ using React, Express, and MongoDB
- UI inspired by modern design principles
- Thanks to the open-source community
- Special thanks to [shadcn/ui](https://ui.shadcn.com/) and [Material-UI](https://mui.com/)

---

## 📊 Project Statistics

| Metric | Value |
|--------|-------|
| **Frontend Components** | 25+ |
| **Backend Routes** | 10+ |
| **Database Collections** | 2 |
| **Lines of Code** | 5000+ |
| **CSS Variables** | 50+ |
| **Responsive Breakpoints** | 4 |

---

**Last Updated:** December 13, 2025

**Status:** 🟢 Active Development

---

<div align="center">

Made with 💙 by Deepak Tiwari

[⬆ back to top](#bite--roam---blog-application)

</div>
