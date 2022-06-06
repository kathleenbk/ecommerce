const router = require("express").Router();
const User = require("../models/user.model");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");


// Register
router.post("/register", async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt( req.body.password, process.env.SECRET_PASSWORD ).toString(),
    });

    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json(err);
    }
});



// Login
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne(
            { username: req.body.username });

            if (!user){
                return res.status(401).json("Wrong credentials.");
            }

        const hashedPassword = CryptoJS.AES.decrypt( user.password, process.env.SECRET_PASSWORD );

        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);


        if(originalPassword !== req.body.password){
            return res.status(401).json("Wrong credentials.");
        }

        const accessToken = jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin,
            },
            process.env.SECRET_TOKEN,
            { expiresIn: "3d" }
        );

        const { password, ...others } = user._doc;
        return res.status(200).json({ ...others, accessToken });

    } catch (err) {
        res.status(500).json(err);
    }

});

module.exports = router;