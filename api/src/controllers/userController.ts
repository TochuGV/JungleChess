import { Router } from "express";
import userService from "../services/userService";

const router = Router();

router.get("/", async (req, res) => {
    const users = await userService.getAll();

    res.status(200).json(users);
});

router.post("/", async (req, res) => {
    const id = await userService.create(req.body);

    res.status(201).json({ id });
});

export default router;
