import express from 'express';
import authController from '../controllers/auth.controller.js';
const router = express.Router();

/**
 * @openapi
 * /confirmation/{token}:
 *    get:
 *      tags: [Auth]
 *      summary: "one user"
 *      parameters:
 *        - in: path
 *          name: token
 *          schema:
 *            type: string
 *          required: true
 *          description: the user token
 *      responses:
 *        '200':
 *          description: Account Activated!.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *        '400':
 *          description: We did not find a user with this token.
 */
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

/**
 * Register user
 * @openapi
 * /register:
 *    post:
 *      tags: [Auth]
 *      summary: "Register user"
 *      description: Register and return user
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *               type: object
 *               $ref: "#/components/schemas/authRegister"
 *      responses:
 *        '201':
 *          description: Return user and send email to activate account.
 *        '401':
 *          description: User or password incorrect.
 */
router.post('/register', authController.postRegisterUser);

/**
 * Register user
 * @openapi
 * /forgot-password:
 *    post:
 *      tags: [Auth]
 *      summary: "Forgot password"
 *      description: sent email to reset the password
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *               type: object
 *               $ref: "#/components/schemas/authForgotPassword"
 *      responses:
 *        '200':
 *          description: An email was sent to reset the password.
 *        '401':
 *          description: User not found!
 */
router.post('/forgot-password', authController.postForgotPassword);

/**
 * @openapi
 * /reset-password/{token}:
 *    get:
 *      tags: [Auth]
 *      summary: "one user"
 *      parameters:
 *        - in: path
 *          name: token
 *          schema:
 *            type: string
 *          required: true
 *          description: the user token
 *      responses:
 *        '200':
 *          description: return user.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *        '400':
 *          description: We did not find a user with this token.
 */
router.get('/reset-password/:token', authController.getResetPassword);

/**
 * Register user
 * @openapi
 * /reset-password/{token}:
 *    post:
 *      tags: [Auth]
 *      summary: Reset password user
 *      description: Reset password
 *      parameters:
 *        - in: path
 *          name: token
 *          schema:
 *            type: string
 *          required: true
 *          description: the user token
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *               type: object
 *               $ref: "#/components/schemas/authRegister"
 *      responses:
 *        '201':
 *          description: Return user and send email to activate account.
 *        '401':
 *          description: User or password incorrect.
 */
router.post('/reset-password/:token', authController.postResetPassword);

export default router;