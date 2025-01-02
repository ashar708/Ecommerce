const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const connectDB = require('./config/db.js');
const router = require('./routes/index.js');


const app = express();

app.use(cors({
    origin: true,
    credentials: true
}));


app.use(express.json());
app.use(cookieParser())

const PORT = 7658 || process.env.PORT;

app.use('/api',router);




connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log("Server is running...")
    })
});





