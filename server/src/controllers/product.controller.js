import { asyncHandler } from "../utils/asyncHandler.js";
import { APIError } from "../utils/APIerror.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import  APIresponse  from "../utils/APIresponse.js";
import jwt from "jsonwebtoken";
import { Product } from "../models/product.model.js";
import mongoose from "mongoose";

// Create New Product Code Here captain

export const createProduct = asyncHandler(async (req, res) => {
  console.log("create product req hit");
  const { name, description, price, category } = req.body;
  console.log(name, description, price, category);
  if (!name || !description || !price || !category) {
    return res.status(400).json({
      success: false,
      message: "Please fill all the fields",
    });
  }
  const newProduct = await Product.create({
    name,
    description,
    price,
    category,
  });
  console.log("new product created", newProduct);
  return res.status(201).json({
    success: true,
    message: "Product created successfully",
    data: newProduct,
  });
});
// get all products code here captian
export const getAllProducts = asyncHandler(async (req, res) => {
  console.log("get product req hit");

    const category = req.query.category;
    const sortBy = req.query.sortBy || "createdAt";
    const sortOrder = req.query.sortOrder || "desc";
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip =(page -1)*limit;
    let sortOptions ={};
    if(sortBy){
      sortOptions[sortBy]=sortOrder === "asc" ? 1 : -1;
    }
    let filter ={};
    if(category){
      filter.category ={$regex:category ,$options:"i"}; 
    }
    const totalProducts = await Product.countDocuments(filter);
    if (totalProducts === 0) {
        return res.status(404).json({
            success: false,
            message: "No products found",
        });
      }
      const allProducts = await Product.find(filter).sort(sortOptions).skip(skip).limit(limit);
        console.log(allProducts);
        return res.status(200).json({
            success: true,
            message: "All products fetched successfully",
            data: allProducts,
            totalProducts,
            totalPages: Math.ceil(totalProducts / limit), 
        });
});

// get single product code here captain
export const getSingleProduct = asyncHandler (async(req,res)=>{
  console.log("get single product req hit");
  const {id} = req.params;
  console.log("id",id);  
  
  // if(!mongoose.Types.ObjectId.isValid(id)){
  //   return res.status(400).json({
  //     success:false,
  //     message:"Invalid product id",
  //   });
  // }
 const product = await Product.findById(id);
 console.log("product",product);
  if(!product){
    return res.status(404).json({
      success:false,
      message:"Product not found",
    });
  };
  return res.status(200).json({
    success:true,
    message:"Product fetched successfully",
    data:product,
  });
})
// delete product code here captain
export const deleteProduct = asyncHandler(async(req,res)=>{
  console.log("delete product req hit");
  const {id} = req.params;
  if(!mongoose.Types.ObjectId.isValid(id)){ 
    return res.status(400).json({
      success:false,
      message:"Invalid product id",
    });
  }
  const product = await Product.findById(id);
  if(!product){
    return res.status(404).json({
      success:false,
      message:"Product not found",
    });
  };
  await product.findByIdAndDelete();
  return res.status(200).json({
    success:true,
    message:"Product deleted successfully",
  });
})
// update product code here captain
export const updateProduct = asyncHandler(async(req,res)=>{
  console.log("update product req hit");  
   const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(400).json({
        success:false,
        message:"Invalid product id",
      });
    }
   const {name, description, price, category} = req.body;
    const product = await Product.findById(id);
    if(!product){
      return res.status(404).json({
        success:false,
        message:"Product not found",
      });
    }
    if(product.name !== name || product.description !== description || product.price !== price || product.category !== category){
      product.name = name;
      product.description = description;
      product.price = price;
      product.category = category;
      await product.save();
    }
    return res.status(200).json({
      success:true,
      message:"Product updated successfully",
      data:product,
    });

})