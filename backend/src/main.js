//@ts-check
const express = require("express");
const bodyParser = require("body-parser");
// import cors from "cors";

// import config from "./Configuration"
// import {FRONTEND_URL, BACKEND_URL} from "./keys";

const app = express();

// app.use(cors({credentials: true, origin: FRONTEND_URL}));
// app.use(bodyParser.urlencoded({extended: false}));


// new config(app);
// const url = new URL(BACKEND_URL);


const homeRouter = require("./routes/homeRouter")();

app.use('/', homeRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
});