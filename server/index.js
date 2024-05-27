import express  from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import fileUpload from 'express-fileupload';

import authRoute from './routes/auth.js'
import findsRoute from './routes/finds.js'

const app = express()
dotenv.config()

//Підключення до БД
const PORT = process.env.PORT || 3001
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_NAME = process.env.DB_NAME

//Підключення
app.use(cors())
app.use(fileUpload())
app.use(express.json())
app.use(express.static('uploads'))

// Routes
app.use('/api/auth', authRoute)
app.use('/api/finds', findsRoute)

async function start() {
 try{
     await mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@atlascluster.zb0qnko.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,)

     app.listen(PORT, () => console.log(`Server started on port: ${PORT}`))

 } catch(error){
    console.log(error)
 }
}
start()


