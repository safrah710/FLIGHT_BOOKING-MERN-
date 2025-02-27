import { client,dbname } from "../model/index.js";
const post = async (req, res) => {
    await client.connect();
    try {
        let db = client.db(dbname);
        let existingTicket = await db.collection("Ticket").findOne({ id: req.body.id });
        if (existingTicket) {
            return res.status(400).send({ message: "Ticket already exists" });
        }
        let { passengers, email1, name1, id, price1, fnumber, date } = req.body;
        if (!Array.isArray(passengers) || passengers.length === 0) {
            return res.status(400).send({ message: "Invalid passenger list" });
        }

        let flightData = await db.collection("flight").findOne({ fnumber: req.body.fnumber });
        console.log(flightData);

        if (!flightData || !flightData.seat || flightData.seat.length === 0) {
            return res.status(400).send({ message: "No available seats" });
        }

        let seatArray = [...flightData.seat];


        if (passengers.length > seatArray.length) {
            return res.status(400).send({ message: "Not enough seats available" });
        }

        let allocatedSeats = [];
        for (let i = 0; i < passengers.length; i++) {
            let randomIndex = Math.floor(Math.random() * seatArray.length);
            allocatedSeats.push(seatArray[randomIndex]);
            seatArray.splice(randomIndex, 1);
        }

        let passengerData = [];
        for (let i = 0; i < passengers.length; i++) {
            passengerData.push({
                name: passengers[i],
                seat_number: allocatedSeats[i]
            });
        }

        let ticketData = {
            passengers: passengerData,
            email1,
            name1,
            id,
            price1,
            fnumber,
            date
        };

        await db.collection("Ticket").insertOne(ticketData);

        await db.collection("flight").updateOne(
            { fnumber: req.body.fnumber },
            { $set: { seat: seatArray } }
        );

        res.status(200).send({ 
            message: "Tickets booked successfully", 
            allocatedSeats 
        });

    } catch (err) {
        res.status(500).send({ message: err.message || "Internal server error" });
    }
};


const get = async (req, res) => {
    await client.connect();
    let { email } = req.query;
    try {
        let db = client.db(dbname);
        let payload = await db.collection("Ticket").find({ email1:email }).toArray();
        if (payload.length > 0) {
            res.status(200).send({
                message: "Flight shown",
                data: payload
            });
        } else {
            res.status(400).send({
                message: "Flight not available"
            });
        }
    } catch (err) {
        res.status(500).send({
            message: "Error",
            error: err.message
        });
    }
}
const del = async (req, res) => {
    await client.connect();
    try {
        let db = client.db(dbname);
        let id = req.body.id;
        let data = await db.collection("Ticket").findOne({ id: id });
        if (!data) {
            return res.status(404).send({
                message: "Ticket not found",
            });
        }
        await db.collection("Ticket").deleteOne({ id: id });
        await db.collection("Cancelled").insertOne(data);
        res.status(200).send({
            message: "Data deleted successfully",
        });
    } catch (err) {
        res.status(400).send({
            message: "Error occurred",
        });
    }
};
const del1 = async (req, res) => {
    await client.connect();
    try {
        let db = client.db(dbname);
        let {id} = req.query;
        console.log(id);
        await db.collection("Cancelled").deleteOne({ id: id });
        res.status(200).send({
            message: "Data deleted successfully",
        });
    } catch (err) {
        res.status(400).send({
            message: "Error occurred",
        });
    }
};

const get1 = async (req, res) => {
    await client.connect();
    try {
        let db = client.db(dbname);
        let payload = await db.collection("Cancelled").find().toArray();
        if (payload.length > 0) {
            res.status(200).send({
                message: "cancelled is shown",
                data: payload
            });
        } else {
            res.status(400).send({
                message: "no cancelled tickets available"
            });
        }
    } catch (err) {
        res.status(500).send({
            message: "Error",
            error: err.message
        });
    }
}

export default{post,get,del,get1,del1}