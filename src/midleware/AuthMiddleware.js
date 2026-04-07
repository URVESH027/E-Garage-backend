const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (token) {
            if(token.startsWith("Bearer ")){
                token = token.slice(7, token.length);
            }
            jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
                if (err) {
                    return res.status(403).json({ message: "Forbidden" });
                }
                req.user = user;
                next();
            });
        }
        return res.status(401).json({ message: "Unauthorized" });
    } catch (err) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = authMiddleware;
