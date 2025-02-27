import express from 'express';
import Userservice from '../Service/Userservice.js';
const usercontroller=express.Router();
usercontroller.post('/login',Userservice.login);
usercontroller.post('/signup',Userservice.signup);
usercontroller.get('/show',Userservice.show);
usercontroller.post('/edit',Userservice.edit);
export default usercontroller