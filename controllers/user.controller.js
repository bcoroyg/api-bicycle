import models from '../models/index.js';
import bcrypt from 'bcrypt';
import generateToken from '../helpers/generate-jwt.js';
import sendMail from '../helpers/email.js';

const getUsers = async (req, res) => {
    try {
        const users = await models.User.find({});
        return res.status(200).json({
            users
        });
    } catch (error) {
        return res.status(500).json({
            error: error.message,
        });
    };
};

const postUser = async (req, res) => {
    const {name, email, password} = req.body;
    let token;
    let url;
    let user
    try {
        user = new models.User({
            name, 
            email, 
            password,
        });
        await user.save();
    } catch (error) {
        const {errors} = error;
        if(errors.email){
            return res.status(500).json({
                message:errors.email.message
            });
        }
        return res.status(500).json({
            error: error.message,
        });
    };
    try {
        token = await generateToken(user._id);
        user.token = token;
        await user.save();
        url = `${process.env.HOST_FRONTEND}/confirmation/${token}`;  
        await sendMail({
            user,
            subject: 'Activate Account',
            html:`
            <b>Please click on the following link, or paste this into your browser to complete the process:</b>
            <a href="${url}">CLICK HERE!</a>
            `
        });
        return res.status(201).json({ 
            message: "An email was sent to activate account",
            user,
        });
    } catch (error) {
        return res.status(505).json({
            message:"Error Email"
        })
    }
};

const getOneUser = async (req, res) => {
    const {id} = req.params;
    try {
        const user = await models.User.findById(id);
        if(!user){
            return res.status(404).json({
                message: 'Not found user.'
            });
        };
        return res.status(200).json({
            user,
        })
    } catch (error) {
        return res.status(500).json({
            error: error.message,
        });
    };
};

const putUser = async (req, res) => {
    const {id} = req.params;
    const {name, email, password} = req.body;
    try {
        const data = {
            name, 
            email, 
            password,
        };

        if(password){
            const salt = await bcrypt.genSalt(10);
            data.password = await bcrypt.hash(password, salt);
        };

        const user = await models.User.findByIdAndUpdate(id, data, {new: true});
        if(!user){
            return res.status(404).json({
                message: 'Not found user.'
            });
        };

        return res.status(200).json({
            user,
        })
    } catch (error) {
        return res.status(500).json({
            error: error.message,
        });
    };
};

const deleteUser = async (req, res) => {
    const {id} = req.params;
    try {
        const user = await models.User.findByIdAndDelete(id);
        if(!user){
            return res.status(404).json({
                message: 'Not found user.'
            });
        };
        return res.status(200).json({
            message: 'User deleted.',
        });
    } catch (error) {
        return res.status(500).json({
            error: error.message,
        });
    };
};

export default {
    getUsers,
    postUser,
    getOneUser,
    putUser,
    deleteUser,
};