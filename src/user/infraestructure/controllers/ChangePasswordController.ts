import { Request, Response } from 'express';
import { ChangePasswordUseCase } from '../../application/use-cases/ChangePasswordUseCase';

export class ChangePasswordController {
    constructor(
        readonly changePasswordUseCase: ChangePasswordUseCase,
    ) {}

    async run(req: Request, res: Response) {
        const data = req.body;
        try {
            const result = await this.changePasswordUseCase.run(
                data.email,
                data.oldPassword,
                data.newPassword
            );

            if (result) {
                res.status(200).send({
                    status: 'success',
                    message: 'Password changed successfully',
                });
            } else {
                res.status(400).send({
                    status: 'error',
                    message: 'Password not changed',
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