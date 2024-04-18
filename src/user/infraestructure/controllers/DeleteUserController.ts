import { Request, Response } from "express";
import { DeleteUserUseCase } from "../../application/use-cases/DeleteUserUseCase";

export class DeleteUserUseController{
    constructor(readonly deleteUserUseCase: DeleteUserUseCase){}

    async run(req: Request, res: Response){
        try{
            const id = req.params.id;
            const deleted = await this.deleteUserUseCase.run(id);

            if(deleted){
                res.status(204).send({
                    status: 'success',
                    message: 'User deleted successfully'
                });
            } else {
                res.status(404).send({
                        status: 'error',
                        message: 'User not found'
                    });
            }
        } catch(error){
            res.status(500).send({
                    status: 'error',
                    message: 'Internal server error',
                    error: error
                });
        }
    }
}