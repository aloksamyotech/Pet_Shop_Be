import { PackageModelSchema } from "../models/package.js";
import { errorCodes, Message, statusCodes, image_url } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";



export const PackageData = async (req) =>{

    const {name,description,price} = req.body;
    if(!name || !description  || !price){
         throw new CustomError(
              statusCodes?.badRequest,
              Message?.invalidInput,
              errorCodes?.invalid_input
            );
}

const ItemData = await PackageModelSchema.create({name,description,price, isDelete: false})
return ItemData;
}


  
export const getPackageData = async () =>{

    const condition_obj = {isDelete:false}

const ItemData = await PackageModelSchema.aggregate([
    {$match :condition_obj},
    {
        $sort: {
          createdAt: -1
        }
      }
    
]);
return ItemData;
}


export const UpdatedPackage = async (req) =>{

const {id} = req.params;
const {name , description,price} = req.body;
const AddItem = await PackageModelSchema.findById(id);

if(!AddItem){
    throw new CustomError(
        statusCodes?.notFound,
        Message?.notFound,
        errorCodes?.not_Found
      );
}

AddItem.name = name || AddItem.name;
AddItem.description = description || AddItem.description;
AddItem.price = price || AddItem.price;



const UpdatedData = await AddItem.save();

return UpdatedData;
}


 export const deletedPackage = async(req) =>{

    const {id} = req.params;
    if(!id){
          throw new CustomError(
              statusCodes?.badRequest,
             errorCodes?.invalid_input,
             Message?.notFound
            );

    }
    const findAddItem = await PackageModelSchema.findByIdAndUpdate(id,{ isDelete: true })

    if(!findAddItem){
        throw new CustomError(
            statusCodes?.notFound, 
            Message?.notFound,
            errorCodes?.notFound
          )
    }
    
    return findAddItem;


 }