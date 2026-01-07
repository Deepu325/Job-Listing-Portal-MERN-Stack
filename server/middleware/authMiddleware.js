import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Authentication failed: No token provided",
            });
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                message: "Authentication failed: Token missing",
            });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET || "default_secret");

        req.user = {
            userId: decodedToken.userId,
            role: decodedToken.role,
        };

        next();
    } catch (error) {
        console.error(`Auth Middleware error: ${error.message}`);
        return res.status(401).json({
            message: "Authentication failed: Invalid token",
        });
    }
};

export default authMiddleware;
