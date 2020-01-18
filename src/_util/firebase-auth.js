const admin = require('firebase-admin')

const checkIfAuthenticated = async (req, res, next) => {
    try {
        const { authorization } = req.headers
        const decoded = await admin.auth().verifyIdToken(authorization)
        req.decoded = decoded
        next()
    } catch (e) {
        console.log(e)
        return res.status(401).send({ error: 'You are not authorized to make this request' })
    }
}

module.exports = checkIfAuthenticated
