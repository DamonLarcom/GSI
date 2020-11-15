//@ts-check
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import config from "./Configuration"
import {FRONTEND_URL, BACKEND_URL} from "./keys";

const app = express();

app.use(cors({credentials: true, origin: FRONTEND_URL}));
app.use(bodyParser.json({limit: '1gb'}));

new config(app);
const url = new URL(BACKEND_URL);

app.listen(url.port, () => {
    console.log(`Server started at ${url}`);
});