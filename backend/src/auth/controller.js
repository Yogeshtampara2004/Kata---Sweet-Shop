import { z } from "zod";
import { register as registerSvc, login as loginSvc } from "./service.js";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

export async function register(req, res, next) {
  try {
    const data = schema.parse(req.body || {});
    const result = await registerSvc(data);
    res.status(201).json(result);
  } catch (e) {
    if (e.status) return res.status(e.status).json({ error: e.message });
    if (e instanceof z.ZodError) return res.status(400).json({ error: "Invalid input" });
    next(e);
  }
}

export async function login(req, res, next) {
  try {
    const data = schema.parse(req.body || {});
    const result = await loginSvc(data);
    res.json(result);
  } catch (e) {
    if (e.status) return res.status(e.status).json({ error: e.message });
    if (e instanceof z.ZodError) return res.status(400).json({ error: "Invalid input" });
    next(e);
  }
}
