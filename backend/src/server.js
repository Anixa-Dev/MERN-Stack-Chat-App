import express from 'express'
import dotenv from 'dotenv'
import apiRoutes from './routes/auth.route.js'
import userRoutes from './routes/user.route.js'
import chatRoutes from './routes/chat.route.js'
import { connectDB } from './lib/db.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import path from "path";

dotenv.config()

const app = express()
const PORT = process.env.PORT

const __dirname = path.resolve();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', apiRoutes)
app.use('/api/users', userRoutes)
app.use('/api/chat', chatRoutes)

app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
});

app.listen(5001, () => {
  console.log('Server is on port: ', PORT)
  connectDB()
})