import User from "@/interfaces/user";
import axiosClient from "./axiosClient";

export const getAllUsers = async (): Promise<User[]> => {
    const response = await axiosClient.get("/user");
    return response.data;
}
