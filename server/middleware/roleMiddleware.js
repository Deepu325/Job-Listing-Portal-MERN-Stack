export const authorize = (...roles) => {
    // Handle both authorize("Role") and authorize(["Role"])
    const allowedRoles = roles.flat();

    return (req, res, next) => {
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                message: `Access denied. Role '${req.user.role}' is not authorized to access this resource.`
            });
        }
        next();
    };
};
