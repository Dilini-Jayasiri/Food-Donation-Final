//Import all dependencies
const dotenv =require('dotenv');
const express=require('express');
const cookieParser = require('cookie-parser');
const app=express();
//Config env file and require connection file
dotenv.config({path: './config.env'});
require('./db/conn');
const port = process.env.PORT;

//Require Model
const Users = require('./models/userSchema');
const Message = require('./models/msgSchema');
const InstDonSchema = require('./models/instantDonationSchema');
const ResDonSchema = require('./models/reservedDonationSchema');
const ResDonNew = require('./models/reservedDonNew');
const Request = require('./models/requestSchema');
const ReservedDonation = require('./models/reservedDonationSchema');
const InstantDonation = require('./models/instantDonationSchema');
const authenticate = require('./middleware/authenticate');
const requestRoute = require('./routes/requests');
const instantRoute = require('./routes/instantDonation');
const reservedRoute = require('./routes/reservedDonation');
const reservedLastRoute = require('./routes/ReservedLastRoute');
const insLastRoute = require('./routes/InstantLastRoute');
const reservedNewRoute = require('./routes/reservedDonNew');
const donationStatusRoute = require('./routes/status');
const userRoutes = require('./routes/users');
const getAllIns = require('./controllers/GetAllInsDons');
//const getAllResNew = require('./controllers/GetAllResNewDons');
//const router = require('./routes/requests');
//These method is used to get data and cookies from frontend
app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(cookieParser());
app.use('/requests',requestRoute);
app.use('/api/lastRequest',requestRoute);
app.use('/reservedDonations',reservedRoute);
app.use('/lastDon',reservedLastRoute);
app.use('/insLastDon',insLastRoute)
app.use('/api/instantDonations',instantRoute);
app.use('/api/user',userRoutes);
app.use('/api/resDonNew',reservedNewRoute);
app.use('/api/status',donationStatusRoute);
app.use(getAllIns);
//app.use(getAllResNew);
const User = require('./models/userSchema')
//app.use()
//middleware
app.use(express.json());
app.use((req,res,next)=>{
//    console.log(req.path,req.method)
    next()
})

app.get('/',(req,res) =>{
    res.send("Hello world");
})

// Messages
app.post('/message',async(req,res) =>{
    try{
        //Get body or data
        const name = req.body.name;
        const email = req.body.email;
        const message = req.body.message;

        const sendMessage= new Message({
            name : name,
            email : email,
            message : message
        });

        //Save method is used to create user
        //But before saving or inserting, password will hash.
        //Because of hashing.After hash, it will save to DB
        const created = await sendMessage.save();
        console.log(created);
        res.status(200).send("Message Sent");

    }catch(error){
        res.status(400).send(error);
    }
})
app.post('/reservedDon',async(req,res) =>{
 const {donorName,phone,donEmail,district,address,orgName,date,foodName,quantity,mealType,foodType} = req.body
    let emptyFields = []

    if(!donorName){
        emptyFields.push('donorName')
    }
    if(!phone){
        emptyFields.push('phone')
    }
    if(!donEmail){
        emptyFields.push('donEmail')
    }
    if(!district){
        emptyFields.push('district')
    }
    if(!address){
        emptyFields.push('address')
    }
    if(!orgName){
        emptyFields.push('orgName')
    }
    if(!date){
        emptyFields.push('date')
    }
    if(!foodName){
        emptyFields.push('foodName')
    }
    if(!quantity){
        emptyFields.push('quantity')
    }
    if(!mealType){
        emptyFields.push('mealType')
    }
    if(!foodType){
        emptyFields.push('foodType')
    }
    if(emptyFields.length > 0) {
        return res.status(400).json({error:'Please fill in all fields',emptyFields})
    }
    
    try {
        const user_id = req.user._id;
       const reservedDonation = await ReservedDonation.create({donorName,phone,donEmail,district,address,orgName,date,foodName,quantity,mealType,foodType,user_id})
       res.status(200).json(reservedDonation)
    } catch (error){
        res.status(400).send(error);
    }
})

