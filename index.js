const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const db = require("./db/db.js");

const UserRouter = require("./Routes/userRoutes.js");

dotenv.config();
const app = express();

const corsOptions = {
    origin: process.env.FRONTEND_URL || '*',
    optionsSuccessStatus: 200
};

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db;

app.get("/", (req, res) => {
    res.json({ message: "Real Estate Backend is running correctly!!!" });
});

app.use("/user", UserRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server runs at port ${process.env.PORT}`);
});