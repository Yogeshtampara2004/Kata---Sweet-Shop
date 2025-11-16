import { z } from "zod";

const EnvSchema = z.object({
  MONGODB_URI: z.string().min(1),
  JWT_SECRET: z.string().min(1),
  PORT: z.string().optional()
});

export function getEnv() {
  const parsed = EnvSchema.safeParse(process.env);
  if (!parsed.success) throw new Error("Invalid environment variables");
  return parsed.data;
}
