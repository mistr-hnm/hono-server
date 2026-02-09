import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import { userRoutes } from './routes'

const app = new Hono()

app.route('/api', userRoutes)

serve({
  fetch: app.fetch,
  port: 3000,
})

console.log('🚀 Server running on http://localhost:3000')
