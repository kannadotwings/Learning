const { verify } = require('jsonwebtoken');

const authVerify = (req, res, next) => {
    let token = req.get('Authorization');

    if (token) {
        // Remove "Bearer " prefix
        token = token.replace('Bearer ', '');
        console.log("token--cleaned", token);

        verify(token, process.env.JWT_SECRET_KEY, (err) => {
            if (err) {
                console.log("err", err);
                return res.json({
                    "Code": "2",
                    "Message": "Unauthorized Credentials"
                });
            } else {
                next();
            }
        });
    } else {
        return res.json({
            "Code": "2",
            "message": "Unauthorized user Credentials"
        });
    }
};

module.exports = { authVerify };
