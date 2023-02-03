import User from "../models/userModel";
import sql from "mssql";
import databaseConfig from "../utils/databaseConfig";

class UserService {
    async getAll(): Promise<User[]> {
        const pool = await sql.connect(databaseConfig);
        const response = await pool.request().query<User[]>("getAllUsers");
        return response.recordset;
    }

    async create(user: User): Promise<number> {
        const pool = await sql.connect(databaseConfig);
        const response = await pool.request()
            .input("username", sql.VarChar(50), user.username)
            .input("email", sql.VarChar(100), user.email)
            .input("description", sql.VarChar(300), user.description)
            .execute<{ id: number }>("createUser");
        return response.recordset[0].id;
    }
}

export default new UserService();
