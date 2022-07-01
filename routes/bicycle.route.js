import express from 'express';
import bicycleController from '../controllers/bicycle.controller.js';
import {authorize,verifyToken} from '../middlewares/index.js';
import Role from '../helpers/roles.js';
const router = express.Router();

/**
 * @openapi
 * /bicycles:
 *    get:
 *      tags: [Bicycle]
 *      summary: "return all bicycles"
 *      responses:
 *        '200':
 *          description: all bicycles.
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: "#/components/schemas/Bicycle"
 *        '401':
 *          description: Access denied. We need a valid token.
 */
router.get('/', bicycleController.getBicycles);

/**
 * @openapi
 * /bicycles:
 *    post:
 *      tags: [Bicycle]
 *      summary: "create new bicycle"
 *      security:
 *        - ApiKeyAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: "#/components/schemas/Bicycle"
 *      responses:
 *        '201':
 *          description: new bicycle created!.
 *        '401':
 *          description: Access denied. We need a valid token.
 */
router.post('/', [verifyToken, authorize([Role.Admin])], bicycleController.postBicycle);

/**
 * @openapi
 * /bicycles/{id}:
 *    get:
 *      tags: [Bicycle]
 *      summary: "one bicycle"
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: the bicycle id
 *      responses:
 *        '200':
 *          description: one bicycle.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                $ref: "#/components/schemas/Bicycle"
 *        '404':
 *          description: Bicycle not found!.
 */
router.get('/:id', bicycleController.getOneBicycle);

/**
 * @openapi
 * /bicycles/{id}:
 *    put:
 *      tags: [Bicycle]
 *      summary: "update bicycle"
 *      security:
 *        - ApiKeyAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: the bicycle id
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: "#/components/schemas/Bicycle"
 *      responses:
 *        '200':
 *          description: bicycle updated!.
 *        '401':
 *          description: Access denied. We need a valid token.
 */
router.put('/:id', [verifyToken, authorize([Role.Admin])], bicycleController.putBicycle);

/**
 * @openapi
 * /bicycles/{id}:
 *    delete:
 *      tags: [Bicycle]
 *      summary: "delete bicycle"
 *      security:
 *        - ApiKeyAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: the bicycle id
 *      responses:
 *        '200':
 *          description: bicycle deleted!.
 *        '401':
 *          description: Access denied. We need a valid token.
 */
router.delete('/:id', [verifyToken, authorize([Role.Admin])], bicycleController.deleteBicycle);

export default router;