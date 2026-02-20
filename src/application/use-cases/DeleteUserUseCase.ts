import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { AppError } from "../../domain/errors/AppError";

export class DeleteUserUseCase {
    constructor(private readonly userRepository: IUserRepository) { }
    async execute(id: number): Promise<void> {
        // Check if user exists before deleting
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new AppError("User not found", 404);
        }
        await this.userRepository.delete(id);
    }
}