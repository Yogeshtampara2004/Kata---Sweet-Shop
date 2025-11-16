import "dotenv/config";
import app from "./app.js";
import { connectDB } from "./db/connect.js";
import { getEnv } from "./config/env.js";

const { MONGODB_URI, PORT } = getEnv();

await connectDB(MONGODB_URI);

const port = Number(PORT || 4000);
app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});
