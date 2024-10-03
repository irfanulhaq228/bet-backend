const userModel = require("../Models/UserModel.js");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
    try {
        const { email, username } = req.body;
        const existingUser = await userModel.findOne({ email });
        const existingUsername = await userModel.findOne({ username });
        if (existingUser) {
            return res.status(409).json({ message: "Email already exists" });
        }
        if (existingUsername) {
            return res.status(409).json({ message: "Username already exists" });
        }
        const user = await userModel.create(req.body);
        const token = jwt.sign(user?._id, process.env.SECRET_KEY, { expiresIn: '30d' });
        return res.status(200).json({ message: "User created successfully", token });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error!" })
    }
};

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await userModel.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: "Incorrect Email or Password" });
        }
        if (user?.password !== password) {
            return res.status(401).json({ message: "Incorrect Email or Password" })
        }
        const id = user?.id;
        const token = jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: '30d' });
        return res.status(200).json({ message: "User logged in successfully", token });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error!" })
    }
};

const getAllUsers = async (req, res) => {
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
}

module.exports = {
    createUser,
    loginUser,
    getAllUsers
};