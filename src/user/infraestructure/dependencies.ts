import { ChangePasswordUseCase } from "../application/use-cases/ChangePasswordUseCase";
import { GetAllUsersUseCase } from "../application/use-cases/GetAllUSersUseCase";
import { GetPasswordUseCase } from "../application/use-cases/GetPasswordUseCase";
import { RegisterUserUseCase } from "../application/use-cases/RegisterUserUseCase";
import { LoginUseCase } from "../application/use-cases/LoginUseCase";
import { GetUserById } from "../application/use-cases/GetUserById";
import { DeleteUserUseCase } from "../application/use-cases/DeleteUserUseCase";
import { UpdateUserUseCase } from "../application/use-cases/UpdateUserUseCase";

import { ChangePasswordController } from "./controllers/ChangePasswordController";
import { GetAllUsersController } from "./controllers/GetAllUsersController";
import { GetPasswordController } from "./controllers/GetPasswordController";
import { RegisterUserController } from "./controllers/RegisterUserController";
import { LoginController } from "./controllers/LoginController";
import { GetProfileUserController } from "./controllers/GetProfileUserController";
import { DeleteUserUseController } from "./controllers/DeleteUserController";
import { UpdateUserController } from "./controllers/UpdateUserController";

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

export const getUserByIdUseCase = new GetUserById(mongodbRepository);

export const deleteUserUseCase = new DeleteUserUseCase(mongodbRepository);

export const updateUserUseCase = new UpdateUserUseCase(mongodbRepository, encryptPasswordService);

export const getProfileUserController = new GetProfileUserController(getUserByIdUseCase);

export const deleteUseController = new DeleteUserUseController(deleteUserUseCase);

export const updateUserController = new UpdateUserController(updateUserUseCase);

export const registerUserController = new RegisterUserController(registerUserUseCase);

export const getPasswordController = new GetPasswordController(getPasswordUseCase);

export const changePasswordController = new ChangePasswordController(changePasswordUseCase);

export const getAllUsersController = new GetAllUsersController(getAllUsersUseCase);

export const loginController = new LoginController(loginUseCase);