import mongoose,{Schema} from "mongoose"


const Registration = new Schema({
name:{
    type:String,
     trim: true
},

phone:{
    type:Number,
    required:true,},

email:{
    type:String,
    required:true,
    unique:true
},

petType:{
type: String,
   }
,
pacKage:{
    type: mongoose.Schema.Types.ObjectId,
    required:true
   },
gender:{
    type:String,
    enum:["male" , "female"]
},
petAge:{
    type:String,
    required:true
},
city:{
    type:String,
    required:true

},
service:{
    type:String,
    enum:["self","staff"]
},
pickupLocation:{
    type:String,
    default:"null"
},
size:{
    type:String,
    enum:["small","medium","large","extra-large"],
    required:true
},
startDate:{
    type:Date,
},

endDate:{
type:Date
},
status:{
type:String,
enum:["pending","approved","rejected"],
default:"pending"
},

customerID:{
type:String,
unique:true,
sparse: true,
},

isDelete  :{
    type : Boolean,
    default: false,
  } ,
  

},{
 timestamps:true   
})


export const RegistrationSchemaModel = mongoose.model("RegistrationModel",Registration)