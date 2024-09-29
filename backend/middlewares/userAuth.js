const jwt = require('jsonwebtoken')

const userAuth = (req, res, next) => {
    try {
        // Extract token from the Authorization header
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ success: false, message: "Authorization token missing or malformed" });
        }

        // Extract the actual token from the header
        const token = authHeader.split(' ')[1];

        if (!token) {
            return res.status(400).json({ success: false, message: "Please login again." });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = decoded.id
        next()

    } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, message: error.message });
    }
}

module.exports={
    userAuth
}