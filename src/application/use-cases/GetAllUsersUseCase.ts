import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { UserResponseDTO } from "../dtos/UserDTO";

export class GetAllUsersUseCase {
    constructor(private readonly userRepository: IUserRepository) { }
    async execute(): Promise<UserResponseDTO[]> {
        const users = await this.userRepository.findAll();
        // Remove password from each user before returning
        return users.map(({ password, ...user }) => user);
    }
}