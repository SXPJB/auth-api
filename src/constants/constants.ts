import dotenv from 'dotenv';
dotenv.config();
export const PORT = process.env.PORT
export const DB_HOST = process.env.BD_HOST
export const DB_PORT:number = parseInt(<string>process.env.DB_PORT, 10)
export const DB_USER = process.env.DB_USER
export const DB_PASSWORD = process.env.DB_PASSWORD
export const DB_NAME = process.env.DB_NAME
export const EMAIL = process.env.SMTP_TO_EMAIL
export const EMAIL_PASSWORD = process.env.SMTP_PASSWORD
export const TOKEN_SECRET = process.env.TOKEN_SECRET || 'default_secret'