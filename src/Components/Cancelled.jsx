import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Uselogout from '../Hooks/Uselogout';

function Cancelled() {
    const [data, setData] = useState([]);
    const logout = Uselogout();
    const navigate = useNavigate();
    const show = async () => {
        try {
            let res = await axios.get('https://flight-booking-mern.onrender.com/ticket/can');
            if (res.status === 200 && res.data.data.length > 0) {
             setData(res.data.data);
            }
        } catch (err) {
            toast.error("Error fetching tickets");
        }
    };
    const delete2 = async (id) => {
        try {
            console.log(id);
            let res = await axios.delete('https://flight-booking-mern.onrender.com/ticket/delete1',{params:{id:id}});
            if (res.status === 200) {
                toast.success("Ticket deleted successfully")
            }
        } catch (err) {
            toast.error("Error canceling ticket");
        }
    };

    useEffect(() => {
        show();
    }, []);
return (
    <>
        <div className="header">
            <div className="pr">
                <p className="p1">SAFRAH FLY HIGH</p>
                <i className="fas fa-plane"></i>
            </div>
            <div><p className="p2" onClick={() => navigate('/Dashboard')}>Home</p></div>
            <div><button className="dbut1" onClick={logout}>Logout</button></div>
        </div>

        {data.length > 0 ? (
            data.map((d, i) => (
                <div className='show' key={i}>
                    <div className='part1'>
                        <p className='sp1'>name: {d.name1}</p>
                        <p className='sp2'>email: {d.email1}</p>
                        <p className='sp10'>Ticket ID: {d.id}</p> 
                    </div>
                    <div className='part5'>
                        <p className='sp8'><b>INR {d.price1}</b></p>
                        <button className='sbut5' onClick={()=>{
                            delete2(d.id);
                        }}>Delete</button>
                    </div>
                   
                </div>
            ))
        ) : (
            <div className="no-flights">
                <p>No flights available</p>
            </div>
        )}
    </>
);
}

export default Cancelled;