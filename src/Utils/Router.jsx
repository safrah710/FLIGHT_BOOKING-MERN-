import React from 'react'
import Start from '../Components/Start'
import Login from '../Components/Login'
import Signup from '../Components/Signup'
import Dashboard from '../Components/Dashboard'
import Addflights from '../Components/Addflights'
import Showflights from '../Components/Showflights'
import Booktickets from '../Components/Booktickets'
import Booked from '../Components/Booked'
import Cancelled from '../Components/Cancelled'
import Profile from '../Components/Profile'
 let routes=[
    {
        path:'/',
        element:<><Start/></>
   },
   {
    path:'/login',
    element:<><Login/></>
   },
   {
    path:'/signup',
    element:<><Signup/></>
  },
  {
    path:'/Dashboard',
    element:<><Dashboard/></>
  },
  {
    path:'/profile',
    element:<><Profile/></>
  },
  {
    path:'/Dashboard/add',
    element:<><Addflights/></>
  },
  {
    path:'/Dashboard/booked',
    element:<><Booked/></>
  },
  {
    path:'/Dashboard/cancelled',
    element:<><Cancelled/></>
  },
  {
    path:'/show/:source/:destination/:date/',
    element:<><Showflights/></>
  },
  {
    path:'/show/book/:price/:fnumber/:date',
    element:<><Booktickets/></>
  }
]
export default routes
