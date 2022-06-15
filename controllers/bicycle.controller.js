import models from '../models/index.js';
import shortid from 'shortid';

const getBicycles = async (req, res) => {
    try {
        const bicycles = await models.Bicycle.find({});
        return res.status(200).json({
            bicycles
        });
    } catch (error) {
        return res.status(500).json({
            error: error.message,
        });
    };
};

const postBicycle = async (req, res) => {
    const {color, model} = req.body;
    try {
        const data = {
            code: shortid.generate(),
            color,
            model,
        };

        const bicycle = await models.Bicycle.create(data);
        return res.status(201).json({
            bicycle,
        })
    } catch (error) {
        return res.status(500).json({
            error: error.message,
        });
    };
};

const getOneBicycle = async (req, res) => {
    const {id} = req.params;
    try {
        const bicycle = await models.Bicycle.findById(id);
        if(!bicycle){
            return res.status(404).json({
                message:'Bike not found.'
            });
        };
        return res.status(200).json({
            bicycle,
        })
    } catch (error) {
        return res.status(500).json({
            error: error.message,
        });
    };
};

const putBicycle = async (req, res) => {
    const {id} = req.params;
    const {color, model} = req.body;
    try {
        const data = {
            color,
            model,
        };

        const bicycle = await models.Bicycle.findByIdAndUpdate(id, data, {new: true});
        if(!bicycle){
            return res.status(404).json({
                message:'The bike you want to update does not exist'
            });
        };
        return res.status(200).json({
            bicycle,
        })
    } catch (error) {
        return res.status(500).json({
            error: error.message,
        });
    };
};

const deleteBicycle = async (req, res) => {
    const {id} = req.params;
    try {
        const bicycle = await models.Bicycle.findByIdAndDelete(id);
        if(!bicycle){
            return res.status(404).json({
                message:'The bike you want to delete does not exist'
            });
        };
        return res.status(200).json({
            message: 'Bicycle deleted.',
        });
    } catch (error) {
        return res.status(500).json({
            error: error.message,
        });
    };
};

export default {
    getBicycles,
    postBicycle,
    getOneBicycle,
    putBicycle,
    deleteBicycle,
};