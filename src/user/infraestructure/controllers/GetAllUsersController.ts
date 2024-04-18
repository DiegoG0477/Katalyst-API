import { Request, Response } from 'express';
import { GetAllUsersUseCase } from '../../application/use-cases/GetAllUSersUseCase';

export class GetAllUsersController {
    constructor(readonly getAllUsersUseCase: GetAllUsersUseCase) {}

    async run(req: Request, res: Response) {
        try {
            const users = await this.getAllUsersUseCase.run();
            if (users) {
                res.status(200).send({
                    status: 'success',
                    message: 'Users retrieved successfully',
                    data: {
                        users,
                    },
                });
            } else {
                res.status(400).send({
                    status: 'error',
                    message: 'Users not retrieved',
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