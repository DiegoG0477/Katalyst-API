import { Request, Response } from "express";
import { LoginUseCase } from "../../application/use-cases/LoginUseCase";

export class LoginController {
    constructor(private loginUseCase: LoginUseCase) {}

    async run(req: Request, res: Response): Promise<Response> {
        const { email, password } = req.body;

        try {
            const token = await this.loginUseCase.run(email, password);

            if(token){
                return res.status(200).json({
                    status: "success",
                    message: "User logged in successfully",
                    token
                });
            }else{
                return res.status(400).json({
                    status: "error",
                    message: "invalid credentials",
                });
            }
        } catch (error) {
            return res.status(400).json({
                status: "error",
                message: "invalid credentials",
                error: error,
            });
        }
    }
}
