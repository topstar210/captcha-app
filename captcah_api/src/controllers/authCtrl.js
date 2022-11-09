const jwt = require("jsonwebtoken"); // import jwt to sign tokens

const User = require('../models/users');

const authCtrl = {
    login: (req, res) => {
        // Find user with requested email 
        User.findOne({ email: req.body.email }, async function (err, User) {
            if (User === null) {
                return res.status(400).send({
                    message: "User not found."
                });
            }
            else {
                if (User.validPassword(req.body.password)) {
                    const token = await jwt.sign({ 
                        user_id: User._id, 
                        name: User.name,
                        email: User.email
                    }, process.env.SECRET);
                    return res.status(201).send({
                        token,
                        uData: {
                            user_id: User._id, 
                            name: User.name,
                            email: User.email
                        },
                        message: "User Logged In",
                    })
                }
                else {
                    return res.status(400).send({
                        message: "Wrong Password"
                    });
                }
            }
        });
    },

    register: (req, res) => {
        User.findOne({ email: req.body.email }, function (err, user) {
            if (user === null) {
                // Creating empty user object 
                let newUser = new User();
                // Initialize newUser object with request data 
                newUser.name = req.body.username;
                newUser.email = req.body.email;
                newUser.password = req.body.password;
                // Call setPassword function to hash password 
                newUser.setPassword(req.body.password);

                // Save newUser object to database 
                newUser.save(async (err, User) => {
                    if (err) {
                        return res.status(400).send({
                            message: "Failed to add user."
                        });
                    }
                    else {
                        const token = await jwt.sign({ 
                            user_id: User._id, 
                            name: User.name,
                            email: User.email
                        }, process.env.SECRET);
                        return res.status(201).send({
                            token,
                            uData: { 
                                user_id: User._id, 
                                name: User.name,
                                email: User.email
                            },
                            message: "User added successfully."
                        })
                    }
                });
            } else {
                return res.status(400).send({
                    message: "User Already Exist."
                });
            }
        });

    },

    logout: async (req, res) => {
        return res.status(201).send({ message: "logout" })
    },

    checkToken: async (req, res) => {
        const token = req.body.token.split(" ")[1];
        const payload = await jwt.verify(token, process.env.SECRET);
        return res.status(201).send({
            token, 
            uData: {
                user_id: payload._id, 
                name: payload.name,
                email: payload.email
            },
            message: "token verification success"
        });
    }
}

module.exports = authCtrl;