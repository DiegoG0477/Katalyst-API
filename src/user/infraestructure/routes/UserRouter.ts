import express from 'express';
import { authMiddleware } from '../../../middlewares/authMiddleware';

import {
    registerUserController,
    getPasswordController,
    changePasswordController,
    getAllUsersController
} from '../dependencies';

const userRouter = express.Router();

userRouter.post('/register', (req, res) => registerUserController.run(req, res));
userRouter.get('/password/:email', authMiddleware, (req, res) => getPasswordController.run(req, res));
userRouter.patch('/password', authMiddleware, (req, res) => changePasswordController.run(req, res));
userRouter.get('/', authMiddleware, (req, res) => getAllUsersController.run(req, res));

export { userRouter };