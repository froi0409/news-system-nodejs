const jwt = require('jsonwebtoken');
const { config } = require('dotenv');

config();

exports.authorize = function (roles = []) {
    if (!Array.isArray(roles)) roles = roles;

    return (req, res, next) => {
        function sendError(msg) {
            return req.res.status(403).json({
                message: msg
            });
        }

        try {
            const token = req.headers['Authorization'] || req.headers['authorization'];

            if (!token) return sendError('Error: No token');
            if (token.indexOf("Bearer")  !== 0) return sendError('Error: Token format is not valid');

            const tokenString = token.split(' ')[1];

            jwt.verify(tokenString, process.env.SECRET, (err, decodedToken) => {
            if (err) {
                console.log(err);
                return sendError("Error: Broken Or Expired Token");
            }

            if (!decodedToken.role) return sendError("Error: Role missing");
            const userRole = decodedToken.role;
            
            if (roles.indexOf(userRole) === -1) return sendError("Error: User not authorized");

            req.user = decodedToken;
            next();
        });
        } catch (err) {
            console.log(err);
            return req.res.send.status(500).json({ message: "Server Error Occured" });
        }
    }
}

exports.Roles = {
    USER: ['USER'],
    ADMINISTRATOR: ['ADMINISTRATOR'],
    ALL: ['USER', 'ADMINISTRATOR']
}
