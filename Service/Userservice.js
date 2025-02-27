import { client,dbname } from "../model/index.js";
import auth from "../auth/auth.js";
const login=async(req,res)=>{
    await client.connect();
    try{
        const db=client.db(dbname);
        const data=await db.collection('users').findOne({"email":req.body.email});
        console.log("hi bro");
        if(data){
            const check=auth.compare(req.body.password,data.password);
            if(check){
                let payload = {
                    id: data.id,
                    Name: data.name,
                    email: data.email,
                };
                let token = auth.createToken(payload);
                res.status(200).send({
                    message: 'Logged in successfully',
                    token,
                    id:data._id,
                    Name:data.name,
                    email:data.email,
                    mobile:data.mobile
                });
            }
            else{
                res.status(400).send({
                    message:"invalid password"
                })
            }
        }
        else{
            res.status(500).send({
            message:"Invalid email"
        })
        }
    }
    catch(err){
        res.status(400).send({
            message:err.message|| "internal server error"
        })
    }
}

const signup=async(req,res)=>{
    await client.connect();
    try{
        let db=client.db(dbname);
        let {id,name,email,password,con_password,mobile,state}=req.body;
        if (password !== con_password) {
            res.status(400).send({
                message: "Passwords do not match"
            });
            return;
        }

        const hashedPassword = await auth.encrypt(password);

        await db.collection("users").insertOne({
            name,
            email,
            password: hashedPassword,
            mobile,
            state
        });

        res.status(200).send({
            message: 'Account created successfully'
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || 'Internal server error'
        });
    }
}
const show=async(req,res)=>{
    await client.connect();
    try{
         let db= client.db(dbname);
         let {email}=req.query;
         console.log(email);
         let data=await db.collection("users").find({email:email}).toArray();
         console.log(data);
         res.status(200).send({
            message:"message fetched successfully",
            data:data
         })    
    }
    catch(err){
        res.status(400).send({
            message:"data errror"
        })
    }
}
const edit=async(req,res)=>{
    await client.connect();
    try{
         let db= client.db(dbname);
         let {email1,email,name,state,mobile}=req.body;
         await db.collection("users").updateOne({email:email},
            {$set:{name,email,state,mobile}}
         )
        
         res.status(200).send({
            message:"data edited successfully",
            
         })    
    }
    catch(err){
        res.status(400).send({
            message:"data errror"
        })
    }
}
export default{login,signup,show,edit}