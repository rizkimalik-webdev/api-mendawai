'use strict';
const jwt = require('jsonwebtoken');

const auth_jwt = async function (req, res, next) {
    return new Promise((resolve, reject) => {
        const { authorization } = req.headers;
        // console.log(authorization);
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

module.exports = auth_jwt;