import express from 'express';
import bicycleController from '../controllers/bicycle.controller.js';
const router = express.Router();

router.get('/', bicycleController.getBicycles);
router.post('/', bicycleController.postBicycle);
router.get('/:id', bicycleController.getOneBicycle);
router.put('/:id', bicycleController.putBicycle);
router.delete('/:id', bicycleController.deleteBicycle);

export default router;