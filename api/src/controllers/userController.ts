import { Router } from "express";
import userService from "../services/userService";

const router = Router();

router.get("/", async (req, res) => {
    const users = await userService.getAll();

    res.status(200).json(users);
});

export default router;
