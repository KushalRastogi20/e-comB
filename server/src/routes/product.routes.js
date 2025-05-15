import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
} from "../controllers/product.controller.js";

const router = Router();

// Create and Get All Products
router.route("/products")
  .post(createProduct)
  .get(getAllProducts);

// Get, Update, and Delete Single Product
router.route("/products/:id")
  .get(getSingleProduct)
  .put(updateProduct)      // for updating product
  .delete(deleteProduct);  // corrected from put() to delete()

export default router;
