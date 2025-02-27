import express from 'express';
import Ticketservice from '../Service/Ticketservice.js';
const Ticketcontroller=express.Router();
Ticketcontroller.post('/post1',Ticketservice.post);
Ticketcontroller.get('/get1',Ticketservice.get);
Ticketcontroller.delete('/delete',Ticketservice.del);
Ticketcontroller.delete('/delete1',Ticketservice.del1);
Ticketcontroller.get('/can',Ticketservice.get1);
export default Ticketcontroller
