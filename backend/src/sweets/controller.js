import { z } from "zod";
import Sweet from "../models/Sweet.js";

const createUpdateSchema = z.object({
  name: z.string().min(1),
  priceCents: z.number().int().nonnegative(),
  quantity: z.number().int().nonnegative(),
  imageUrl: z.string().url().or(z.string().length(0)).optional(),
  tag: z.string().optional(),
  subtitle: z.string().optional()
});

const purchaseSchema = z.object({
  qty: z.number().int().min(1)
});

export async function list(req, res, next) {
  try {
    const q = (req.query.search || "").toString().trim();
    const filter = q ? { name: { $regex: q, $options: "i" } } : {};
    const items = await Sweet.find(filter).sort({ createdAt: -1 }).lean();
    res.json({ items });
  } catch (e) { next(e); }
}

export async function create(req, res, next) {
  try {
    const body = createUpdateSchema.parse(req.body || {});
    const doc = await Sweet.create(body);
    res.status(201).json({ item: doc });
  } catch (e) {
    if (e?.code === 11000) return res.status(409).json({ error: "Sweet name already exists" });
    if (e instanceof z.ZodError) return res.status(400).json({ error: "Invalid input" });
    next(e);
  }
}

export async function update(req, res, next) {
  try {
    const body = createUpdateSchema.partial().parse(req.body || {});
    const updated = await Sweet.findByIdAndUpdate(req.params.id, body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ error: "Not found" });
    res.json({ item: updated });
  } catch (e) {
    if (e?.code === 11000) return res.status(409).json({ error: "Sweet name already exists" });
    if (e instanceof z.ZodError) return res.status(400).json({ error: "Invalid input" });
    next(e);
  }
}

export async function removeOne(req, res, next) {
  try {
    const deleted = await Sweet.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Not found" });
    res.status(204).end();
  } catch (e) { next(e); }
}

export async function purchase(req, res, next) {
  try {
    const { qty } = purchaseSchema.parse(req.body || {});
    const updated = await Sweet.findOneAndUpdate(
      { _id: req.params.id, quantity: { $gte: qty } },
      { $inc: { quantity: -qty } },
      { new: true }
    );
    if (!updated) return res.status(400).json({ error: "Insufficient stock" });
    res.json({ item: updated });
  } catch (e) {
    if (e instanceof z.ZodError) return res.status(400).json({ error: "Invalid input" });
    next(e);
  }
}
