import express from 'express';
import bicycleRouter from './bicycle.route.js';
import userRouter from './user.route.js';
const router = express.Router();

const routerAPI = (app) => {
    app.use('/api/v0', router);
    router.use('/bicycles', bicycleRouter);
    router.use('/users', userRouter);
};

export default routerAPI;