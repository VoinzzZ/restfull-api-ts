import pool from "../database/connection";
import { IUserRepository, CreateUserData, UpdateUserData } from "../../domain/repositories/IUserRepository";
import { User } from "../../domain/entities/User";
import { RowDataPacket, ResultSetHeader } from "mysql2";


export class MysqlUserRepository implements IUserRepository {
    async create(data: CreateUserData): Promise<User> {
        const [result] = await pool.execute<ResultSetHeader>(
            "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
            [data.name, data.email, data.password]
        );

        const user = await this.findById(result.insertId);
        return user!;
    }

    async findAll(): Promise<User[]> {
        const [rows] = await pool.execute<RowDataPacket[]>(
            "SELECT * FROM users ORDER BY created_at DESC"
        );

        return rows as User[];
    }

    async findById(id: number): Promise<User | null> {
        const [rows] = await pool.execute<RowDataPacket[]>(
            "SELECT * FROM users WHERE id = ?",
            [id]
        );

        return rows.length > 0 ? (rows[0] as User) : null;
    }

    async findByEmail(email: string): Promise<User | null> {
        const [rows] = await pool.execute<RowDataPacket[]>(
            "SELECT * FROM users WHERE email = ?",
            [email]
        );

        return rows.length > 0 ? (rows[0] as User) : null;
    }

    async update(id: number, data: UpdateUserData): Promise<User> {
        // Build dynamic query based on provided fields
        const fields: string[] = [];
        const values: (string | number)[] = [];

        if (data.name) { fields.push("name = ?"); values.push(data.name); }
        if (data.email) { fields.push("email = ?"); values.push(data.email); }
        if (data.password) { fields.push("password = ?"); values.push(data.password); }

        values.push(id);
        await pool.execute<ResultSetHeader>(
            `UPDATE users SET ${fields.join(", ")} WHERE id = ?`,
            values
        );

        const user = await this.findById(id);
        return user!;
    }

    async delete(id: number): Promise<void> {
        await pool.execute<ResultSetHeader>(
            "DELETE FROM users WHERE id = ?",
            [id]
        );
    }
}