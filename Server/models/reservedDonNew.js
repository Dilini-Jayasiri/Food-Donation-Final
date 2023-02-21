const mongoose = require('mongoose');

const reservedDonationNewSchema = new mongoose.Schema({
    donorName : {
        type : String,
        required : true,    
    },
    phone : {
        type : String,
        required : true,   
    },
    donEmail : {
        type : String,
        required : true,
    },
    district : {
        type : String,
        required : true,
    },
    address : {
        type : String,
        required : true
    },
    prefferedArea : {
        type : String,
        required : true
    },
    date : {
        type : String,
        required : true
    },
    foodName : {
        type : String,
        required : true
    },
    quantity : {
        type : String,
        required : true
    },
    mealType : {
        type : String,
        required : true
    },
    foodType : {
        type : String,
        required : true
    },
    status : {
        type : String
    },
    user_id:{
        type:String,
       required:true
    }
 
},{timestamps:true})

//Create Model
const ReservedDonationNew = new mongoose.model("RESERVEDDONATIONNEW", reservedDonationNewSchema);

module.exports = ReservedDonationNew;

async function getDon() {
    try{
        const dons = await ReservedDonationNew.find().sort({_id:-1}).limit(1);
       console.log(dons);
       
    }catch(error){
    console.log(error.message);
    }
}
getDon();
//const getreserveddon = localStorage.getItem("newItem",getDon()) ;
