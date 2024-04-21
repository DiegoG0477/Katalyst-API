import { Request, Response } from "express";
import { GetUserById } from "../../application/use-cases/GetUserById";

interface CustomRequest extends Request {
    user: any;
}

export class GetProfileUserController {
    constructor(readonly getUserById: GetUserById) {}

    async run(req: Request, res: Response) {
        const userReq = (req as CustomRequest).user;
        const id = userReq.id;
        try {
            console.log('userReq:', userReq);
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