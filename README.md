# TO-DO App

A modern, full-stack TO-DO application built with React, Express, and MongoDB. Features a beautiful UI with glassmorphism effects, animations, and a complete task management system.

## Features

- ✅ Add, edit, delete tasks
- ✅ Mark tasks as completed
- ✅ Separate views for inbox (pending) and completed tasks
- ✅ Beautiful modern UI with gradients and glassmorphism
- ✅ Joke generator and quote display
- ✅ Responsive design
- ✅ MongoDB backend with full CRUD operations

## Tech Stack

- **Frontend:** React 19, React Router, Tailwind CSS, Vite
- **Backend:** Node.js, Express.js, MongoDB with Mongoose
- **Styling:** Tailwind CSS with custom gradients and animations

## Local Development

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Installation

1. Clone the repository
2. Install frontend dependencies:
   ```bash
   cd vf
   npm install
   ```

3. Install backend dependencies:
   ```bash
   cd server
   npm install
   ```

4. Set up environment variables:
   - Copy `vf/.env.example` to `vf/.env` (if needed for frontend)
   - Copy `vf/server/.env.example` to `vf/server/.env`
   - Update `MONGODB_URI` with your MongoDB connection string

5. Start the backend server:
   ```bash
   cd server
   npm run dev
   ```

6. Start the frontend (in a new terminal):
   ```bash
   cd vf
   npm run dev
   ```

7. Open [http://localhost:5173](http://localhost:5173) in your browser

## Deployment to Netlify

### Option 1: Frontend Only (Static Site)

1. **Build the frontend:**
   ```bash
   cd vf
   npm run build
   ```

2. **Deploy to Netlify:**
   - Go to [Netlify](https://netlify.com)
   - Drag and drop the `vf/dist` folder to deploy
   - Or connect your GitHub repository

3. **Environment Variables for Netlify:**
   - In Netlify dashboard, go to Site Settings > Environment Variables
   - Add: `MONGODB_URI` = your MongoDB Atlas connection string
   - Add: `NODE_VERSION` = 18

4. **Netlify Configuration:**
   - The `netlify.toml` file is already configured for you
   - Build command: `npm run build`
   - Publish directory: `dist`

### Option 2: Full Stack (Frontend + Backend)

1. **Deploy Backend to Netlify Functions:**
   - The server code is already converted to Netlify Functions format
   - Deploy the `server` folder to Netlify
   - Environment variables needed:
     - `MONGODB_URI` = your MongoDB Atlas connection string
     - `NODE_VERSION` = 18

2. **Deploy Frontend:**
   - Deploy the `vf` folder to a separate Netlify site
   - Update API calls to point to your backend Netlify URL
   - Example: `https://your-backend-site.netlify.app/.netlify/functions/api`

### Environment Variables Required for Netlify

**For Frontend Deployment:**
```
NODE_VERSION=18
```

**For Backend Deployment:**
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/todoapp
NODE_VERSION=18
```

### MongoDB Setup

1. Create a MongoDB Atlas account at [mongodb.com/atlas](https://mongodb.com/atlas)
2. Create a new cluster
3. Get your connection string
4. Whitelist your IP (or 0.0.0.0/0 for all IPs)
5. Add the connection string to your environment variables

## API Endpoints

- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## Project Structure

```
vf/
├── src/
│   ├── assets/
│   │   └── componant/
│   │       ├── addTask.jsx
│   │       ├── completed.jsx
│   │       ├── home.jsx
│   │       ├── inbox.jsx
│   │       ├── joke.jsx
│   │       └── Quote.jsx
│   ├── App.jsx
│   └── main.jsx
├── server/
│   ├── netlify/
│   │   └── functions/
│   │       └── api.js
│   ├── index.js
│   └── package.json
├── netlify.toml
└── package.json
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally
5. Submit a pull request

## License

MIT License
# TO_DO_APP
# TO_DO_APP
# TO_DO_APP
# TO_DO_APP
