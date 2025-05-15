import { Router } from "express";
import { createProduct, deleteProduct, getAllProducts, getSingleProduct, updateProduct } from "../controllers/product.controller.js";

const router = Router();

router.route("/products").post(createProduct)
router.route("/products").get(getAllProducts)
router.route("/products/:id").get(getSingleProduct)
router.route("/products/:id").put(deleteProduct)    