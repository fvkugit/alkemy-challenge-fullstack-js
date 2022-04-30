import express from "express";
import appRoutes from './routes/routes.js'
import cors from 'cors';
import db from "./database/db.js";

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/', appRoutes)

try{
    await db.authenticate()
    console.log("Database connected.")
}catch(error){
    console.log(`Database conection error! ${error}`)
}

app.get('/', (req, res)=>{
    res.send('Server working fine!')
})

app.listen(8000, ()=>{
    console.log('Server running in http://localhost:8000/')
})