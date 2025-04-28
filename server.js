const rateLimit = require('express-rate-limit');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch((error) => console.error('❌ MongoDB connection error:', error));

// Routes
const contactRoutes = require('./routes/contactRoutes');
app.use('/api', contactRoutes);

// Root Route
app.get('/', (req, res) => {
    res.send('🚀 Backend server is live!');
});

// Start Server
app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
});

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use(limiter);