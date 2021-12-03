'use strict';
const jwt = require('jsonwebtoken');

const auth_jwt_bearer = async function (req, res, next) {
    return new Promise((resolve, reject) => {
        const { authorization } = req.headers;
        if (!authorization) return res.status(401).end('Unauthorized');

        const authSplit = authorization.split(' ')
        const [authType, authToken] = [
            authSplit[0],
            authSplit[1]
        ]

        if (authType !== 'Bearer') return res.status(401).end();

        return jwt.verify(authToken, process.env.JWT_SECRET, function (err, decode) {
            if (err) return res.status(401).end();

            return resolve(decode);
        })
    });
}

const auth_jwt = function (req, res, next) {
    const token = req.cookies.token;
    if (!token) return res.status(403).json({ message: 'empty token!' });
    
    try {
        const auth = jwt.verify(token, process.env.JWT_SECRET);
        // req.auth = auth;
        return next();
    } 
    catch (error) {
        res.clearCookie('token');
        return res.status(403).json({ message: 'invalid token!' });
    }
}

module.exports = {auth_jwt_bearer, auth_jwt};