app.post('/instantDon',async(req,res) =>{
    try{
        const nic = req.body.nic;
        const donorName = req.body.donorName;
        const phone = req.body.phone;
        const donEmail = req.body.donEmail;
        const mealType = req.body.mealType;
        const quantity = req.body.quantity;
        const oldFood = req.body.oldFood;
        const district = req.body.district;
        const address = req.body.address;
        const area = req.body.area;
        const orgName = req.body.orgName;
        const date = req.body.date;
        const foodName = req.body.foodName;
        const foodType = req.body.foodType;


        const instantDonation= new InstantDonation({
        nic:nic,
        donorName:donorName ,
        phone: phone,
        donEmail:donEmail,
        mealType:mealType,
        quantity: quantity,
        oldFood:oldFood,
        district : district,
        address: address,
        area:area,
        orgName: orgName,
        date: date,
        foodName: foodName,
        foodType: foodType
        
            
        });

        //Save method is used to create user
        //But before saving or inserting, password will hash.
        //Because of hashing.After hash, it will save to DB
        const created = await instantDonation.save();
        console.log(created);
        res.status(200).send("Donation Details Sent");

    }catch(error){
        res.status(400).send(error);
    }
})

app.get('/reservedDon',(req,res) =>{
    ReservedDonation.find((err,data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(200).send(data);
        }
    })
})

app.get('/resNewDon',(req,res) =>{
    ResDonNew.find((err,data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(200).send(data);
        }
    })
})

app.get('/resNewDonStatus', (req, res) => {
    ResDonNew.find({ status: null }, (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(data);
      }
    });
  });
  

app.get('/instantDon',(req,res) =>{
    InstantDonation.find((err,data)=>{
        if(err){
            res.status(500).send(err)
        

        }else{
            res.status(200).send(data);
        }
    })
})

app.get('/reservedDon/get',(req,res) =>{
    try{
    const dons =  ReservedDonation.find().sort({_id:-1});
    //var donsget=localStorage.getItem("don",dons);
   // console.log(dons);
}catch(error){
console.log(error.message);
}
});

// app.get("/reservedDon/:id",async (req,res) => {
//     let result  = await ReservedDonation.findOne({_id:req.params.id})
//     if(result){
//         res.send(result)
//     }else{
//         res.send({"result":"No record found"})
//     }
// })

app.get('/reservedDon/_id', async(req, res) => {
    let result  = await ReservedDonation.findOne().sort({_id:-1}).limit(1);
      if (error) {
        console.error("no record");
        return res.sendStatus(500);
      }
      res.send(result);
    });
  

app.get("/instantDon/:id",async (req,res) => {
    let result  = await ReservedDonation.findOne({_id:req.params.id})
    if(result){
        res.send(result)
    }else{
        res.send({"result":"No record found"})
    }
})
app.get("/api/reservedDonation/last",async(req,res) => {
     //   const {user_id} = req.params; 
        const dons = await ReservedDonation.findOne().sort({_id:-1}).limit(1);
        console.log(dons);
        if(dons){
            res.send(dons)
        }else {
    res.send({"dons":"no record found"})
    }
    });

// app.get('/request/Org/:orgName', async (req, res) => {
//     const { orgName } = req.params;
//     let donarList = [];
//     // console.log(orgName);
//     try {
//         const instDonList = await InstantDonation.find({ orgName: orgNam });
//         const resDonList = await ReservedDonation.find({ orgName: orgName });
//         // Check Whether the Data is Available
//         if(instDonList.length != 0 && resDonList.length != 0){
//             instDonList.forEach(element => {
//                 donarList.push(element);
//             });

//             resDonList.forEach(element => {
//                 donarList.push(element);
//             });

//         } else if(resDonList != 0 ){
//             resDonList.forEach(element => {
//                 donarList.push(element);
//             });
//         }else if(instDonList.length != 0){
//             instDonList.forEach(element => {
//                 donarList.push(element);
//             });
//         }else if(instDonList.length == 0  && resDonList.length == 0){
//             return res.status(404).json({error:'No such donation'})
//         }else{
//             return res.status(404).json({error:'No such donation'})
//         }

//       res.status(200).json(donarList)
//     } catch (error) {
//         console.log(error)
//     }
// });

