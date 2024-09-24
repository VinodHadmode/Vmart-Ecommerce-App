const jwt = require("jsonwebtoken")
require("dotenv").config()

const adminAuth = (req, res, next) => {
    try {
        // Extract token from the Authorization header
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ success: false, message: "Authorization token missing or malformed" });
        }

        // Extract the actual token from the header
        const token = authHeader.split(' ')[1];
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("decoded token", decoded);

        // Check if the role is 'admin'
        if (decoded && decoded.role === 'admin') {
            next();
        } else {
            return res.status(403).json({ success: false, message: "Forbidden: Admin access required" });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Something went wrong.." });
    }
};

module.exports = {
    adminAuth
}