import { RegistrationSchemaModel } from "../models/Registration.js";
import { errorCodes, Message, statusCodes,image_url } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";





export const RegistrationData =  async (req) =>{


    const {Name , phone,email,petType,breed,genderPet,petAge,city,service,size,startDate,endDate} = req?.body;

    const existingCustomer =  await RegistrationSchemaModel.findOne({email})

     if (existingCustomer) {
            throw new CustomError(
              statusCodes?.badRequest,
              errorCodes?.already_exist,
              Message?.alreadyExist,
            );
          }

    const createDate = await RegistrationSchemaModel.create({Name,phone,email,petType,breed,genderPet,petAge,city,service,size,startDate,endDate});

    return createDate;

}


export const FetchRegistrationData = async () =>{
    const condition_obj = { isDelete: false };
    const UserData = await RegistrationSchemaModel.aggregate([
        { $match: condition_obj},
    ]);
    
if(!UserData){
    throw new CustomError(
        statusCodes?.notFound,
        Message?.notFound ,
        errorCodes?.not_Found ,
      );
}
return UserData
}

export const UpdateRegistrationUser = async (req) =>{
    const {id} = req?.params;
    const  {Name , phone,email,petType,breed,genderPet,petAge,city,service,size,startDate,endDate} = req?.body
        const UserData = await RegistrationSchemaModel.findById(id);

    UserData.Name = Name || UserData.Name,
    UserData.phone = phone || UserData.phone,
    UserData.email = email || UserData.email,
    UserData.petType = petType || UserData.petType,
    UserData.breed = breed || UserData.breed,
    UserData.genderPet = genderPet || UserData.genderPet,
    UserData.petAge = petAge || UserData.petAge,
    UserData.city = city || UserData.city,
    UserData.service= service|| UserData.service,
    UserData.size = size || UserData.size,
    UserData.startDate = startDate || UserData.startDate,
    UserData.endDate = endDate || UserData.endDate

    const UpdatedUserData = await UserData.save();
    return UpdatedUserData




}

export const DeleteUserData =  async (req) =>{

const {id} = req.params;
const UserData = await RegistrationSchemaModel.findById(id);

if(!UserData){
    throw new CustomError(
                    statusCodes?.badRequest,
                    Message?.notFound ,
                    errorCodes?.invalid_input ,
                  );
}


const deleteUser = await RegistrationSchemaModel.findByIdAndUpdate(id,{isDelete:true});

    return deleteUser

}




export const statusUpdated = async (req) =>{

    const {id} = req?.params;
const {status} = req?.body;
    const UserData = await RegistrationSchemaModel.findById(id);

    if(!UserData){
        throw new CustomError(
            statusCodes?.notFound,
            Message?.notFound ,
            errorCodes?.not_Found ,
          );
    }

    UserData.status = status || UserData.status;
if(UserData.status == "approved")
{

    const datePart = new Date().toISOString().slice(0,10).replace(/-/g,"");
    const randomPart = Math.floor(1000 + Math.random() * 9000);
    UserData.customerID = `PET-${datePart}-${randomPart}`;
}



const UpdatedStatus = await UserData.save();

return UpdatedStatus;
}