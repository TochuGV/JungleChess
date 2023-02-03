import express from "express";
import userController from "./controllers/userController";
import cors from "cors";
import "dotenv/config"

const app = express();
const port = process.env.PORT ?? 8080;

app.use(cors());
app.use(express.json());

app.use("/user", userController);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
