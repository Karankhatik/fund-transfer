const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/database');


connectDB();

app.use(express.json())
app.use(cors({
    origin: 'https://fund-transfer-nine.vercel.app', // Replace with your frontend domain
    methods: 'GET,POST,PUT,DELETE', // Specify allowed HTTP methods
    credentials: true // Allow cookies to be sent with requests
}));



app.use('/api/v1', require('./routes'));


const PORT = process.env.PORT || 5000

app.get('/', (req, res) => {
    res.send('Hello World!')
});


app.listen(PORT, () => console.log(`Server started on port ${PORT}\n`
    + `http://localhost:${PORT}`
))



