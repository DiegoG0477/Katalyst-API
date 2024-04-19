import express from 'express';
import { authMiddleware } from '../../../middlewares/authMiddleware';

import {
    registerUserController,
    getPasswordController,
    changePasswordController,
    getAllUsersController,
    getProfileUserController,
    deleteUseController,
    updateUserController
} from '../dependencies';

const userRouter = express.Router();

userRouter.post('/register', (req, res) => registerUserController.run(req, res));
userRouter.get('/password/:email', authMiddleware, (req, res) => getPasswordController.run(req, res));
userRouter.patch('/password', authMiddleware, (req, res) => changePasswordController.run(req, res));
userRouter.get('/', authMiddleware, (req, res) => getAllUsersController.run(req, res));
userRouter.put('/profile', authMiddleware, (req, res) => updateUserController.run(req, res));
userRouter.delete('/management/:id', authMiddleware,  (req, res) => deleteUseController.run(req, res));
userRouter.get('/profile', authMiddleware, (req, res) => getProfileUserController.run(req, res));

export { userRouter };