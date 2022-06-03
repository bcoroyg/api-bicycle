import express from 'express';
import bicycleRouter from './bicycle.route.js';
const router = express.Router();

const routerAPI = (app) => {
    app.use('/api/v0', router);
    router.use('/bicycles', bicycleRouter);
};

export default routerAPI;