import jwt from 'jsonwebtoken';

const generateToken = (uid) => {
    return new Promise((resolve, reject)=> {
        const payload = {uid};
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_TIME_EXPIRE },
            (err, token) => {
                if(err){
                    console.log(err);
                    reject('Token error.')
                } else {
                    resolve(token)
                }
            },
        );
    });
};

export default generateToken;
