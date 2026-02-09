import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import { userRoutes } from './routes'
import { cors } from 'hono/cors'

const app = new Hono()

app.use('*', cors())

app.route('/api', userRoutes)

serve({
  fetch: app.fetch,
  port: 3000,
})

console.log('🚀 Server running on http://localhost:3000')
