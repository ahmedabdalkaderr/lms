const User = require('../models/user');
const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => { 
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        
    }


    const token = authHeader.split(' ')[1];

    const decodedToken = jwt.verify(token,
        'mahmoud saleh novell'
    );

    if (!decodedToken) {
        
    }

    req.userName = decodedToken.userName;
    next();
}