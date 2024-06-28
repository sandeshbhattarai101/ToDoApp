import jwt from "jsonwebtoken";

export const isAuthenticated = (req, res, next) => {
    const token = req.cookies.token;

    if (!token ) {
        return res.status(400).json({
            message: "You are not authenticated"
        });
    }

    jwt.verify(token, process.env.SECRETKEY, (err, user) => {
        if (err) {
            return res.status(400).json({
                message: "Token not valid"
            });
        }

        req.user = user;
        next();
    });
};
