import jwt from 'jsonwebtoken';
import models from '../models/index.js';

const verifyToken = async (req, res, next) => {
    const jwtToken = req.header('Authorization');
    if(!jwtToken) {
        return res.status(401).json({
            message: 'Access denied. We need a valid token.'
        });
    };
    try {
        const {uid} = jwt.verify(jwtToken, process.env.JWT_SECRET);
        const userDB = await models.User.findById(uid);
        if (!userDB) {
            return res.status(401).json({
                message: 'Access denied, invalid token.'
            });
        };
        const { name, role} = userDB;
        req.user = {_id:uid,name,role};
        next()
    } catch (error) {
        return res.status(401).json({
            message: 'Access denied, invalid token.',
        })
    };
};

export default verifyToken;