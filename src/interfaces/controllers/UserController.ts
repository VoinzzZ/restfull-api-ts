import { Request, Response, NextFunction } from "express";
import { CreateUserUseCase } from "../../application/use-cases/CreateUserUseCase";
import { GetAllUsersUseCase } from "../../application/use-cases/GetAllUsersUseCase";
import { GetUserByIdUseCase } from "../../application/use-cases/GetUserByIdUseCase";
import { UpdateUserUseCase } from "../../application/use-cases/UpdateUserUseCase";
import { DeleteUserUseCase } from "../../application/use-cases/DeleteUserUseCase";

export class UserController {
    constructor(
        private readonly createUserUseCase: CreateUserUseCase,
        private readonly getAllUsersUseCase: GetAllUsersUseCase,
        private readonly getUserByIdUseCase: GetUserByIdUseCase,
        private readonly updateUserUseCase: UpdateUserUseCase,
        private readonly deleteUserUseCase: DeleteUserUseCase
    ) { }

    create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const user = await this.createUserUseCase.execute(req.body);
            res.status(201).json({ status: "success", data: user });
        } catch (error) {
            next(error);
        }
    };

    getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const users = await this.getAllUsersUseCase.execute();
            res.status(200).json({ status: "success", data: users });
        } catch (error) {
            next(error);
        }
    };

    getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const user = await this.getUserByIdUseCase.execute(Number(req.params.id));
            res.status(200).json({ status: "success", data: user });
        } catch (error) {
            next(error);
        }
    };

    update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const user = await this.updateUserUseCase.execute(Number(req.params.id), req.body);
            res.status(200).json({ status: "success", data: user });
        } catch (error) {
            next(error);
        }
    };

    delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await this.deleteUserUseCase.execute(Number(req.params.id));
            res.status(200).json({ status: "success", message: "User deleted successfully" });
        } catch (error) {
            next(error);
        }
    };
}