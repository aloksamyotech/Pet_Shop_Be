import mongoose,{Schema} from "mongoose"


const Registration = new Schema({
Name:{
    type:String,
    
    trim: true
},

phone:{
    type:Number,
    required:true,

},

email:{
    type:String,
    required:true,
    unique:true
},

petType:{

    type: String,
    enum:['cat' , 'dogs','small pet']
}
,
breed:{
    type:String,
    required:true
},
genderPet:{
    type:String,
    enum:["male" , "female"]
},
petAge:{
    type:Number,
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
size:{
    type:Number,
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
enum:["pending","approved"],
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