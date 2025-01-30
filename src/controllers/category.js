import { categoryData, getCategoryData, updateCategoryData, deleteCategoryData } from "../services/category.js";
import { errorCodes, Message, statusCodes } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";


const category = async (req, res) => {

  const data = await categoryData(req);
  res.status(statusCodes?.created).json({
    success: true,
    message : Message.Successfully,
   data
  });

};


const getCategory = async (req, res, next) => {

  const category = await getCategoryData();
  res.status(statusCodes?.ok).json({ 
    success: true,
    message: Message.FetchSuccessfully,
    data: category,
  });

};





const updateCategory = async (req, res) => {
    const category = await updateCategoryData(req);
    res.status(statusCodes?.ok).json({
      success: true,
      message: Message?.successfullyUpdate,
      data: category,
    });
 
};

const deleteCategory = async (req, res) => {
    const category = await deleteCategoryData(req);
    res.status(statusCodes?.ok).json({
      success: true,
      message: Message.DeleteSuccessfully,
      data: category,
    });
};

export default {
  category,
  getCategory,
  updateCategory,
  deleteCategory,
};

