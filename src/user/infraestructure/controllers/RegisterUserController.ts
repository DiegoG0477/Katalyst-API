import { Request, Response } from 'express';
import { RegisterUserUseCase } from '../../application/use-cases/RegisterUserUseCase';

export class RegisterUserController {
    constructor(readonly registerUserUseCase: RegisterUserUseCase) {}

    async run(req: Request, res: Response) {
        const data = req.body;
        try {
            const user = await this.registerUserUseCase.run(
                data.name,
                data.lastname,
                data.email,
                data.password,
                data.age,
                data.activity,
                data.frequency
            );

            console.log('datos de registro:', req.body);

            if (user) {
                res.status(201).send({
                    status: 'success',
                    message: 'User registered successfully',
                    data: {
                        user,
                    },
                });
            } else {
                res.status(400).send({
                    status: 'error',
                    message: 'User not registered',
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