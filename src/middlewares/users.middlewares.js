const jwt = require('jsonwebtoken')
const jwtAuthMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        // throw new ErrorResponse(401, 'Không được phép')

        return res.status(401).json({ message: 'Unauthorized ' })
    }
    const token = authHeader.split(' ')[1]
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized ' })
    }

    try {
        const user = jwt.verify(token, 'tranvansi')
        req.user = user
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized ' })
    }
    next()
}

module.exports = jwtAuthMiddleware
