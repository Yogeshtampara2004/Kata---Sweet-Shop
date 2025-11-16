import { Router } from "express";
import { list, create, update, removeOne, purchase } from "./controller.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

// Public list/search
router.get("/", list);

// Admin-only CRUD
router.post("/", requireAuth("ADMIN"), create);
router.put("/:id", requireAuth("ADMIN"), update);
router.delete("/:id", requireAuth("ADMIN"), removeOne);

// Authenticated purchase (any logged-in user)
router.post("/:id/purchase", requireAuth(), purchase);

export default router;
