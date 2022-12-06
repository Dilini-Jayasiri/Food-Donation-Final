const mongoose = require('mongoose');

const reservedDonationSchema = new mongoose.Schema({
    id : {
        type : String,
        
        
    },
    // donationType : {
    //     type : String,
    //     required: true,
        
    // },
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
    address : {
        type : String,
        required : true
    },
    orgName : {
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
    mealType : {
        type : String,
        required : true
    },
    
    

   
})

//Create Model
const ReservedDonation = new mongoose.model("RESERVEDDONATION", reservedDonationSchema);

module.exports = ReservedDonation;

async function getDon() {
    try{
        const dons = await ReservedDonation.find().sort({_id:-1}).limit(1);
        console.log(dons);
    }catch(error){
    console.log(error.message);
    }
}
getDon();
//const getreserveddon = localStorage.getItem("newItem",getDon()) ;
