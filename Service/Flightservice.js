import { client,dbname } from "../model/index.js";
const store=async(req,res)=>{
    await client.connect();
    try{
        let db=client.db(dbname);
        let data=await db.collection("flight").findOne({"fnumber":req.body.fnumber});
        if(!data){
            let{fname,fnumber,source,destination,start,reach,duration,price,seat}=req.body;
            await  db.collection("flight").insertOne({fname,fnumber,source,destination,start,reach,duration,price,seat})
            res.status(200).send({
                message:"Flight added successfully"
            })
        }
        else{
            res.status(400).send({
                message:"Flight already added"
            })
        }
    }
    catch(err){
        res.status(500).send({
            message:err.message||"Internal server error"
        })
    }
}
const show = async (req, res) => {
    await client.connect();
    let { src, dest } = req.query;
    try {
        let db = client.db(dbname);
        let payload = await db.collection("flight").find({ source: src, destination: dest }).toArray();
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
const show1 = async (req, res) => {
    await client.connect();
    let { fnumber1 } = req.query;
    //console.log(fnumber1);
    try {
        let db = client.db(dbname);
        let payload = await db.collection("flight").find({ fnumber:fnumber1 }).toArray();
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

export default{store,show,show1}