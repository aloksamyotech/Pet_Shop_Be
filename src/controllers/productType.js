import { productData , getProductData,updateProductData,deleteProductData} from "../services/productType.js";
import { errorCodes, Message, statusCodes } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";


const product = async (req, res, next) => {
 
    const data = await productData(req); 
    res.status(statusCodes?.created).json({ 
      success: true,
      message: "ProductType  created successfully.",
      data 
    });
  
};


const getProducts = async (req, res, next) => {
  
    const products = await getProductData();

    res.status(statusCodes?.ok).json({ 
      success: true,
      message: "ProductTypes  fetched successfully.",
      data: products,
    });
 
};




const updateProducts  = async (req, res, next) =>{
  const products = await updateProductData(req);
res.status(statusCodes?.ok).json({ 
  success: true,
  message: "Product Data updated  successfully.",
  data: products,
});
 }



  const deleteProducts  = async (req, res, next) =>{
   const products = await deleteProductData(req);
  res.status(statusCodes?.ok).json({ 
    success: true,
    message: "Products  data delete  successfully.",
    data: products,
  });
   }

  export default {
  product,
  getProducts,
  updateProducts,
  deleteProducts
};
