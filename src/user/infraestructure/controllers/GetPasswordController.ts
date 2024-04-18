import { Request, Response } from 'express';
import { GetPasswordUseCase } from '../../application/use-cases/GetPasswordUseCase';

export class GetPasswordController {
    constructor(readonly getPasswordUseCase: GetPasswordUseCase) {}

    async run(req: Request, res: Response) {
        const email = req.params.email;
        try {
            const password = await this.getPasswordUseCase.run(
                email
            );

            if (password) {
                res.status(200).send({
                    status: 'success',
                    message: 'Password retrieved successfully',
                    data: {
                        password,
                    },
                });
            } else {
                res.status(400).send({
                    status: 'error',
                    message: 'Password not retrieved',
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