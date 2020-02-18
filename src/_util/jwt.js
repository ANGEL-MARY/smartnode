/* eslint-disable consistent-return */
/* eslint-disable no-else-return */
const jwt = require('jsonwebtoken')
const config = require('../_config/_config')

const verifyJWTTokenIsUser = async (req, res, next) => {
    // check header or url parameters or post parameters for token
    const token = req.body.token || req.query.token || req.headers['x-access-token']

    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, config.SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    success: false,
                    message: `Failed to authenticate token : ${err.message}`,
                })
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded
                next()
            }
        })
    } else {
        // if there is no token
        // return an error
        // next();
        return res.status(401).send({
            success: false,
            message: 'Authorization denied.',
        })
    }
}

exports.verifyJWTTokenIsUser = verifyJWTTokenIsUser
