import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core"

export const cookies = sqliteTable("cookies", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  flavor: text("flavor").notNull(),
  isEaten: integer("is_eaten").notNull().default(0),
  bakenAt: integer("baken_at").notNull(),
})

