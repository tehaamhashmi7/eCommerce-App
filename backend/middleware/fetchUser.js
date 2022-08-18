const jwt = require('jsonwebtoken')

const fetchUser = async (req, res, next) => {

    // GET THE USER FROM THE TOKEN AND ADD THE ID TO THE REQUEST OBJECT

    const token = req.header('auth-token')
    if(!token) {
        return res.status(401).send({error: "fetch block - Please authenticate with a valid token"})
    }

    try {
        const data = jwt.verify(token, 'test_secret')
        req.user = data.user
        next()
    } catch(err) {
        console.log(err.message)
        res.status(401).send({error: "catch block - Please authenticate with a valid token"})
    }
}

module.exports = fetchUser