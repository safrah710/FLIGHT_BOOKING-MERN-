import express from 'express'
import cors  from 'cors'
import 'dotenv/config.js'
import controller from './Controller/index.js';
const app=express();
app.use(express.json());
app.use(cors());
app.use(controller);
const port=10000;
app.listen(port,()=>{
    console.log(`server is running at ${port}`)
})
