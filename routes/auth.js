const express = require('express');
const User = require('../models/user');
//For Hashing Password : (Terminal: npm i bcryptjs)
const bcrypt = require('bcryptjs');
const authRouter = express.Router();
//For Signin : (Terminal: npm i jsonwebtoken)
const jsonWebToken = require('jsonwebtoken');


authRouter.post('/api/signup', async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ msg: "User with same email already exist" });
        } else {
            //For Hashing Password : if number is larger,hashing will be stronger and get more time
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            let user = new User({ fullName, email, password: hashedPassword });
            user = await user.save();
            res.json({ user });
        }
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}
);

//Signin api endpoint
authRouter.post('/api/signin', async (req, res) => {
    try {
        const { email, password } = req.body;
        const findUser = await User.findOne({ email });
        if (!findUser) {
            return res.status(400).json({ msg: "User not fount with this email" });
        } else {
            const isMatche = await bcrypt.compare(password, findUser.password);

            if (!isMatche) {
                return res.status(400).json({ msg: "Incorrect Password" });
            } else {
                const token = jsonWebToken.sign({id: findUser._id }, "passwordKey");
                //Get all document of user except password and save in userWithoutPassword
                //Remove sensitive information
                const {password, ...userWithoutPassword} = findUser._doc;

                //Send the response
                res.json({token, ...userWithoutPassword});
            }
        }
    } catch (e) {
        res.status(500).json({error:e.message});
    }
});

module.exports = authRouter;

//request call
//Address   : Post => localhost:3000/api/signup
//Body      : 
// {
//     "fullName" : "test1",
//     "email" : "test1@gmail.com",
//     "password" : "test_test_1",
//     "state" : "Tehran",
//     "city" : "Tehran",
//     "locality" : "Iran"
// }

//request call
//Address   : Post => localhost:3000/api/signin
//Body      : 
// { 
//     "email" : "test1@gmail.com",
//     "password" : "test_test_1"
// }





