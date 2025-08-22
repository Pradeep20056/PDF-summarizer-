import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import { connectDB } from "./config/db.js"

import authRoutes from "./routes/auth.js"
import chatRoutes from "./routes/chat.js"

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())

connectDB()

app.use("/api/auth", authRoutes)
app.use("/api/chat", chatRoutes)


const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`))
