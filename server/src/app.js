import express from "express"
import cors from 'cors'
import cookieParser from "cookie-parser"
// import { getAllProducts } from "./controllers/product.controller.js"
// import { createProduct } from "./controllers/product.controller.js"
import productroutes from "./routes/product.routes.js"
const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN
}))
app.use(express.json({
    limit:'16kb'
}))
app.use(express.urlencoded({
    extended:true,
    limit:'16kb'
}))
app.use(express.static("public"))
app.use(cookieParser())

//product routes

app.use("/api/", productroutes)
export default app