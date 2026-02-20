import { Router } from "express";
import { MysqlUserRepository } from "../../infrastructure/repositories/MysqlUserRepository";
import { CreateUserUseCase } from "../../application/use-cases/CreateUserUseCase";
import { GetAllUsersUseCase } from "../../application/use-cases/GetAllUsersUseCase";
import { GetUserByIdUseCase } from "../../application/use-cases/GetUserByIdUseCase";
import { UpdateUserUseCase } from "../../application/use-cases/UpdateUserUseCase";
import { DeleteUserUseCase } from "../../application/use-cases/DeleteUserUseCase";
import { UserController } from "../controllers/UserController";
import { validate } from "../middlewares/validate";
import { z } from "zod";

// --- Validation Schemas ---
const createUserSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

const updateUserSchema = z.object({
    name: z.string().min(1).optional(),
    email: z.string().email().optional(),
    password: z.string().min(6).optional(),
});

// --- Dependency Injection (Composition Root) ---
const userRepository = new MysqlUserRepository();
const createUserUseCase = new CreateUserUseCase(userRepository);
const getAllUsersUseCase = new GetAllUsersUseCase(userRepository);
const getUserByIdUseCase = new GetUserByIdUseCase(userRepository);
const updateUserUseCase = new UpdateUserUseCase(userRepository);
const deleteUserUseCase = new DeleteUserUseCase(userRepository);
const userController = new UserController(
    createUserUseCase,
    getAllUsersUseCase,
    getUserByIdUseCase,
    updateUserUseCase,
    deleteUserUseCase
);

// --- Routes ---
const router = Router();

router.post("/", validate(createUserSchema), userController.create);
router.get("/", userController.getAll);
router.get("/:id", userController.getById);
router.put("/:id", validate(updateUserSchema), userController.update);
router.delete("/:id", userController.delete);

export default router;