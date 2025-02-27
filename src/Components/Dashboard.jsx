import React, { useState } from 'react';
import Uselogout from '../Hooks/Uselogout';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    let airport = [
        "New Delhi", "Mumbai", "Bengaluru", "Chennai", "Kolkata", "Hyderabad", "Kochi",
        "Ahmedabad", "Goa", "Pune", "Jaipur", "Guwahati", "Thiruvananthapuram", "Lucknow",
        "Bhubaneswar", "Varanasi", "Amritsar", "Indore", "Madurai", "Siliguri", "Visakhapatnam",
        "Mangalore", "Nagpur", "Vadodara", "Tiruchirappalli", "Coimbatore", "Surat", "Bhopal",
        "Ranchi", "Gaya"
    ];
    const [source, setSource] = useState('');
    const [destination, setDestination] = useState('');
    const [date, setDate] = useState('');
    let logout = Uselogout();
    let name = sessionStorage.getItem('Name');
    let navigate = useNavigate();

    const handleSearch = () => {
        if (source && destination && date && source !=destination) {
            navigate(`/show/${source}/${destination}/${date}`);
        } else {
            alert("Please select Source, Destination, and Date properly");
        }
    };

    return (
        <>
            <div className="header">
                <div className="pr">
                    <p className="p1">SAFRAH FLY HIGH</p>
                    <i className="fas fa-plane"></i>
                </div>
                <div><p className="p2" onClick={()=>{navigate('/profile')}}> Profile</p></div>
                {
                    (name==="admin")?<div><p className="p3" onClick={()=>navigate('/Dashboard/cancelled')
                    }>cancelled Tickets</p></div>:<div><p className="p3" onClick={()=>navigate('/Dashboard/booked')
                    }>Booked Tickets</p></div>
                }
                
                <div><button className="dbut1" onClick={() => { logout() }}>Logout</button></div>
            </div>
            <div className="middle">
                <h1 className="p4">Book Your Flights</h1>
                <div className='icon1'><i className="fas fa-plane"></i></div>
                {
                    (name === "admin") ?
                        <button className='dbut3' onClick={() => { navigate('/Dashboard/Add') }}>Add flights</button> : ""
                }
            </div>
            <div className="booking">
                <div className="booking1"></div>
                <h1 className="p5">Enter Details</h1>
                <div className="booking2">
                    <select className="opt1" value={source} onChange={(e) => setSource(e.target.value)}>
                        <option value="">-----Source---</option>
                        {airport.map((airport1, index) => (
                            <option value={airport1} key={index}>{airport1}</option>
                        ))}
                    </select>
                    <select className="opt1" value={destination} onChange={(e) => setDestination(e.target.value)}>
                        <option value="">---Destination---</option>
                        {airport.map((airport1, index) => (
                            <option value={airport1} key={index}>{airport1}</option>
                        ))}
                    </select>
                    <input type="date" className="date1" value={date} onChange={(e) => setDate(e.target.value)} />
                </div>
                <div className="bro"><i className="fas fa-plane"></i></div>
                <button className="dbut2" onClick={handleSearch}>Search</button>
            </div>
            <div className="footer">
                <div className="pr">
                    <p className="p1">SAFRAH FLY HIGH</p>
                    <i className="fas fa-plane"></i>
                </div>
                <div><p className="p2">Contact us..</p></div>
                <div className='icon2'><i className="fa-brands fa-instagram"></i></div>
                <div className='icon2'><i className="fa-brands fa-twitter"></i></div>
                <div className='icon2'><i className="fa-brands fa-facebook"></i></div>
            </div>
        </>
    );
}

export default Dashboard;
