const User = require('../models/User')
const jwt = require('jsonwebtoken')

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '60d'});
}

exports.createUser = async (req, res) => {
    try {
        const {firstName, lastName, username, email, password, role, avatar} = req.body;
        const userExist = await User.findOne({username});
        if (userExist) return res.status(400).json({message: 'User already exist'});
        const user = await User.create({
            firstName, lastName, username, email, password, role, avatar
        });
        res.status(201).json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            email: user.email,
            password: user.password
        })
    } catch (error) {
        
    }
}