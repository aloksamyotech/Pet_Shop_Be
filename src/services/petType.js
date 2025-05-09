import { PetTypeModelSchema } from "../models/petType.js";
import { errorCodes, Message, statusCodes, image_url } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";
import mongoose from "mongoose";


export const PetTypeData = async (req) =>{


    const {name,description} = req.body;
    if(!name || !description ){
         throw new CustomError(
              statusCodes?.badRequest,
              Message?.invalidInput,
              errorCodes?.invalid_input
            );
}

const ItemData = await PetTypeModelSchema.create({name,description, isDelete: false})
return ItemData;
}


  
  
  



export const getPetTypeData = async () =>{

    const condition_obj = {isDelete:false}

const ItemData = await PetTypeModelSchema.aggregate([
    {$match :condition_obj},
    {
        $sort: {
          createdAt: -1
        }
      }
    
]);
return ItemData;
}


export const UpdatedPetType = async (req) =>{

const {id} = req.params;
const {name , description} = req.body;
const AddItem = await PetTypeModelSchema.findById(id);

if(!AddItem){
    throw new CustomError(
        statusCodes?.notFound,
        Message?.notFound,
        errorCodes?.not_Found
      );
}

AddItem.name = name || AddItem.name;
AddItem.description = description || AddItem.description;



const UpdatedData = await AddItem.save();

return UpdatedData;
}


 export const deletedPetType = async(req) =>{

    const {id} = req.params;
    if(!id){
          throw new CustomError(
              statusCodes?.badRequest,
             errorCodes?.invalid_input,
             Message?.notFound
            );

    }
    const findAddItem = await PetTypeModelSchema.findByIdAndUpdate(id,{ isDelete: true })

    if(!findAddItem){
        throw new CustomError(
            statusCodes?.notFound, 
            Message?.notFound,
            errorCodes?.notFound
          )
    }
    
    return findAddItem;


 }