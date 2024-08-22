const jwt = require('jsonwebtoken');


const authUser = (req, res, next) => {
    try {
        const token = req.headers['authorization'];

        if (token) {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            if (decoded.userId) {
                req.userId = decoded.userId;
                console.log(req.userId)
                next();
            } else {
                res.status(400).json({ message: "Invalid user" });
            }
        }
    } catch (error) {
        res.status(500).json({ message: "something went wrong" });
    }
}

module.exports = authUser