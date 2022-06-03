import bcrypt from 'bcrypt';
import User from "../models/user.model.js";

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({email});

        if (!user) {
            return res.status(401).json({
                message: 'User or password incorrect.'
            });
        };

        if (!(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({
                message: 'User or password incorrect.'
            });
        };


        return res.status(200).json(user)
            
    } catch (error) {
        if (error) {
            return res.status(500).json(error.message);
        };
    };
};

export {
    login
}