export interface CreateUserDTO {
    name: string;
    email: string;
    password: string;
}

export interface UpdateUserDTO {
    name?: string;
    email?: string;
    password?: string;
}

export interface UserResponseDTO {
    id: number;
    name: string;
    email: string;
    created_at: Date;
    updated_at: Date;
}