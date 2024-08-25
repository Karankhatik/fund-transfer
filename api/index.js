const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const connectDB = require('./config/database');

// Connect to the database
connectDB();

// Use JSON middleware
app.use(express.json());

// Set up CORS for all routes
app.use(cors({
    origin: ['https://fund-transfer-nine.vercel.app'], // Allow this frontend domain
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed methods
    credentials: true
}));

// Enable preflight requests for all routes
app.options('*', cors()); // This line

// Define your routes
app.use('/api/v1', require('./routes'));

// Define the root route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}\nhttp://localhost:${PORT}`));
