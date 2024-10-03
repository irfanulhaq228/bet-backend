const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const db = require("./db/db.js");

// const UserRouter = require("./Routes/userRoutes.js");
const userModel = require("./Models/UserModel.js");

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

// app.use("/user", UserRouter);
app.get("/user", async (req, res) => {
    try {
        const user = await userModel.find();
        if (user.length === 0) {
            return res.status(400).json({ message: "User Data is Empty" })
        }
        return res.status(200).json({ message: "Data Sent Successfully", data: user });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error!" })
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Server runs at port ${process.env.PORT}`);
});