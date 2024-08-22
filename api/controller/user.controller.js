const User = require('../models/users.model');
const zod = require('zod');
const jwt = require('jsonwebtoken');
const Account = require('../models/account.model');

const schema = zod.object({
    first_name: zod.string().min(3).max(30),
    last_name: zod.string().min(3).max(30),
    username: zod.string().email(),
    password: zod.string().min(6).max(20),
});

createUser = async (req, res) => {
    try {
        const {first_name, last_name, username, password} = req.body;        

        const result = schema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({message: "Email already taken / Incorrect inputs"});
        }
        const user = await User.findOne({username: username});
        if(user) return res.status(400).json({message: "Email already taken / Incorrect inputs"});
        
        const newUser = await User.create({
            first_name: first_name,
            last_name: last_name,
            username: username,
            password: password                              
        });
        

        await Account.create({
            user_id: newUser._id,
            balance: 1 + Math.random() * 10000
        });

        const token = jwt.sign({userId: newUser._id}, process.env.JWT_SECRET, {expiresIn: '24h'});

        res.status(200).json({message: "User Created", token: token});
        
    } catch (error) {
        console.log("error",error);
        res.status(500).json({message: error.message});
    } 
}

const loginSchema = zod.object({
    username: zod.string().email(),
    password: zod.string().min(6).max(20),
});

const login = async (req, res) => {
    try {
        const {username, password} = req.body; 
        const result = loginSchema.safeParse(req.body);

        if(!result.success) {
            return res.status(400).json({message: "Incorrect inputs"});
        }

        const user = await User.findOne({username: username});
        if(!user) return res.status(400).json({message: "Incorrect inputs"});

        if(user.password !== password) return res.status(400).json({message: "Incorrect inputs"});
        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: '24h'});
        res.status(200).json({message: "Login Successful", token: token});
    } catch (error) {
        console.log("error",error);
        res.status(500).json({message: "soemething went wrong"});
    } 
}

const logout = async (req, res) => {
    try {
        res.clearCookie('token');   
        res.status(200).json({message: "Logout Successful"});
    } catch (error) {
        console.log("error",error);
        res.status(500).json({message: "soemething went wrong"});
    } 
}   


module.exports = {
    createUser,
    login,
    logout
}