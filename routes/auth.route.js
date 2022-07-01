import express from 'express';
import authController from '../controllers/auth.controller.js';
const router = express.Router();

router.get('/confirmation/:token', authController.getConfirmationAccount);

/**
 * Login user
 * @openapi
 * /login:
 *    post:
 *      tags: [Auth]
 *      summary: "Login user"
 *      description: login and return token
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                 type: object
 *                 $ref: "#/components/schemas/authLogin"
 *      responses:
 *        '200':
 *          description: Return token.
 *        '401':
 *          description: User or password incorrect.
 */
router.post('/login', authController.login);

router.post('/forgot-password', authController.postForgotPassword);
router.get('/reset-password/:token', authController.getResetPassword);
router.post('/reset-password', authController.postResetPassword);

export default router;