import express from 'express'
import cors from 'cors'
import { env } from './config/env'
import { connectDatabase } from './config/database'
import artistRoutes from './routes/artists'
import songRoutes from './routes/songs'


const app = express()

// Middlewares globais
app.use(cors({ origin: env.clientUrl, credentials: true }))
app.use(express.json())

//Rotas
app.use('/api/artists', artistRoutes)
app.use('/api/songs', songRoutes)

// Inicializar servidor
async function bootstrap() {
  await connectDatabase()
  app.listen(env.port, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${env.port}`)
  })
}

bootstrap()

export { app }
