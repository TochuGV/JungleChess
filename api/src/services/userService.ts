import User from "../models/userModel";
import sql from "mssql";
import databaseConfig from "../utils/databaseConfig";

class UserService {
    async getAll(): Promise<User[]> {
        const pool = await sql.connect(databaseConfig);
        const response = await pool.request().query("getAllUsers");
        return response.recordset;
    }
}

export default new UserService();