app.get('/request/Org/:orgName', async (req, res) => {
    const { orgName } = req.params;
    let donarList = [];
    // console.log(orgName);
    try {
        const instDonList = await InstantDonation.find({ orgName: orgName });
        const resDonList = await ReservedDonation.find({ orgName: orgName });
        // Check Whether the Data is Available
        if(instDonList.length != 0 && resDonList.length != 0){
            instDonList.forEach(element => {
                donarList.push(element);
            });

            resDonList.forEach(element => {
                donarList.push(element);
            });

        } else if(resDonList != 0 ){
            resDonList.forEach(element => {
                donarList.push(element);
            });
        }else if(instDonList.length != 0){
            instDonList.forEach(element => {
                donarList.push(element);
            });
        }else if(instDonList.length == 0  && resDonList.length == 0){
            return res.status(404).json({error:'No such donation'})
        }else{
            return res.status(404).json({error:'No such donation'})
        }

      res.status(200).json(donarList)
    } catch (error) {
        console.log(error)
    }
});


    app.get("/api/instantDonation/last",async(req,res) => {
        //   const {user_id} = req.params; 
           const dons = await InstantDonation.findOne().sort({_id:-1}).limit(1);
           console.log(dons);
           if(dons){
               res.send(dons)
           }else {
       res.send({"dons":"no record found"})
       }
       });
app.post('/requests',async(req,res) =>{
    try{
        //Get body or data
        const orgName = req.body.orgName;
        const orgEmail = req.body.orgEmail;
        const orgSize = req.body.orgSize;
        const phone = req.body.phone;
        const city = req.body.city;
        const quantity = req.body.quantity;
        const orgType = req.body.orgType;
        const reason = req.body.reason;
        const mealType = req.body.mealType;
        const confirmedDate = req.body.confirmedDate;


        const request= new Request({
            orgName : orgName,
            orgEmail : orgEmail,
            orgSize : orgSize,
            phone : phone,
            city : city,
            quantity : quantity,
            orgType : orgType,
            reason : reason,
            mealType : mealType,
            confirmedDate : confirmedDate,
        });

        //Save method is used to create user
        //But before saving or inserting, password will hash.
        //Because of hashing.After hash, it will save to DB
        const created = await request.save();
        console.log(created);
        res.status(200).send("Request Sent");

    }catch(error){
        res.status(400).send(error);
    }
})
app.get('/requests/all',(req,res) =>{
    Request.find((err,data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(200).send(data);
        }
    })
})
//Logout Page
app.get('/logout', (req,res) =>{
    res.clearCookie("jwt",{path : '/'})
    res.status(200).send("User Logged Out")
})


// app.get('/request/Org/:orgName', async (req, res) => {
//     const { orgName } = req.params;
//     let donarList = [];
//     // console.log(orgName);
//     try {
//         const instDonList = await InstDonSchema.find({ orgName: orgName });
//         const resDonList = await ResDonSchema.find({ orgName: orgName });

        

//         // Check Whether the Data is Available
//         if(instDonList.length != 0 && resDonList.length != 0){
//             instDonList.forEach(element => {
//                 donarList.push(element);
//             });

//             resDonList.forEach(element => {
//                 donarList.push(element);
//             });

//         } else if(resDonList != 0 ){
//             resDonList.forEach(element => {
//                 donarList.push(element);
//             });
//         }else if(instDonList.length != 0){
//             instDonList.forEach(element => {
//                 donarList.push(element);
//             });
//         }else if(instDonList.length == 0  && resDonList.length == 0){
//             return res.status(404).json({error:'No such donation'})
//         }else{
//             return res.status(404).json({error:'No such donation'})
//         }

//       res.status(200).json(donarList)
//     } catch (error) {
//         console.log(error)
//     }
// });

//Authentication
app.get('/auth', authenticate, (req,res) => {

})

app.use("/api/calendar",require("./controllers/Calendar"));

//Run Server
app.listen(port,() =>{
    console.log("Server is listening");
})

// async function getDon() {
//     try{
//         const dons = await ReservedDonation.find().sort({_id:-1}).limit(1);
//        console.log(dons);
       
//     }catch(error){
//     console.log(error.message);
//     }
// }




