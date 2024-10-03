const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const db = require("./db/db.js");

const UserRouter = require("./Routes/userRoutes.js");

dotenv.config();
const app = express();

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db;

app.get("/", (req, res) => {
    res.json({ message: "Backend is running correctly!!!" });
});

app.get("/test", (req, res) => {
    res.json({ message: "Testing Successful" });
});

app.use("/user", UserRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server runs at port ${process.env.PORT}`);
});