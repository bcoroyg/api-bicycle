import express from 'express';
import userController from '../controllers/user.controller.js';
import {authorize,verifyToken} from '../middlewares/index.js';
import Role from '../helpers/roles.js';
const router = express.Router();

/**
 * @openapi
 * /users:
 *    get:
 *      tags: [User]
 *      summary: "return all users"
 *      security:
 *        - ApiKeyAuth: []
 *      responses:
 *        '200':
 *          description: all users.
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: "#/components/schemas/User"
 *        '401':
 *          description: Access denied. We need a valid token.
 *        '403':
 *          description: You do not have the permitted role to access this resource.
 */
router.get('/',[verifyToken, authorize([Role.Admin])], userController.getUsers);

/**
 * @openapi
 * /users/{id}:
 *    get:
 *      tags: [User]
 *      summary: "one user"
 *      security:
 *        - ApiKeyAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: the user id
 *      responses:
 *        '200':
 *          description: one user.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                $ref: "#/components/schemas/User"
 *        '401':
 *          description: Access denied. We need a valid token.
 *        '403':
 *          description: You do not have the permitted role to access this resource.
 *        '404':
 *          description: User not found!.
 */
router.get('/:id', [verifyToken, authorize([Role.Admin])], userController.getOneUser);

/**
 * @openapi
 * /users/{id}:
 *    put:
 *      tags: [User]
 *      summary: "update user"
 *      security:
 *        - ApiKeyAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: the user id
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: "#/components/schemas/User"
 *      responses:
 *        '200':
 *          description: user updated!.
 *        '401':
 *          description: Access denied. We need a valid token.
 *        '403':
 *          description: You do not have the permitted role to access this resource.
 *        '404': 
 *          description: Not found user.
 */
router.put('/:id', [verifyToken, authorize([Role.Admin])], userController.putUser);

/**
 * @openapi
 * /users/{id}:
 *    delete:
 *      tags: [User]
 *      summary: "delete user"
 *      security:
 *        - ApiKeyAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: the user id
 *      responses:
 *        '200':
 *          description: user deleted!.
 *        '401':
 *          description: Access denied. We need a valid token.
 *        '403':
 *          description: You do not have the permitted role to access this resource.
 *        '404': 
 *          description: Not found user.
 */
router.delete('/:id', [verifyToken, authorize([Role.Admin])], userController.deleteUser);

export default router;