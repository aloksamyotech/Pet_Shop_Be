import { productData , getProductData,updateProductData,deleteProductData,productBulk,getTotalProducts} from "../services/product.js";
import { errorCodes, Message, statusCodes } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";



const totalProducts = async (req, res) => {
  
    const total = await getTotalProducts();
    res.status(200).json({
      success: true,
      message: "Total products fetched successfully",
      totalProducts: total
    });
 
};



const product = async (req, res) => {
  
 
    const data = await productData(req); 

   
    res.status(statusCodes?.created).json({ 
      success: true,
      message : Message.Successfully,
      data 
    });

  };


  const products = async (req,res) =>{

const bulkProduct =  await productBulk(req);

res.status(statusCodes?.created).json({ 
  success: true,
  message : Message.Successfully,
  data : bulkProduct
});




  }


const getProducts = async (req, res, next) => {
  const products = await getProductData();
    res.status(statusCodes?.ok).json({ 
      success: true,
      message: Message.FetchSuccessfully,
      data: products,
    });
};




const updateProducts  = async (req, res, next) =>{
 const products = await updateProductData(req);
res.status(statusCodes?.ok).json({ 
  success: true,
  message: Message.successfullyUpdate,
  data: products,
});
  }



  const deleteProducts  = async (req, res, next) =>{
   const products = await deleteProductData(req);
  res.status(statusCodes?.ok).json({ 
    success: true,
    message: Message.DeleteSuccessfully,
    data: products,
  });
   }





export default {
  product,
  getProducts,
  updateProducts,
  deleteProducts,
  products,
  totalProducts
 
};
