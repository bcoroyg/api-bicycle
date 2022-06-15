import express from 'express';
import reserveController from '../controllers/reserve.controller.js';
import {authorize,verifyToken} from '../middlewares/index.js';
import Role from '../helpers/roles.js';

const router = express.Router();

router.get('/',[verifyToken, authorize([Role.Admin])], reserveController.getReserves);
router.post('/',[verifyToken, authorize([Role.Admin])], reserveController.postReserve);
router.get('/:id',[verifyToken, authorize([Role.Admin])], reserveController.getOneReserve);
router.put('/:id',[verifyToken, authorize([Role.Admin])], reserveController.putReserve);
router.delete('/:id',[verifyToken, authorize([Role.Admin])], reserveController.deleteReserve);

export default router;