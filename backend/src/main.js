//@ts-check
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const session = require('express-session');

// import config from "./Configuration"
// import {FRONTEND_URL, BACKEND_URL} from "./keys";

const app = express();

app.use(cors({origin: 'http://localhost:8080'}));

// new config(app);
// const url = new URL(BACKEND_URL);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({secret: 'gsi'}));
require('./config/passport.js')(app);


const homeRouter = require("./routes/homeRouter")();
const userRouter = require("./routes/userRouter")();
const searchRouter = require("./routes/searchRouter")();
const postRouter = require("./routes/postRouter")();

app.use('/', homeRouter);
app.use('/user', userRouter);
app.use('/search', searchRouter);
app.use('/post', postRouter);
app.use(passport.initialize());
app.use(passport.session());

app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
});