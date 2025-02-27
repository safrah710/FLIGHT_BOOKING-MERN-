import React, { useEffect, useState } from 'react';
import Uselogout from '../Hooks/Uselogout';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

function Profile() {
    let logout=Uselogout();
    let navigate=useNavigate();
    let name1 = sessionStorage.getItem('Name');
    let email1=sessionStorage.getItem('email')
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
        let[mobile,setmobile]=useState("");
        let[state,setstate]=useState("");
        let params={email:email1}

        const show=async()=>{
            try{
                let res=await axios.get('https://flight-booking-mern.onrender.com/user/show',{params});
                
                if(res.status===200){
                    setname(res.data.data[0].name);
                    setmobile(res.data.data[0].mobile);
                    setstate(res.data.data[0].state);
                    setemail(res.data.data[0].email);
                }
            }
            catch(err){
                toast.error("fetching unsuccessfull");
            }

        }
        const edit=async()=>{
            try{
                let res=await axios.post('https://flight-booking-mern.onrender.com/user/edit',{email1,email,name,state,mobile});
                
                if(res.status===200){
                   toast.success("Edited successfully");
                }
            }
            catch(err){
                toast.error(" unsuccessfull");
            }

        }
useEffect(()=>{
    show();
})
  return (
    <>
       <div className="header">
                <div className="pr">
                    <p className="p1">SAFRAH FLY HIGH</p>
                    <i className="fas fa-plane"></i>
                </div>
                <div><p className="p2" onClick={() => navigate('/Dashboard')}>Home</p></div>
                {
                    (name1==="admin")?<div><p className="p3" onClick={()=>navigate('/Dashboard/cancelled')
                    }>cancelled Tickets</p></div>:<div><p className="p3" onClick={()=>navigate('/Dashboard/booked')
                    }>Booked Tickets</p></div>
                }
                
                <div><button className="dbut1" onClick={() => { logout() }}>Logout</button></div>
            </div>
            <div className="mid">
        <marquee direction="right" width="90%">
                 <h1 style={{"fontSize": "30px"}}>WELCOME TO SAFRAH FLY HIGH</h1>
        </marquee> 
    </div>
    <div className="signup">
        <div className="top1">
           <h1 className="para2">PROFILE</h1>
           <div className="fly2"><i className="fa-sharp-duotone fa-solid fa-plane"></i></div> 
        </div>
        <input type="text"  className="inp3" required placeholder="Enter a name" value={name} onChange={(e)=>{setname(e.target.value)}}/>
        <br/>
        <br/>
        <input type="email"  className="inp5" required placeholder="Enter a email" value={email} onChange={(e)=>{setemail(e.target.value)}}/>
     
        <br/>hhk
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
        <button className="but4" onClick={()=>{
            edit();
        }} >SAVE</button>
    </div>
    
    </>
  )
}

export default Profile
