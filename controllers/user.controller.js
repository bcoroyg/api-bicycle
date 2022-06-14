import models from '../models/index.js';
import bcrypt from 'bcrypt';

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
    try {
        const data = new models.User({
            name, 
            email, 
            password,
        });

        const user = data.save();
        return res.status(201).json({
            user,
        })
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