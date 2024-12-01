require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');
const connectDB = require("./server/config/db.js");
const cookieParser = require("cookie-parser");
const MongoStore = require('connect-mongo');
const session = require('express-session');

const app = express();
const PORT = 5000 || process.env.PORT;

connectDB();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI
    }),
    
}));

app.use(express.static('public'));
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');


app.use('/', require('./server/routes/main.js'));
app.use('/', require('./server/routes/admin.js') )



app.listen(PORT, () => {
    console.log(`App is listneing on port ${PORT}`);
})