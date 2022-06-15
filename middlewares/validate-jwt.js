import jwt from 'jsonwebtoken';
import models from '../models/index.js';

const checkToken = async (req, res, next) => {
    const jwtToken = req.header('Authorization');
    console.log(req.headers)
    if(!jwtToken) {
        return res.status(401).json({
            message: 'Access denied. We need a valid token.'
        });
    };
    try {
        const {uid} = jwt.verify(jwtToken, process.env.JWT_SECRET);
        const user = await models.User.findById(uid);
        if (!user) {
            return res.status(401).json({
                message: 'Access denied, invalid token.'
            });
        };
        req.user = user;
        next()
    } catch (error) {
        return res.status(401).json({
            message: 'Access denied, invalid token.',
        })
    };
};

export default checkToken;