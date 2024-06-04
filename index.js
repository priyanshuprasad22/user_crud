const express = require('express');
const bodyParser= require('body-parser');
const dotenv=require('dotenv');
const connectDB = require('./config/db.js');
const cors= require('cors');

const authMiddleware = require('./Middleware/authmiddleware.js');

const authRouter = require('./Routes/authRoutes.js');
const userRouter= require('./Routes/routes.js');

const app = express();



dotenv.config();

app.use(cors());
connectDB();
const PORT= process.env.PORT || 3000;



app.use(bodyParser.json());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1', authMiddleware, userRouter);



app.listen(PORT,()=>{
    console.log(`Application is running on port ${PORT}`);
})

module.exports = app;