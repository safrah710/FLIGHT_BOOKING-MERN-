import express from 'express'
import usercontroller from './Usercontroller.js';
import Flightcontroller from './Flightcontroller.js';
import Ticketcontroller from './Ticketcontroller.js';
const controller=express.Router();
controller.use('/user',usercontroller);
controller.use('/flight',Flightcontroller);
controller.use('/ticket',Ticketcontroller);
export default controller