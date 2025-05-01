import { AddItemData, getAddItemData, UpdatedAddItem, deletedAddItem, getByIdAddItemData } from '../services/AddItem.js';
import { errorCodes, Message, statusCodes } from '../core/common/constant.js';
import CustomError from '../utils/exception.js';

const CreateAddItem = async (req, res, next) => {
  const AddItem = await AddItemData(req);
  res.status(statusCodes?.created).json({
    success: true,
    message: Message.Successfully
  });
};

const foundByIdAddItem = async (req, res, next) => {
  const AddItem = await getByIdAddItemData(req);
  res.status(statusCodes?.ok).json({
    success: true,
    message: Message.FetchSuccessfully,
    data: AddItem
  });
};

const GetAddItem = async (req, res, next) => {
  const AddItem = await getAddItemData();
  res.status(statusCodes?.ok).json({
    success: true,
    message: Message.FetchSuccessfully,
    data: AddItem
  });
};

const updateAddItem = async (req, res, next) => {
  const AddItem = await UpdatedAddItem(req);
  res.status(statusCodes?.ok).json({
    success: true,
    message: Message?.successfullyUpdate,
    data: AddItem
  });
};

const deletedAddItemData = async (req, res, next) => {
  const addItem = await deletedAddItem(req);
  res.status(statusCodes?.ok).json({
    success: true,
    message: Message.DeleteSuccessfully,
    data: addItem
  });
};

const getAddItemsController = async (req, res,next) =>{

  const UserData = await getByIdAddItemData(req);
  res.status(statusCodes?.ok).json({ 
    success: true,
    message: Message.DeleteSuccessfully,
    data: UserData,
  });


}

export default {
  deletedAddItemData,
  updateAddItem,
  GetAddItem,
  CreateAddItem,
  foundByIdAddItem,
  getAddItemsController
};
