import React from 'react'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
function Uselogout() {
    let navigate=useNavigate()
  return ()=>{
    sessionStorage.clear()
    toast.success("Logout successful");
    navigate('/');
  }
}

export default Uselogout
