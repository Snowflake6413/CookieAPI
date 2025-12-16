import { db } from "./index"
import { cookies } from "./schema"
import { eq, desc } from "drizzle-orm"

// 1. list the cookies
export function listCookies() {
  return db.select().from(cookies).orderBy(desc(cookies.id)).all()
}
// 2. bake one
export function bakeCookie(item: string) {
  const bakenAt = Math.floor(Date.now() / 1000)

  const res = db.insert(cookies).values({
    flavor: item,
    bakenAt,
  }).run()

  return { id: Number(res.lastInsertRowid) }
}

// 3. eat the cookie
export function eatCookie(id: number) {
  const res = db.update(cookies)
    .set({ isEaten: 1 })
    .where(eq(cookies.id, id))
    .run()

  return { changes: res.changes }
}
// 4. no cookie :( (deleted)
export function deleteCookie(id: number) {
  const res = db.delete(cookies).where(eq(cookies.id, id)).run()
  return { changes: res.changes }
}