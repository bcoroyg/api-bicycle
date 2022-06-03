import express from 'express';
import userController from '../controllers/user.controller.js';
const router = express.Router();

router.get('/', userController.getUsers);
router.post('/', userController.postUser);
router.get('/:id', userController.getOneUser);
router.put('/:id', userController.putUser);
router.delete('/:id', userController.deleteUser);

export default router;