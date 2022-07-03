import models from '../models/index.js';

const getReserves = async (req, res) => {
    try {
        const reserves = await models.Reserve
            .find({})
            .populate('user bicycle');
        return res.status(200).json({
            reserves
        });
    } catch (error) {
        return res.status(500).json({
            error: error.message,
        });
    };
};

const postReserve = async (req, res) => {
    const {bicycleId, userId,from, to} = req.body;
    try {
        const userDB = models.User.findById(userId);
        const bicycleDB = models.Bicycle.findById(bicycleId);
        const [user, bicycle] = await Promise.all([userDB, bicycleDB]);
        if(!user){
            return res.status(404).json({
                message:"User not Found"
            });
        };
        if(!bicycle){
            return res.status(404).json({
                message:"Bicycle not Found"
            });
        };

        if(bicycle.reserved){
            return res.status(200).json({
                message:"Bicycle was already reserved."
            });
        };

        bicycle.reserved = true;
        await bicycle.save();

        const data = {
            bicycle:bicycleId,
            user:userId,
            from, 
            to, 
        };

        const reserve = await models.Reserve.create(data);
        return res.status(201).json({
            reserve,
        })
    } catch (error) {
        return res.status(500).json({
            error: error.message,
        });
    };
};

const getOneReserve = async (req, res) => {
    const {id} = req.params;
    try {
        const reserve = await models.Reserve
            .findById(id)
            .populate('user bicycle');
        if(!reserve){
            return res.status(404).json({
                message: 'Not found reserve.'
            });
        };
        return res.status(200).json({
            reserve,
        })
    } catch (error) {
        return res.status(500).json({
            error: error.message,
        });
    };
};

const putReserve = async (req, res) => {
    const {id} = req.params;
    const {bicycleId, userId,from, to} = req.body;
    try {
        const data = {
            bicycle:bicycleId,
            user:userId,
            from, 
            to, 
        };

        const reserve = await models.Reserve.findByIdAndUpdate(id, data, {new: true});

        if(!reserve){
            return res.status(404).json({
                message: 'Not found reserve.'
            });
        };

        return res.status(200).json({
            reserve,
        })
    } catch (error) {
        return res.status(500).json({
            error: error.message,
        });
    };
};

const deleteReserve = async (req, res) => {
    const {id} = req.params;
    try {
        const reserve = await models.Reserve.findByIdAndDelete(id);
        if(!reserve){
            return res.status(404).json({
                message: 'Not found reserve.'
            });
        };
        return res.status(200).json({
            message: 'Reserve deleted.',
        });
    } catch (error) {
        return res.status(500).json({
            error: error.message,
        });
    };
};

export default {
    getReserves,
    postReserve,
    getOneReserve,
    putReserve,
    deleteReserve,
};