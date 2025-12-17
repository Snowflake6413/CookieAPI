import "dotenv/config"
import { defineConfig } from "drizzle-kit"
// Hardcode Ts so railway wont be pissy at us
export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema.ts",
  dialect: "sqlite",
  dbCredentials: {
    url: "file:/app/cooleyDB/my.db",
  },
})
