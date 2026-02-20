import { User } from "../entities/User";
export interface CreateUserData {
    name: string;
    email: string;
    password: string;
}
export interface UpdateUserData {
    name?: string;
    email?: string;
    password?: string;
}
export interface IUserRepository {
    create(data: CreateUserData): Promise<User>;
    findAll(): Promise<User[]>;
    findById(id: number): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    update(id: number, data: UpdateUserData): Promise<User>;
    delete(id: number): Promise<void>;
}