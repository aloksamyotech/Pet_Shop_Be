import { PackageData, getPackageData, UpdatedPackage, deletedPackage} from '../services/package.js';
import { errorCodes, Message, statusCodes } from '../core/common/constant.js';
import CustomError from '../utils/exception.js';

const CreatePackage = async (req, res, next) => {
  const AddItem = await PackageData(req);
  res.status(statusCodes?.ok).json({
    success: true,
    message: Message.Successfully
  });
};


const GetPackage= async (req, res, next) => {
  const AddItem = await getPackageData();
  res.status(statusCodes?.ok).json({
    success: true,
    message: Message.FetchSuccessfully,
    data: AddItem
  });
};

const updatePackage = async (req, res, next) => {
  const AddItem = await UpdatedPackage(req);
  res.status(statusCodes?.ok).json({
    success: true,
    message: Message?.successfullyUpdate,
    data: AddItem
  });
};

const deletedPackageData = async (req, res, next) => {
  const addItem = await deletedPackage(req);
  res.status(statusCodes?.ok).json({
    success: true,
    message: Message.DeleteSuccessfully,
    data: addItem
  });
};



export default {
    deletedPackageData,
    updatePackage,
    GetPackage ,
    CreatePackage
};
