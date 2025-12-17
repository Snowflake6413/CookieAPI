import "dotenv/config"
import { drizzle } from "drizzle-orm/bun-sqlite"
// Hardcode so railway wont be mad
export const db = drizzle("/app/cooleyDB/my.db")
