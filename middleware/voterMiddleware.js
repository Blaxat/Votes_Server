const jwt = require('jsonwebtoken');

const VoterMiddleware = (req, res, next) => {
    try {
        const token = req.headers.token;
        if(!token) {
            return res.status(406).json({
                message: 'Token not found'
            });
        }
        const decoded = jwt.verify(token, process.env.VOTER_SECRET);
        console.log('DECODED', decoded);
        if(!decoded) {
            return res.status(407).json({
                message: 'Invalid Token'
            });
        }
        console.log(decoded);
        if(decoded.role != 'voter')
        {
            return res.status(406).json({
                message: 'Only voters are allowed'
            });
        }
        req.voterId = decoded.id;
        next();
    } catch(err) {
        console.log(err);
        return res.status(500).json({
            message : err
        });
    }
}

module.exports = VoterMiddleware;