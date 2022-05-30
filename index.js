import express, { json } from "express";
import cors from 'cors';
//import { connect, connection } from 'mongoose';
import pkg from 'mongoose';
const { connect, connection } = pkg;
//import { urlencoded, json as _json } from 'body-parser';
import pkg1 from 'body-parser';
const { urlencoded, json: _json } = pkg1;
import router from "./routes/receivers.js";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const app = express();
app.use(json());
app.use(urlencoded({ extended: true}));
app.use(_json());
app.use(cors());



app.use('/receivers', router);

const port = process.env.PORT

const dbUri = process.env.DATABASE_URL || 3001;

connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true,},() => {
  console.log('Connected to DB');
});

const db = connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

var server = app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
  
});

app.get('/', (req, res)=>{
    res.writeHead(200, { 'Content-Type':'text/html' });
    html = fs.readFileSync('./index.html');
    res.end(html);
});

export default app;
