import React, { useState } from 'react';
import Uselogout from '../Hooks/Uselogout';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

function Booktickets() {
    let navigate = useNavigate();
    let logout = Uselogout();
    let { price, fnumber, date } = useParams();
    const ticketPrice = Number(price) || 500;
    const [passengers, setPassengers] = useState([]);
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    let [id, setId] = useState(null);
    let name1 = sessionStorage.getItem('Name');
    let email1 = sessionStorage.getItem('email');
    let mobile1 = sessionStorage.getItem('mobile');

    const store = async () => {
        try {
            let price1 = passengers.length * ticketPrice;
            let res = await axios.post('https://flight-booking-mern.onrender.com/ticket/post1', {
                passengers, email1, name1, id, price1, fnumber, date
            });
            if (res.status === 200) {
                toast.success("Ticket booked successfully");
                logout();
            } else if (res.status === 400) {
                toast.error("Ticket already booked.");
            }
        } catch (err) {
            toast.error("Ticket not booked. Please try again.");
        }
    }

    const addPassenger = () => {
        if (name && age) {
            setPassengers([...passengers, { name, age }]);
            setName("");
            setAge("");
        }
    };

    const deletePassenger = (index) => {
        setPassengers(passengers.filter((_, i) => i !== index));
    };

    const payTicket = (price) => {
        if (price === "") {
            alert("please enter amount");
        } else {
            var options = {
                key: "rzp_test_mB2T4Ns25QaGEP",
                key_secret: "eSaLfy3xuZYN3DyKUEAiGtZn",
                amount: price * 100,
                currency: "INR",
                name: "STARTUP_PROJECTS",
                description: "for testing purpose",
                handler: function (response) {
                    setId(response.razorpay_payment_id);
                    store();
                },
                prefill: {
                    name: name1,
                    email: email1,
                    contact: mobile1
                },
                notes: {
                    address: "Razorpay Corporate office"
                },
                theme: {
                    color: "#3399cc"
                }
            };
            var pay = new window.Razorpay(options);
            pay.open();
        }
    };

    return (
        <>
            <div className="header">
                <div className="pr">
                    <p className="p1">SAFRAH FLY HIGH</p>
                    <i className="fas fa-plane"></i>
                </div>
                <div><p className="p2" onClick={() => navigate('/Dashboard')}>Home</p></div>
                <div><p className="p3">Booked Tickets</p></div>
                <div><button className="dbut1" onClick={logout}>Logout</button></div>
            </div>

            <div className="booking-section">
                <h2>Book Your Tickets</h2>
                <input
                    type="text"
                    placeholder="Enter Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input-field"
                />
                <input
                    type="number"
                    placeholder="Enter Age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="input-field"
                />
                <button onClick={addPassenger} className="add-btn">Add Passenger</button>

                {passengers.length > 0 && (
                    <div className="passenger-list">
                        <h3>Passenger List</h3>
                        <ul>
                            {passengers.map((p, index) => (
                                <li key={index}>
                                    {index + 1}. {p.name} ({p.age} years)
                                    <button onClick={() => deletePassenger(index)} className="delete-btn">Delete</button>
                                </li>
                            ))}
                        </ul>
                        <h3>Total Cost: INR {passengers.length * ticketPrice}</h3>
                        <button className="bbut1" onClick={() => { payTicket(passengers.length * ticketPrice) }}>PAY</button>
                    </div>
                )}
            </div>
        </>
    );
}

export default Booktickets;
