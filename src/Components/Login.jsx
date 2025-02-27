import React from 'react';
import { use } from 'react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Login() {
    let [email,setemail]=useState("");
    let[password,setpassword]=useState("");
    let navigate=useNavigate();
    const handle_submit=async()=>{
        
        try{
            let res=await axios.post('https://flight-booking-mern.onrender.com/user/login',{email,password})
            if(res.status==200){
                toast.success("Logged in successfull");
                sessionStorage.setItem('Token',res.data.token);
                sessionStorage.setItem('id',res.data.id);
                sessionStorage.setItem('Name',res.data.Name);
                sessionStorage.setItem('email',res.data.email);
                sessionStorage.setItem('mobile',res.data.mobile);
                setemail("");
                setpassword("");
                navigate('/Dashboard');
            }
            else if(res.status==400){
                toast.error("Invalid password")
            }
        }
        catch(err){
            toast.error("Login  failed");
        }
    }
  return (
    <>
      <div className="mid">
        <marquee direction="right" width="90%">
          <h1 style={{ fontSize: "30px" }}>WELCOME TO SAFRAH FLY HIGH</h1>
        </marquee>
      </div>
      <div className="login">
        <div className="top">
          <h1 className="para1">LOGIN</h1>
          <div className="fly"><i className="fa-sharp-duotone fa-solid fa-plane"></i></div>
        </div>
        <input type="email" 
        className="inp1" 
        required 
        placeholder="Enter an email" 
        value={email} 
        onChange={(e)=>{
            setemail(e.target.value)
        }}
        />
        <br />
        <br />
        <input type="password"
         className="inp2" required 
         placeholder="Enter a password"
          value={password} 
          onChange={(e)=>{
            setpassword(e.target.value);
          }}/>
        <button className="but3" onClick={()=>{
            handle_submit();
        }}>Sign in</button>
        <p className="para2">Forgot password</p>
      </div>
    </>
  );
}

export default Login;
