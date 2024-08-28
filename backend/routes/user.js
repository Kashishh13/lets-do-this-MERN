const router = require('express').Router();
const User = require('../models/user.js');
const bcrypt =require('bcryptjs')
const jwt=require('jsonwebtoken')
router.post("/sign-in", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validate that required fields are provided
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if username already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "Username already exists" });
        }

        // Validate username length
        if (username.length < 4) {
            return res.status(400).json({ message: "Username should have at least 4 characters" });
        }

        // Check if email already exists
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Create a new user
        const hashPassword=await bcrypt.hash(password,10)
        const newUser = new User({ username:req.body.username, email:req.body.email, password :hashPassword});
        await newUser.save();

        return res.status(200).json({ message: "Sign-in Successful" });

    } catch (error) {
        console.error("Error:", error.message); // Print detailed error message
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.post("/login",async(req,res)=>{
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ username });
        if (!existingUser) {
            return res.status(400).json({ message: "Username does not exists" });
        }
        bcrypt.compare(password,existingUser.password,(err,data)=>{
            if(data){
                const authClaims=[{name:username},{jti:jwt.sign({},"kg1309")}]
                const token=jwt.sign({authClaims},"kg1309",{expiresIn:"2d"})
                res.status(200).json({id:existingUser._id,token:token})
            }
            else{
             return res.status(400).json({ message: "Invalid Credentials" });
       
            }
        })
})
module.exports = router;
