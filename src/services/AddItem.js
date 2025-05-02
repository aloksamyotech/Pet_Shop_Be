import { AddItemModelSchema } from "../models/AddItem.js";
import { errorCodes, Message, statusCodes, image_url } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";
import mongoose from "mongoose";
import customer from "../controllers/customer.js";

export const AddItemData = async (req) =>{


    const {name,description,price,customerId} = req.body;
    if(!name || !description || !price || !customerId){
         throw new CustomError(
              statusCodes?.badRequest,
              Message?.invalidInput,
              errorCodes?.invalid_input
            );
}

const ItemData = await AddItemModelSchema.create({name,description,price, customerId, isDelete: false})
return ItemData;
}


  export const getByIdAddItemData = async (req) => {
  
    const {id} = req.params;
 

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid customerId");
    }
  const items = await AddItemModelSchema.find({
      customerId:id,
      isDelete: false
    });
    return items;
   
  };
  
  



export const getAddItemData = async () =>{

    const condition_obj = {isDelete:false}

const ItemData = await AddItemModelSchema.aggregate([
    {$match :condition_obj}
    
]);
return ItemData;
}


export const UpdatedAddItem = async (req) =>{

const {id} = req.params;
const {name , description,price} = req.body;
const AddItem = await AddItemModelSchema.findById(id);

if(!AddItem){
    throw new CustomError(
        statusCodes?.notFound,
        Message?.notFound,
        errorCodes?.not_Found
      );
}

AddItem.name = name || AddItem.name;
AddItem.description = description || AddItem.description;
AddItem.price = price || AddItem.price


const UpdatedData = await AddItem.save();

return UpdatedData;
}


 export const deletedAddItem = async(req) =>{

    const {id} = req.params;
    if(!id){
          throw new CustomError(
              statusCodes?.badRequest,
             errorCodes?.invalid_input,
             Message?.notFound
            );

    }
    const findAddItem = await AddItemModelSchema.findByIdAndUpdate(id,{ isDelete: true })

    if(!findAddItem){
        throw new CustomError(
            statusCodes?.notFound, 
            Message?.notFound,
            errorCodes?.notFound
          )
    }
    
    return findAddItem;


 }