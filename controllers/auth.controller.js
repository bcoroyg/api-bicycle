import bcrypt from 'bcrypt';
import sendMail from '../helpers/email.js';
import generateToken from '../helpers/generate-jwt.js';
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

        const token = await generateToken(user._id);


        return res.status(200).json({
            token,
            user
        });
            
    } catch (error) {
        if (error) {
            return res.status(500).json(error.message);
        };
    };
};

const forgot_password = async (req, res) => {
    const {email} = req.body;
    try {
        const user = await User.findOne({email});
        if (!user) {
            return res.status(401).json({ 
                message: "User not found!", 
            }); 
        };
        const token = await generateToken(user._id);
        const url = `${process.env.HOST_FRONTEND}/reset-password/${token}`
        user.passwordResetToken = token;
        await user.save()
        try {
            await sendMail({
                user,
                subject: 'Forgot password',
                html:`
                <b>Please click on the following link, or paste this into your browser to complete the process:</b>
                <a href="${url}">${url}</a>
                `
            });
            return res.status(200).json({ 
                message: "An email was sent to reset the password"
            });
        } catch (error) {
            console.log(error);
        }
    } catch (error) {
        console.log(error);
    }
};

export default {
    login,
    forgot_password
}