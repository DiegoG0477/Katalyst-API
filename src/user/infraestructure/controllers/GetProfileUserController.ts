import { Request, Response } from "express";
import { GetUserById } from "../../application/use-cases/GetUserById";

interface CustomRequest extends Request {
    userId: string;
}

export class GetProfileUserController {
    constructor(readonly getUserById: GetUserById) {}

    async run(req: Request, res: Response) {
        const id = (req as CustomRequest).userId;
        try {
            const user = await this.getUserById.run(id);
            if (user) {
                res.status(200).send({
                    status: 'success',
                    message: 'User retrieved successfully',
                    data: {
                        user,
                    },
                });
            } else {
                res.status(400).send({
                    status: 'error',
                    message: 'User not retrieved',
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