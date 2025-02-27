import React, { useState } from 'react';
import Uselogout from '../Hooks/Uselogout';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
function Addflights() {
    let airport = [
        "New Delhi",
        "Mumbai",
        "Bengaluru",
        "Chennai",
        "Kolkata",
        "Hyderabad",
        "Kochi",
        "Ahmedabad",
        "Goa",
        "Pune",
        "Jaipur",
        "Guwahati",
        "Thiruvananthapuram",
        "Lucknow",
        "Bhubaneswar",
        "Varanasi",
        "Amritsar",
        "Indore",
        "Madurai",
        "Siliguri",
        "Visakhapatnam",
        "Mangalore",
        "Nagpur",
        "Vadodara",
        "Tiruchirappalli",
        "Coimbatore",
        "Surat",
        "Bhopal",
        "Ranchi",
        "Gaya"
      ];
      

    let logout = Uselogout();
    let navigate = useNavigate();

    let [source, setSource] = useState("");
    let [destination, setDestination] = useState("");
    let [fname, setFname] = useState("");
    let [fnumber, setFnumber] = useState("");
    let [start, setStart] = useState("");
    let [reach, setReach] = useState("");
    let [duration, setDuration] = useState("");
    let [price,setPrice]=useState("");
    let [seats,setSeats]=useState([]);
    let [seat,setSeat]=useState([]);
    const handle_flight=async()=>{
        let array = [];
        for (let i = 1; i <= seats; i++) {
            array.push(i);
        }
        try{
        let res=await axios.post('https://flight-booking-mern.onrender.com/flight/store',{fnumber,fname,source,destination,start,reach,duration,price,seat:array});
        if(res.status===200){
            toast.success("Flight added Successfully");
            setFname("");
            setFnumber("");
            setStart("");
            setReach("");
            setDuration("");
            setSource("");
            setDestination("");
            setPrice("")
             setSeat([]);
             setSeats("");
            navigate('/Dashboard');
        }
        else if(res.status===400){
            toast.error("Flight already added");
        }
        else if(res.status===500){
            toast.error("Flight error1");
        }
        }
    catch(err){
        toast.error("Flight errror2");
    }
    }

    return (
        <>
            <div className="header">
                <div className="pr">
                    <p className="p1">SAFRAH FLY HIGH</p>
                    <i className="fas fa-plane"></i>
                </div>
                <div><p className="p2" onClick={() => { navigate('/Dashboard') }}>Home</p></div>
                <div><p className="p3">Booked Tickets</p></div>
                <div><button className="dbut1" onClick={() => { logout() }}>Logout</button></div>
            </div>
            <div className="signup1">
                <div className="top1">
                    <h1 className="para13">Flight info</h1>
                    <div className="fly2"><i className="fa-sharp-duotone fa-solid fa-plane"></i></div>
                </div>
                <select className="inp9" value={source} onChange={(e) => setSource(e.target.value)}>
                    <option value="">Source---</option>
                    {airport.map((a, i) => (<option value={a} key={i}>{a}</option>))}
                </select>
                <br /><br />
                <select className="inp9" value={destination} onChange={(e) => setDestination(e.target.value)}>
                    <option value="">Destination---</option>
                    {airport.map((a, i) => (<option value={a} key={i}>{a}</option>))}
                </select>
                <br /><br />
                <input type="text" className="inp5" required placeholder="Flight name" value={fname} onChange={(e) => setFname(e.target.value)} />
                <br /><br />
                <input type="text" className="inp6" required placeholder="Flight number" maxLength="8" value={fnumber} onChange={(e) => setFnumber(e.target.value)} />
                <br /><br />
                <input type="text" className="inp7" required placeholder="Starting time" maxLength="8" value={start} onChange={(e) => setStart(e.target.value)} />
                <br /><br />
                <input type="text" className="inp8" required placeholder="Reaching time" value={reach} onChange={(e) => setReach(e.target.value)} />
                <br /><br />
                <input type="text" className="inp8" required placeholder="Duration" value={duration} onChange={(e) => setDuration(e.target.value)} />
                <br /><br />
                <input type="text" className="inp8" required placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
                <br /><br />
                <input type="number" className="inp8" required placeholder="Seats" value={seats} onChange={(e) => setSeats(e.target.value)} />
                <br /><br />
                <button className="but4" onClick={()=>{handle_flight()}} >Add</button>
            </div>
        </>
    );
}

export default Addflights;
