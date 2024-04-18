import express from "express";

import { loginController } from "../dependencies";

const authRouter = express.Router();

authRouter.post("/login", async (req, res) => {
    await loginController.run(req, res);
});

export { authRouter };