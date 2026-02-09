import { Hono } from 'hono'
import { db } from './db'
import { users } from './schema'
import { userSchema } from './userSchema'
import { eq } from 'drizzle-orm'

export const userRoutes = new Hono()

// Create user
userRoutes.post('/users', async (c) => {
  const body = await c.req.json()
  const parsed = userSchema.safeParse(body)

  if (!parsed.success) {
    return c.json({ errors: parsed.error.format() }, 400)
  }

  const [user] = await db
    .insert(users)
    .values(parsed.data)
    .returning()

  return c.json(user, 201)
})

// Get all users
userRoutes.get('/users', async (c) => {
  const data = await db.select().from(users)
  return c.json(data)
})

// Delete user
userRoutes.delete('/users/:id', async (c) => {
  const id = Number(c.req.param('id'))

  await db.delete(users).where(eq(users.id, id))
  return c.json({ success: true })
})
