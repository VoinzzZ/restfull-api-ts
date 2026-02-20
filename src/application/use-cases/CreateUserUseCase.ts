import bcrypt from "bcryptjs";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { AppError } from "../../domain/errors/AppError";
import { CreateUserDTO, UserResponseDTO } from "../dtos/UserDTO";

export class CreateUserUseCase {
    constructor(private readonly userRepository: IUserRepository) { }
    async execute(data: CreateUserDTO): Promise<UserResponseDTO> {
        // Check if email already exists
        const existingUser = await this.userRepository.findByEmail(data.email);
        if (existingUser) {
            throw new AppError("Email already in use", 409);
        }
        // Hash the password before storing
        const hashedPassword = await bcrypt.hash(data.password, 10);
        // Create the user
        const user = await this.userRepository.create({
            name: data.name,
            email: data.email,
            password: hashedPassword,
        });
        // Return response without password
        const { password, ...userResponse } = user;
        return userResponse;
    }
}