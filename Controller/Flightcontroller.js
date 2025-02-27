import express from 'express';
import Flightservice from '../Service/Flightservice.js';
const Flightcontroller=express.Router();
Flightcontroller.post('/store',Flightservice.store);
Flightcontroller.get('/show',Flightservice.show);
Flightcontroller.get('/show1',Flightservice.show1);
export default Flightcontroller