const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/database');


connectDB();

app.use(express.json())
app.options('*', cors()); // Enable preflight requests for all routes




app.use('/api/v1', require('./routes'));


const PORT = process.env.PORT || 5000

app.get('/', (req, res) => {
    res.send('Hello World!')
});


app.listen(PORT, () => console.log(`Server started on port ${PORT}\n`
    + `http://localhost:${PORT}`
))



