import express from 'express';
import bicycleController from '../controllers/bicycle.controller.js';
import {authorize,verifyToken} from '../middlewares/index.js';
import Role from '../helpers/roles.js';
const router = express.Router();

router.get('/', [verifyToken, authorize([Role.Admin, Role.Customer])], bicycleController.getBicycles);
router.post('/', [verifyToken, authorize([Role.Admin])], bicycleController.postBicycle);
router.get('/:id', [verifyToken, authorize([Role.Admin])], bicycleController.getOneBicycle);
router.put('/:id', [verifyToken, authorize([Role.Admin])], bicycleController.putBicycle);
router.delete('/:id', [verifyToken, authorize([Role.Admin])], bicycleController.deleteBicycle);

export default router;