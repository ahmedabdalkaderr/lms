const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


exports.logIn = async (req, res, next) => {
    const userName = req.body.userName;
    const password = req.body.password;

    const user = await User.findOne({ userName: userName });
    if (!user) {

    }

    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {

    }

    const token = jwt.sign(
        {
            userName: userName,
        },
        'mahmoud saleh novell'
    );

    res.status(200).json({
        token: token, userName: userName
    });

}