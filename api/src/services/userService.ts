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
            .input("Username", sql.VarChar(50), user.Username)
            .input("Email", sql.VarChar(100), user.Email)
            .input("Description", sql.VarChar(300), user.Description)
            .execute<{ id: number }>("createUser");
        return response.recordset[0].id;
    }
}

export default new UserService();
