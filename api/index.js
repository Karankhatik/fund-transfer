const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const connectDB = require('./config/database');

// Connect to the database
connectDB();


app.use((req, res, next) => {
    res.header("Content-Type", "application/json");
    next();
});

app.use(express.urlencoded({ extended: true }));
// Use JSON middleware
app.use(express.json());

app.use((req,res, next) => {
    res.setHeader('Cache-Control', 'no-cache, no-store');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader(`Permissions-Policy`, `accelerometer=(),ambient-light-sensor=(),autoplay=(),battery=(),camera=(),display-capture=(),document-domain=(),encrypted-media=(),fullscreen=(),gamepad=(),geolocation=(),gyroscope=(),layout-animations=(self),legacy-image-formats=(self),magnetometer=(),microphone=(),midi=(),oversized-images=(self),payment=(),picture-in-picture=(),publickey-credentials-get=(),speaker-selection=(),sync-xhr=(self),unoptimized-images=(self),unsized-media=(self),usb=(),screen-wake-lock=(),web-share=(),xr-spatial-tracking=()`);
    next();
});
  
  // Define allowed origins
  const allowedOrigins = [
    'http://localhost:5173',
    'https://fund-transfer-nine.vercel.app/'
  ];
  
  // Define CORS options with TypeScript typing
  const corsOptions = {
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true); 
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
    optionsSuccessStatus: 200 
  };
  
  app.use(cors(corsOptions));

// Define your routes
app.use('/api/v1', require('./routes'));

// Define the root route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}\nhttp://localhost:${PORT}`));
