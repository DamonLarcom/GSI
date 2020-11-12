import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import config from "./Configuration"

const app = express();
const port = 8080; // default port to listen


app.use(cors({credentials: true, origin: 'http://localhost:8081'}));
app.use(bodyParser.json({limit: '1gb'}));

const con = new config(app);

app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});