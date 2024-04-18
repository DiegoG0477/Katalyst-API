import { ChangePasswordUseCase } from "../application/use-cases/ChangePasswordUseCase";
import { GetAllUsersUseCase } from "../application/use-cases/GetAllUSersUseCase";
import { GetPasswordUseCase } from "../application/use-cases/GetPasswordUseCase";
import { RegisterUserUseCase } from "../application/use-cases/RegisterUserUseCase";
import { LoginUseCase } from "../application/use-cases/LoginUseCase";

import { ChangePasswordController } from "./controllers/ChangePasswordController";
import { GetAllUsersController } from "./controllers/GetAllUsersController";
import { GetPasswordController } from "./controllers/GetPasswordController";
import { RegisterUserController } from "./controllers/RegisterUserController";
import { LoginController } from "./controllers/LoginController";

import { EncryptPasswordService } from "./services/EncryptPasswordService";

import { MongodbUserRepository } from "./adapters/mongodb/MongodbUserRepository";
import { BcryptService } from "../../security/bcrypt";
import { TokenService } from "./services/TokenService";

export const mongodbRepository = new MongodbUserRepository();

const bcryptService = new BcryptService();

const tokenService = new TokenService();

export const encryptPasswordService = new EncryptPasswordService(bcryptService);

export const loginUseCase = new LoginUseCase(mongodbRepository, tokenService, bcryptService);

export const registerUserUseCase = new RegisterUserUseCase(mongodbRepository, encryptPasswordService);

export const getPasswordUseCase = new GetPasswordUseCase(mongodbRepository);

export const changePasswordUseCase = new ChangePasswordUseCase(mongodbRepository, encryptPasswordService);

export const getAllUsersUseCase = new GetAllUsersUseCase(mongodbRepository);

export const registerUserController = new RegisterUserController(registerUserUseCase);

export const getPasswordController = new GetPasswordController(getPasswordUseCase);

export const changePasswordController = new ChangePasswordController(changePasswordUseCase);

export const getAllUsersController = new GetAllUsersController(getAllUsersUseCase);

export const loginController = new LoginController(loginUseCase);