import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { AppError } from "../../domain/errors/AppError";
import { UserResponseDTO } from "../dtos/UserDTO";
export class GetUserByIdUseCase {
    constructor(private readonly userRepository: IUserRepository) { }
    async execute(id: number): Promise<UserResponseDTO> {
        const user = await this.userRepository.findById(id);
        // Throw 404 if user does not exist
        if (!user) {
            throw new AppError("User not found", 404);
        }
        // Return response without password
        const { password, ...userResponse } = user;
        return userResponse;
    }
}