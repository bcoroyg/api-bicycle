const authorize = (roles = []) => {
    if(typeof roles === 'string'){
        roles = [roles];
    };

    return [
        (req, res, next) =>{
            if(!roles.includes(req.user.role)) {
                return res.status(403).json({
                    message: 'You do not have the permitted role to access this resource.',
                });
            };
            next();
        },
    ];
};

export default authorize;