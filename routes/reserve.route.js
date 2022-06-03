import express from 'express';
import reserveController from '../controllers/reserve.controller.js';
const router = express.Router();

router.get('/', reserveController.getReserves);
router.post('/', reserveController.postReserve);
router.get('/:id', reserveController.getOneReserve);
router.put('/:id', reserveController.putReserve);
router.delete('/:id', reserveController.deleteReserve);

export default router;