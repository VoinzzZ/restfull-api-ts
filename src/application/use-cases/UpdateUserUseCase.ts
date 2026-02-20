import bcrypt from "bcryptjs";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { AppError } from "../../domain/errors/AppError";
import { UpdateUserDTO, UserResponseDTO } from "../dtos/UserDTO";

export class UpdateUserUseCase {
    constructor(private readonly userRepository: IUserRepository) { }
    async execute(id: number, data: UpdateUserDTO): Promise<UserResponseDTO> {
        // Check if user exists
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new AppError("User not found", 404);
        }
        // If email is being updated, check it's not taken by another user
        if (data.email && data.email !== user.email) {
            const emailTaken = await this.userRepository.findByEmail(data.email);
            if (emailTaken) {
                throw new AppError("Email already in use", 409);
            }
        }
        // If password is being updated, hash the new password
        if (data.password) {
            data.password = await bcrypt.hash(data.password, 10);
        }
        // Update and return response without password
        const updatedUser = await this.userRepository.update(id, data);
        const { password, ...userResponse } = updatedUser;
        return userResponse;
    }
}