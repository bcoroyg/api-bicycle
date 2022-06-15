import express from 'express';
import userController from '../controllers/user.controller.js';
import {authorize,verifyToken} from '../middlewares/index.js';
import Role from '../helpers/roles.js';
const router = express.Router();

router.get('/',[verifyToken, authorize([Role.Admin])], userController.getUsers);
router.post('/', [verifyToken, authorize([Role.Admin])], userController.postUser);
router.get('/:id', [verifyToken, authorize([Role.Admin])], userController.getOneUser);
router.put('/:id', [verifyToken, authorize([Role.Admin])], userController.putUser);
router.delete('/:id', [verifyToken, authorize([Role.Admin])], userController.deleteUser);

export default router;