import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
function Signup() {
    let navigate=useNavigate();
    let states1 = [
        "Andhra Pradesh",
        "Arunachal Pradesh",
        "Assam",
        "Bihar",
        "Chhattisgarh",
        "Goa",
        "Gujarat",
        "Haryana",
        "Himachal Pradesh",
        "Jammu and Kashmir",
        "Jharkhand",
        "Karnataka",
        "Kerala",
        "Madhya Pradesh",
        "Maharashtra",
        "Manipur",
        "Meghalaya",
        "Mizoram",
        "Nagaland",
        "Odisha",
        "Punjab",
        "Rajasthan",
        "Sikkim",
        "Tamil Nadu",
        "Telangana",
        "Tripura",
        "Uttarakhand",
        "Uttar Pradesh",
        "West Bengal",
        "Andaman and Nicobar Islands",
        "Chandigarh",
        "Dadra and Nagar Haveli",
        "Daman and Diu",
        "Delhi",
        "Lakshadweep",
        "Puducherry"
    ]
    let[name,setname]=useState("");
    let [email,setemail]=useState("");
    let[password,setpassword]=useState("");
    let[con_password,setcon_password]=useState("");
    let[mobile,setmobile]=useState("");
    let[state,setstate]=useState("");
    const handle_sign=async()=>{
        try{
            let res=await axios.post("https://flight-booking-mern.onrender.com/user/signup",{name,email,password,con_password,mobile,state})
            if(res.status==200){
                toast.success("Account created successfully");
                setname("");
                setemail("");
                setpassword("");
                setcon_password("");
                setmobile("");
                setstate("");
                navigate('/');                
            }
            else if(res.status==400){
                toast.error("Passsord donot match");
            }
            else if (res.status==500){
                toast.error("Account creation unsuccessfull");
            }
        }
        catch(err){
            toast.error("creation failed");
        }
    }
  return (
   <>
   <div className="mid">
        <marquee direction="right" width="90%">
                 <h1 style={{"fontSize": "30px"}}>WELCOME TO SAFRAH FLY HIGH</h1>
        </marquee> 
    </div>
    <div className="signup">
        <div className="top1">
           <h1 className="para2">Sign-up</h1>
           <div className="fly2"><i className="fa-sharp-duotone fa-solid fa-plane"></i></div> 
        </div>
        <input type="text"  className="inp3" required placeholder="Enter a name" value={name} onChange={(e)=>{setname(e.target.value)}}/>
        <br/>
        <br/>
        <input type="email"  className="inp5" required placeholder="Enter a email" value={email} onChange={(e)=>{setemail(e.target.value)}}/>
        <br/>
        <br/>
        <input type="password" className="inp6" required placeholder="Enter a password" maxLength="8" value={password} onChange={(e)=>{
            setpassword(e.target.value);
        }} />
        <br/>
        <br/>
        <input type="password"  className="inp7" required placeholder="Enter confirm password" maxLength="8" value={con_password} onChange={(e)=>{
            setcon_password(e.target.value);
        }} />
        <br/>
        <br/>
        <input type="text" className="inp8" required placeholder="Enter a mobile number" value={mobile} onChange={((e)=>{setmobile(e.target.value)})}/>
        <br/>
        <br/>
        <select className="inp9" value={state} onChange={(e)=>{setstate(e.target.value)}} required>
            <option value="0">--- select a state----</option>
            {
            states1.map((e,i)=>(
                <option value={e} key={i}>{e}</option>
            ))
            }     
        </select>
        <button className="but4" onClick={()=>handle_sign()}>Register</button>
    </div>
   </> 
  )
}

export default Signup
