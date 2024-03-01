const User = require('../models/user');
const bcrypt = require('bcrypt');


exports.createUser = async(req, res, next) => {
    const userName = req.body.userName;
    const password = req.body.password;
    const firstName = req.body.firstName;

    let user = await User.findOne({ userName: userName });
    if (user) {
        return res.status().json({
            message: 'User already exists'
        });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    user = new User({ userName: userName, password: hashedPassword, firstName : firstName });
    await user.save();

    return res.status(201).json({
        message: 'User created successfully',
        user: {
            userName: userName
        }
    });
}

exports.updateUser = async  (req, res, next) => {
    const userName = req.body.userName;
    const firstName = req.body.firstName;


    const user = await User.findOne({ userName: userName });
    if (!user) {
        
    }

    user.userName = userName;
    user.firstName = firstName;
    await user.save();

    return res.status(200).json({
        message: 'User updated successfully',
        user: {
            userName: userName,
            firstName : firstName
        }
    });
}

exports.deleteUser = async (req, res, next) => {
    const userName = req.body.userName;

    const user = await User.findOneAndDelete({ userName: userName });
   
    return res.status(200).json({
        message: 'User deleted successfully',
        user: {
            userName: userName
        }
    });
}