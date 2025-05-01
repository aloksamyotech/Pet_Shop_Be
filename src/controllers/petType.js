import { PetTypeData, getPetTypeData, UpdatedPetType, deletedPetType } from '../services/petType.js';
import { errorCodes, Message, statusCodes } from '../core/common/constant.js';
import CustomError from '../utils/exception.js';

const CreatePetType = async (req, res, next) => {
  const AddItem = await PetTypeData(req);
  res.status(statusCodes?.ok).json({
    success: true,
    message: Message.Successfully
  });
};


const GetAddItem = async (req, res, next) => {
  const AddItem = await getPetTypeData();
  res.status(statusCodes?.ok).json({
    success: true,
    message: Message.FetchSuccessfully,
    data: AddItem
  });
};

const updateAddItem = async (req, res, next) => {
  const AddItem = await UpdatedPetType(req);
  res.status(statusCodes?.ok).json({
    success: true,
    message: Message?.successfullyUpdate,
    data: AddItem
  });
};

const deletedAddItemData = async (req, res, next) => {
  const addItem = await deletedPetType(req);
  res.status(statusCodes?.ok).json({
    success: true,
    message: Message.DeleteSuccessfully,
    data: addItem
  });
};



export default {
    deletedAddItemData,
    updateAddItem,
    GetAddItem,
    CreatePetType
};
