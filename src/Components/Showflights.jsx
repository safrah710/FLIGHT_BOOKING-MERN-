import React, { useEffect, useState } from 'react';
import Uselogout from '../Hooks/Uselogout';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

function Showflights() {
    let navigate = useNavigate();
    let logout = Uselogout();
    let { source, destination,date } = useParams();
    let params1 = { src: source, dest: destination };
    let [data, setData] = useState([]);

    const showfight = async () => {
        try {
            let res = await axios.get('https://flight-booking-mern.onrender.com/flight/show', { params: params1 });
            if (res.data.data.length > 0) {
                setData(res.data.data);
            } else {
                setData([]);
                toast.error("Flight not available");
            }
        } catch (err) {
            toast.error("Failed to fetch flights");
        }
    };

    useEffect(() => {
        showfight();
    }, []);

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
            {data.length > 0 ? (
                data.map((d, i) => (
                    <div className='show' key={i}>
                        <div className='part1'>
                        <div className="booking1"></div>
                            <p className='sp1'>Flight:{d.fname} <i className="fas fa-plane"></i></p>
                            <p className='sp2'>Code:{d.fnumber}</p>
                        </div>
                        <div className='part2'>
                            <p className='sp3'><b>{d.start}</b></p>
                            <p className='sp4'>{d.source}</p>
                        </div>
                        <div className='part3'>
                            <p className='sp5'>{d.duration}</p>
                            <p className='sp6'>----------</p>
                            <p className='sp7'>Non stop</p>
                        </div>
                        <div className='part4'>
                            <p className='sp8'><b>{d.reach}</b></p>
                            <p className='sp9'>{d.destination}</p>
                        </div>
                        <div className='part5'>
                            <p className='sp8'><b>INR {d.price}</b></p>
                            <button className='sbut5' onClick={()=>{navigate(`/show/book/${d.price}/${d.fnumber}/${date}`)}}>Book</button>
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

export default Showflights;
