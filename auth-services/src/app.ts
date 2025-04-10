import express from "express";
import dotenv from "dotenv";
import routes from "../src/routes/user.route";

dotenv.config();

const app = express();

app.use(express.json());

app.use('/api/users', routes);

app.get("/", (_req, res) => {
    res.send("Auth Service is running! 💚");
  });

export default app;