const ourUser = require('../models/user')
const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { body, validationResult } = require('express-validator')
const router = express.Router()

// SIGNUP - CREATING A NEW USER, DOES NOT REQUIRE AUTHENTICATION

router.post('/signup', [
    body("username", "Enter a valid username").isLength({ min: 2 }),
    body("email", "Enter a valid email address").isEmail(),
    body("password", "Password must atleast be 5 character long").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    let success = false
    try{
        let foundUser = await ourUser.findOne({email: req.body.email})

        if(foundUser) {
            res.status(400).json({success, message: "This user already exists"})
        }
        else {
            const salt = await bcrypt.genSalt(10)
            const securedPassword = await bcrypt.hash(req.body.password, salt)

            const user = await new ourUser({
                username: req.body.username,
                email: req.body.email,
                password: securedPassword,
                regDate: req.body.regDate
            })

            const data = {
                user: {
                    id: user._id
                }
            }

            const jwtData = jwt.sign(data, "test_secret");
            console.log(jwtData);

            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                console.log(errors.array()[0].msg);
                return res.status(400).json({success, errors: errors.array()[0].msg});
            } else {
                await user.save();
                console.log(user)
                success = true
                return res.status(200).json({success, token: jwtData, user});
            }
        }

    }
    catch(err) {
        console.log(err)
    }
})


// LOGIN DOES NOT REQUIRE AUTHENTICATION

router.post('/login', [
    body("email", "Enter a valid email address").isEmail(),
    body("password", "Password must atleast be 5 character long").isLength({
      min: 5,
    })
],
async (req, res) => {
    let success = false
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        console.log(errors.array()[0].msg);
        return res.status(400).json({success, errors: errors.array() });
      }

    try {
        let foundUser = await ourUser.findOne({email: req.body.email})

        if (!foundUser) {
            res.status(404).json({success, message: "Invalid Email or Password"})
        } else {
            const passwordIsCorrect = await bcrypt.compare(
                req.body.password,
                foundUser.password
            )

            if(!passwordIsCorrect) {
                res.status(400).json({success, message: "Invalid Email or Password"})
            }

            await ourUser.updateOne({_id: foundUser._id}, {lastLogin: Date.now()})

            // GENERATING AUTH TOKEN

            const payload = {
                user: {
                    id: foundUser._id
                }
            }

            const jwtData = jwt.sign(payload, "test_secret");
            console.log(jwtData);
            success = true
            res.json({success, token: jwtData, foundUser});
        }
    } catch (err) {
        res.status(500).json({error: "Server Error"})
    }
})

module.exports = router
