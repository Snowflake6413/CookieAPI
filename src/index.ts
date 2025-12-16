import { Hono } from "hono"
import { bakeCookie, deleteCookie, eatCookie, listCookies } from "./db/queries"

const app = new Hono()

app.get("/", (c) => c.text("simple baking API for some cookies! santa and the elves would like some cookies! :D"))


// 1. cookie count
app.get("/api/cookies", (c) => c.json(listCookies()))

// 2. bake cookie
app.post("/api/cookies", async (c) => {
  const body = await c.req.json().catch(() => null)
  const flavor = (body?.flavor ?? "").toString().trim()
  if (!flavor) return c.json({ error: "flavor is required" }, 400)

  return c.json(bakeCookie(flavor), 201)
})

// 3. eat it
app.patch("/api/cookies/:id/eat", (c) => {
  const id = Number(c.req.param("id"))
  if (!Number.isFinite(id)) return c.json({ error: "bad id" }, 400)

  const res = eatCookie(id)
  if (res.changes === 0) return c.json({ error: "not found" }, 404)

  return c.json({ ok: true })
})
// 4. DELETE it.

app.delete("/api/cookies/:id", (c) => {
  const id = Number(c.req.param("id"))
  if (!Number.isFinite(id)) return c.json({ error: "bad id" }, 400)

  const res = deleteCookie(id)
  if (res.changes === 0) return c.json({ error: "not found" }, 404)

  return c.json({ ok: true })
})



const port = Number(process.env.PORT) || 3000

export default {
  port,
  fetch: app.fetch,
}
