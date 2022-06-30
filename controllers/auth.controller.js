import bcrypt from 'bcrypt';
import sendMail from '../helpers/email.js';
import generateToken from '../helpers/generate-jwt.js';
import models from '../models/index.js';

const getConfirmationAccount = async (req, res) => {
    const {token} = req.params;
    try {
        const user = await models.User.findOne({token});
        if (!user) {
            return res.status(400).json({ 
                message: 'We did not find a user with this token.',
            });
        };
    
        if (user.verified) {
            return res.status(204).json();
        }
    
        user.verified = true;
        await user.save();
    
        return res.status(200).json({
            message: 'Account Activated!'
        }); 
    } catch (error) {
        return res.status(500).json({
            error
        });
    };      
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await models.User.findOne({email});

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
        });
            
    } catch (error) {
        if (error) {
            return res.status(500).json(error.message);
        };
    };
};

const postForgotPassword = async (req, res) => {
    const {email} = req.body;
    let user;
    let token;
    let url;
    try {
        user = await models.User.findOne({email});
        if (!user) {
            return res.status(401).json({ 
                message: "User not found!", 
            }); 
        };
    } catch (error) {
        return res.status(500).json({
            error
        });
    };

    try {
        token = await generateToken(user._id);
        user.token = token;
        await user.save()
        url = `${process.env.HOST_FRONTEND}/reset-password/${token}`
        
        await sendMail({
            user,
            subject: 'Forgot password',
            html:`
            <b>Please click on the following link, or paste this into your browser to complete the process:</b>
            <a href="${url}">CLICK HERE!</a>
            `
        });
        return res.status(200).json({ 
            message: "An email was sent to reset the password"
        });
    } catch (error) {
        return res.status(500).json({
            error
        });
    };
};

const getResetPassword = async (req, res) => {
    const {token} = req.params;
    try {
        const user = await models.User.findOne({token});
        if (!user) {
            return res.status(400).json({ 
                message: 'We did not find a user with this token.',
            });
        };
        return res.status(200).json({ 
            user
        });
    } catch (error) {
        return res.status(500).json({
            error
        });
    };
};

const postResetPassword = async (req, res) => {
    const {email, password, confirm_password} = req.body;
    try {
        if(!password || !confirm_password){
            return res.json({
                message:"required."
            })
        };
        if (password !== confirm_password) {
            return res.json({
                message:"The password entered does not match, I tried again"
            })
        };

        const user = await models.User.findOne({email});
        if (!user) {
            return res.status(400).json({ 
                message: 'User not existed!.',
            });
        };

        user.password = password;
        await user.save();
        return res.status(200).json({ 
            message: "The password reset"
        });

    } catch (error) {
        return res.status(500).json({
            error
        });
    };
};

export default {
    getConfirmationAccount,
    login,
    postForgotPassword,
    getResetPassword,
    postResetPassword,
};