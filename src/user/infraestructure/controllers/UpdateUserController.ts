import { Request, Response } from 'express';
import { UpdateUserUseCase } from '../../application/use-cases/UpdateUserUseCase';

interface CustomRequest extends Request {
    user: any;
}

export class UpdateUserController {
    constructor(readonly updateUserUseCase: UpdateUserUseCase) {}

    async run(req: Request, res: Response) {
        const userReq = (req as CustomRequest).user;
        const data = req.body;
        const id = userReq.id;
        
        try {
            const user = await this.updateUserUseCase.run(
                id,
                data.name,
                data.oldPassword,
                data.newPassword,
                data.height,
                data.weight
            );

            console.log('datos de actualización:', req.body);

            if (user) {
                res.status(200).send({
                    status: 'success',
                    message: 'User updated successfully',
                    data: {
                        user,
                    },
                });
            } else {
                res.status(400).send({
                    status: 'error',
                    message: 'User not updated',
                });
            }
        } catch (error) {
            res.status(400).send({
                status: 'error',
                message: 'An error occurred',
                error: error,
            });
        }
    }
}