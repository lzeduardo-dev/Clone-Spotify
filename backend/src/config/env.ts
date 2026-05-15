import dotenv from 'dotenv'
dotenv.config()

const required = (key: string): string => {
  const value = process.env[key]
  if (!value) throw new Error(`Variável de ambiente obrigatória não definida: ${key}`)
  return value
}

export const env = {
  port: Number(process.env.PORT) || 4000,
  nodeEnv: process.env.NODE_ENV || 'development',
  mongodbUri: required('MONGODB_URI'),
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5178',
}
