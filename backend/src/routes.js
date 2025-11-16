import { Router } from "express";
import authRoutes from "./auth/routes.js";
import sweetsRoutes from "./sweets/routes.js";

const router = Router();

router.get("/", (_req, res) => res.json({ message: "Sweet Shop API" }));

router.use("/auth", authRoutes);
router.use("/sweets", sweetsRoutes);   // <-- THIS mounts /api/sweets

export default router;
