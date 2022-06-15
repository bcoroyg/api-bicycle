import express from 'express';
import authController from '../controllers/auth.controller.js';
const router = express.Router();

router.get('/confirmation/:token', authController.getConfirmationAccount);
router.post('/login', authController.login);
router.post('/forgot-password', authController.postForgotPassword);
router.get('/reset-password/:token', authController.getResetPassword);
router.post('/reset-password', authController.postResetPassword);

export default router;