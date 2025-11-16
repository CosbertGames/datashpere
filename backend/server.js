const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

/* TEST ROOT ROUTE
app.get('/', (req, res) => {
  res.json({ 
    message: 'DATASPHERE Backend is LIVE!', 
    endpoints: {
      'GET all users': 'GET /api/users',
      'Create user': 'POST /api/users',
      'Update user': 'PUT /api/users/:id',
      'Delete user': 'DELETE /api/users/:id'
    }
  });
});*/

// DB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

// Routes
const userRoutes = require('./routes/userRoutes.js');
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});






/*const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// ---- Middleware ----
app.use(cors());                  // allow frontend on different port
app.use(express.json());          // parse JSON bodies

// ---- DB Connection ----
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// ---- Routes ----
const userRoutes = require('./routes/userRoutes.js');
app.use('/api/users', userRoutes);

// ---- 404 fallback ----
app.use('*', (req, res) => res.status(404).json({ message: 'Route not found' }));

// ---- Start server ----
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));*/

/*const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// DB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

// Routes - FIXED PATH
const userRoutes = require('./routes/userRoutes.js');  // ADD .js
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});*/