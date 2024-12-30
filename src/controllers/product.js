import { productData , getProductData,updateProductData,deleteProductData} from "../services/product.js";
import { statusCodes } from "../core/common/constant.js";


const product = async (req, res, next) => {
  try {
    const data = await productData(req); 
    res.status(statusCodes?.created).json({ 
      success: true,
      message: "Product created successfully.",
      data 
    });
  } catch (error) {
   console.log(error)
  }
};


const getProducts = async (req, res, next) => {
  try {
    const products = await getProductData();

    res.status(statusCodes?.ok).json({ 
      success: true,
      message: "Products fetched successfully.",
      data: products,
    });
  } catch (error) {
   
      new CustomError(
        statusCodes?.internalServerError,
        error.message || "Error fetching products.",
        errorCodes?.server_error || "SERVER_ERROR"
      )
    
  }
};




const updateProducts  = async (req, res, next) =>{
  try{  

const products = await updateProductData(req);
res.status(statusCodes?.ok).json({ 
  success: true,
  message: "Products updated  successfully.",
  data: products,
});
} 

catch(error){

  
  new CustomError(
    statusCodes?.internalServerError,
    error.message || "Error updating products.",
    errorCodes?.server_error || "SERVER_ERROR"
  )


}


  }



  const deleteProducts  = async (req, res, next) =>{
    try{  
  
  const products = await deleteProductData(req);
  res.status(statusCodes?.ok).json({ 
    success: true,
    message: "Products delete  successfully.",
    data: products,
  });
  } 
  
  catch(error){
  
    
    new CustomError(
      statusCodes?.internalServerError,
      error.message || "Error updating products.",
      errorCodes?.server_error || "SERVER_ERROR"
    )
  
  
  }
  
  
    }





export default {
  product,
  getProducts,
  updateProducts,
  deleteProducts
};
