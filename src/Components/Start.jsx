import React from 'react'
import { Link } from 'react-router-dom'
function Start() {
  return (
    <div className="body">
       <div className="mid">
        <marquee direction="right" width="60%">
                 <h1>WELCOME TO SAFRAH FLY HIGH</h1>
        </marquee> 
    </div>
    <div className="but">
         <Link to='/Login'><button className="but1">Login</button></Link>
         <Link to='/signup'><button className="but2">Signup</button></Link>
    </div>
    </div>
  )
}

export default Start
