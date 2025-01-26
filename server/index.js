import connectWithDB from "./config/database.js";
import express from "express";
import "dotenv/config";
import cors from "cors"
import router from "./routes/router.js";
const app = express();

const port = process.env.port;
app.use(cors());
app.use(express.json())
app.use(router);
app.get("/", (req, res) => {
  res.send("<h1>Home page server</h1>");
});
connectWithDB();

app.listen(port, (req, res) => {
  console.log(`App started at PORT ${port}`);
});
