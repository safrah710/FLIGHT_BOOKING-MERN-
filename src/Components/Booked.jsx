import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import Uselogout from '../Hooks/Uselogout';

function Booked() {
    const [data, setData] = useState([]);
    const [data1, setData1] = useState([]);
    const logout = Uselogout();
    const navigate = useNavigate();
    const email = sessionStorage.getItem('email');
    const [showPopup, setShowPopup] = useState(false);
    const [selectedTicketId, setSelectedTicketId] = useState(null);

    const show = async () => {
        try {
            let res = await axios.get('https://flight-booking-mern.onrender.com/ticket/get1', { params: { email } });
            if (res.status === 200 && res.data.data.length > 0) {
                let flightData = [];
                for (let i = 0; i < res.data.data.length; i++) {
                    flightData.push({
                        fnumber: res.data.data[i].fnumber,
                        id: res.data.data[i].id  
                    });
                }
                fetchFlights(flightData);
            }
        } catch (err) {
            toast.error("Error fetching tickets");
        }
    };

    const fetchFlights = async (flightData) => {
        let tempData = [];
        for (let i = 0; i < flightData.length; i++) {
            try {
                let res = await axios.get('https://flight-booking-mern.onrender.com/flight/show1', { params: { fnumber1: flightData[i].fnumber } });
                if (res.status === 200 && res.data.data.length > 0) {
                    res.data.data.forEach(flight => {
                        tempData.push({ ...flight, id: flightData[i].id }); // Add id to flight details
                    });
                }
            } catch (err) {
                toast.error("Error fetching flight details");
            }
        }
        setData(tempData);
    };
    console.log(data);

    useEffect(() => {
        show();
    }, []);

   
const downloadTicket = async (d) => {
    try {
        let res = await axios.get('https://flight-booking-mern.onrender.com/ticket/get1', { params: { email } });
        if (res.status === 200 && res.data.data.length > 0) {
            let ticketData = res.data.data.find(ticket => ticket.fnumber === d.fnumber);
            if (!ticketData) return toast.error("Ticket data not found");
            const doc = new jsPDF();
            doc.setFillColor(0, 102, 204);
            doc.rect(0, 0, 210, 20, "F");
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(16);
            doc.text("SAFRAH FLY HIGH - FLIGHT TICKET", 15, 13);
            doc.setFillColor(230, 230, 230);
            doc.rect(10, 25, 190, 40, "F");
            doc.setTextColor(0, 0, 0);
            doc.setFontSize(12);
            doc.text(`Flight: ${d.fname}`, 15, 35);
            doc.text(`Flight Code: ${d.fnumber}`, 15, 45);
            doc.text(`Date: ${ticketData.date}`, 15, 55);
            doc.text(`From: ${d.source} (${d.start})`, 15, 65);
            doc.text(`To: ${d.destination} (${d.reach})`, 15, 75);
            doc.text(`Price: INR ${ticketData.price1}`, 15, 85);

            let y = 100;
            doc.setFontSize(10);
            doc.setFillColor(200, 200, 200);
            doc.rect(10, y - 5, 190, 7, "F");
            doc.text("Passenger Name", 15, y);
            doc.text("Age", 80, y);
            doc.text("Seat Number", 120, y);

            ticketData.passengers.forEach((passenger, index) => {
                y += 10;
                doc.text(passenger.name.name, 15, y);
                doc.text(passenger.name.age.toString(), 80, y);
                doc.text(passenger.seat_number.toString(), 120, y);
            });

        
            y += 20;
            doc.setFillColor(230, 230, 230);
            doc.rect(10, y, 190, 7, "F");
            doc.text("Guidelines", 15, y + 5);
            y += 15;
            const guidelines = [
                "1. Arrive at the airport 2 hours before departure.",
                "2. Carry a valid ID proof along with this ticket.",
                "3. Check-in closes 45 minutes before departure.",
                "4. Follow COVID-19 safety protocols.",
                "5. Keep your luggage within the weight limits.",
                "6. Electronic devices should be in airplane mode.",
                "7. No sharp objects or liquids above 100ml allowed."
            ];
            doc.setFontSize(10);
            guidelines.forEach((guideline, index) => {
                doc.text(guideline, 15, y + index * 7);
            });

        
            doc.save(`Ticket_${d.fnumber}.pdf`);
        }
    } catch (err) {
        toast.error("PDF not downloaded");
    }
};
const handleCancelClick = (id) => {
    setSelectedTicketId(id);
    setShowPopup(true);
};

const confirmCancel = async () => {
    try {
        let res = await axios.delete('https://flight-booking-mern.onrender.com/ticket/delete', { data: { id: selectedTicketId } });
        if (res.status === 200) {
            toast.success("Ticket deleted successfully. Money will be refunded within a week");
            setShowPopup(false);
            setData(data.filter(ticket => ticket.id !== selectedTicketId));
        }
    } catch (err) {
        toast.error("Error canceling ticket");
    }
};
return (
    <>
        <div className="header">
            <div className="pr">
                <p className="p1">SAFRAH FLY HIGH</p>
                <i className="fas fa-plane"></i>
            </div>
            <div><p className="p2" onClick={() => navigate('/Dashboard')}>Profile</p></div>
            <div><button className="dbut1" onClick={logout}>Logout</button></div>
        </div>

        {data.length > 0 ? (
            data.map((d, i) => (
                <div className='show' key={i}>
                    <div className='part1'>
                        <p className='sp1'>Flight: {d.fname} <i className="fas fa-plane"></i></p>
                        <p className='sp2'>Code: {d.fnumber}</p>
                        <p className='sp10'>Ticket ID: {d.id}</p> 
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
                       
                    </div>
                    <div className='part6'>
                        <button className='sbut5' onClick={()=>{downloadTicket(d)}}>Download</button>
                        <br/>
                        <button className='sbut6' onClick={() => handleCancelClick(d.id)}>Cancel</button>
                    </div>
                </div>
            ))
        ) : (
            <div className="no-flights">
                <p>No flights available</p>
            </div>
        )}

        {showPopup && (
            <div className="popup">
                <div className="popup-content">
                    <h3>Are you sure you want to cancel this ticket?</h3>
                    <div className="popup-buttons">
                        <button className="confirm-btn" onClick={confirmCancel}>Yes, Cancel</button>
                        <button className="cancel-btn" onClick={() => setShowPopup(false)}>No</button>
                    </div>
                </div>
            </div>
        )}

        <style jsx>{`
            .popup {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .popup-content {
                background: white;
                padding: 20px;
                border-radius: 10px;
                text-align: center;
                box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
            }
            .popup-buttons {
                margin-top: 20px;
            }
            .confirm-btn {
                background: red;
                color: white;
                padding: 10px 20px;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                margin-right: 10px;
            }
            .cancel-btn {
                background: gray;
                color: white;
                padding: 10px 20px;
                border: none;
                border-radius: 5px;
                cursor: pointer;
            }
        `}</style>
    </>
);
}

export default Booked;