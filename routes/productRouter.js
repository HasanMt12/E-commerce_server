import express from "express";
import {
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productPhotoController,
  updateProductController,
  realtedProductController,
  productPhotoController2,
  productPhotoController3

} from "../controllers/productController.js";
// import { productsByCategoryController } from "../controllers/productController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";

const router = express.Router();

//routes
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);
//routes
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

//get products
router.get("/get-product", getProductController);

//single product
router.get("/get-product/:slug", getSingleProductController);

//get photo
router.get("/product-photo/:pid", productPhotoController);
//get photo
router.get("/product-photo2/:pid", productPhotoController2);
router.get("/product-photo3/:pid", productPhotoController3);

//delete rproduct
router.delete("/delete-product/:pid", deleteProductController);

//similar product
router.get("/related-product/:pid/:cid", realtedProductController);

export default router;