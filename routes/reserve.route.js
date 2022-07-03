import express from 'express';
import reserveController from '../controllers/reserve.controller.js';
import {authorize,verifyToken} from '../middlewares/index.js';
import Role from '../helpers/roles.js';

const router = express.Router();

/**
 * @openapi
 * /reserves:
 *    get:
 *      tags: [Reserve]
 *      summary: "return all reserves"
 *      security:
 *        - ApiKeyAuth: []
 *      responses:
 *        '200':
 *          description: all reserves.
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: "#/components/schemas/Reserve"
 *        '401':
 *          description: Access denied. We need a valid token.
 *        '403':
 *          description: You do not have the permitted role to access this resource.
 */
router.get('/',[verifyToken, authorize([Role.Admin])], reserveController.getReserves);

/**
 * @openapi
 * /reserves:
 *    post:
 *      tags: [Reserve]
 *      summary: "create new reserve"
 *      security:
 *        - ApiKeyAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: "#/components/schemas/Reserve"
 *      responses:
 *        '201':
 *          description: new reserve created!.
 *        '401':
 *          description: Access denied. We need a valid token.
 *        '403':
 *          description: You do not have the permitted role to access this resource.
 */
router.post('/',[verifyToken, authorize([Role.Admin, Role.Customer])], reserveController.postReserve);

/**
 * @openapi
 * /reserves/{id}:
 *    get:
 *      tags: [Reserve]
 *      summary: "one reserve"
 *      security:
 *        - ApiKeyAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: the reserve id
 *      responses:
 *        '200':
 *          description: one reserve.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                $ref: "#/components/schemas/Reserve"
 *        '401':
 *          description: Access denied. We need a valid token.
 *        '403':
 *          description: You do not have the permitted role to access this resource.
 *        '404':
 *          description: Reserve not found!.
 */
router.get('/:id',[verifyToken, authorize([Role.Admin])], reserveController.getOneReserve);

/**
 * @openapi
 * /reserves/{id}:
 *    put:
 *      tags: [Reserve]
 *      summary: "update reserve"
 *      security:
 *        - ApiKeyAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: the reserve id
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: "#/components/schemas/Reserve"
 *      responses:
 *        '200':
 *          description: reserve updated!.
 *        '401':
 *          description: Access denied. We need a valid token.
 *        '403':
 *          description: You do not have the permitted role to access this resource.
 */
router.put('/:id',[verifyToken, authorize([Role.Admin])], reserveController.putReserve);

/**
 * @openapi
 * /reserves/{id}:
 *    delete:
 *      tags: [Reserve]
 *      summary: "delete reserve"
 *      security:
 *        - ApiKeyAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: the reserve id
 *      responses:
 *        '200':
 *          description: reserve deleted!.
 *        '401':
 *          description: Access denied. We need a valid token.
 *        '403':
 *          description: You do not have the permitted role to access this resource.
 *        '404':
 *          description: Reserve not found!.
 */
router.delete('/:id',[verifyToken, authorize([Role.Admin])], reserveController.deleteReserve);

export default router;