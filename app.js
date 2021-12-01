const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv');
const path = require('path');
const Connect = require('./config/db');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');



//Implement app.env
dotenv.config({
    path: "./config/app.env",
});




//Load Routes
const authRoute = require('./routes/auth');
const diseaseRoute = require('./routes/medicine');


//BodyParser and Cookie parser
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());



//Mount User Route
app.use(express.static(path.join(__dirname,'public'))); 
app.use('/api/', authRoute);
app.use('/api/',diseaseRoute);


Connect();
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST;
app.listen(
    PORT,
    () => console.log(`\n*****Server Started*****   
    Host : ${HOST}   
    Mode:${process.env.NODE_ENV} 
    PORT: ${PORT}`.yellow.bold)
);
