import productModel from "../models/productModel.js";
import fs from "fs";
import slugify from "slugify";

export const createProductController = async (req, res) => {
  try {
    const { name,  shortDescription, price, category, amount ,ingredients,about, details } =
      req.fields;
    const { photo } = req.files;
     const { photo2 } = req.files;
      const { photo3 } = req.files;
    //validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !details:
        return res.status(500).send({ error: "details is Required" });
        case !about:
        return res.status(500).send({ error: "about is Required" });
        case !ingredients:
        return res.status(500).send({ error: "ingredients is Required" });
      case !shortDescription:
        return res.status(500).send({ error: "shortDescription is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !amount:
        return res.status(500).send({ error: "Amount/Quantity is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
            case photo2 && photo2.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo2 is Required and should be less then 1mb" });
          case photo3 && photo3.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo2 is Required and should be less then 1mb" });
    }

    const products = new productModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
     if (photo2) {
      products.photo2.data = fs.readFileSync(photo2.path);
      products.photo2.contentType = photo2.type;
    }
       if (photo3) {
      products.photo3.data = fs.readFileSync(photo3.path);
      products.photo3.contentType = photo3.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Created Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in creating product",
    });
  }
};

//get all products
export const getProductController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      .select("-photo2")
      .select("-photo3")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      countTotal: products.length, // Corrected property name
      message: "ALlProducts ",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting products",
      error: error.message,
    });
  }
};
// get single product
export const getSingleProductController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      success: true,
      message: "Single Product Fetched",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting single product",
      error,
    });
  }
};

// get photo
// export const productPhotoController = async (req, res) => {
//   try {
//     const product = await productModel.findById(req.params.pid).select("photo");
//     if (product.photo.data) {
//       res.set("Content-type", product.photo.contentType);
//       return res.status(200).send(product.photo.data);
//     } else {
//       // Handle the case where the product photo is null or the data is missing
//       res.status(404).send("Product photo not found");
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       message: "Error while getting photo",
//       error,
//     });
//   }
// };
// get photo
export const productPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo");
    if (!product) {
      return res.status(404).send("Product not found");
    }
    if (!product.photo || !product.photo.data) {
      return res.status(404).send("Product photo not found");
    }
    res.set("Content-type", product.photo.contentType);
    return res.status(200).send(product.photo.data);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting photo",
      error,
    });
  }
};
export const productPhotoController2 = async (req, res) => {
  try {
     const product = await productModel.findById(req.params.pid).select("photo2");
    if (!product) {
      return res.status(404).send("Product not found");
    }
    if (!product.photo2 || !product.photo2.data) {
      return res.status(404).send("Product photo2 not found");
    }
    res.set("Content-type", product.photo2.contentType);
    return res.status(200).send(product.photo2.data);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting photo",
      error,
    });
  }
};
export const productPhotoController3 = async (req, res) => {
  try {
     const product = await productModel.findById(req.params.pid).select("photo3");
    if (!product) {
      return res.status(404).send("Product not found");
    }
    if (!product.photo3 || !product.photo3.data) {
      return res.status(404).send("Product3 photo not found");
    }
    res.set("Content-type", product.photo3.contentType);
    return res.status(200).send(product.photo3.data);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting photo",
      error,
    });
  }
};

//delete controller
export const deleteProductController = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      success: true,
      message: "Product Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting product",
      error,
    });
  }
};

//update product
export const updateProductController = async (req, res) => {
  try {
    const { name,  shortDescription, price, category, amount, details, about, ingredients } =
      req.fields;
    const { photo } = req.files;
    const { photo2 } = req.files;
    const { photo3 } = req.files;
    //alidation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !details:
        return res.status(500).send({ error: "Description is Required" });
        case !about:
        return res.status(500).send({ error: "Description is Required" });
        case !ingredients:
        return res.status(500).send({ error: "Description is Required" });
      case !shortDescription:
        return res.status(500).send({ error: "shortDescription is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !amount:
        return res.status(500).send({ error: "Amount/Quantity is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
           case photo2 && photo2.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo2 is Required and should be less then 1mb" });
           case photo3 && photo3.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo3 is Required and should be less then 1mb" });
    }

    const products = await productModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
     if (photo2) {
      products.photo2.data = fs.readFileSync(photo2.path);
      products.photo2.contentType = photo2.type;
    }
     if (photo3) {
      products.photo3.data = fs.readFileSync(photo3.path);
      products.photo3.contentType = photo3.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Updated Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Update product",
    });
  }
};

// similar products
export const realtedProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await productModel
      .find({
        category: cid,
        _id: { $ne: pid },
      })
      .select("-photo")
      .limit(3)
      .populate("category");
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error while getting related product",
      error,
    });
  }
};




export const productsByCategoryController = async (req, res) => {
   try {
     const { categorySlug } = req.params;
     const page = parseInt(req.query.page) || 1;
    const limit = 10; // Define the number of products per page

    const skip = (page - 1) * limit;
     const products = await productModel.find({ category: categorySlug })
     .select('-photo1 -photo2') // Exclude photo1 and photo2 fields  
     .populate({
        path: 'category',
        select: 'name', 
      }).skip(skip)
      .limit(limit);
     res.status(200).send({
       success: true,
       message: "Products by Category",
       products,
       currentPage: page,
       totalPages: Math.ceil(products.length / limit),
     });
   } catch (error) {
     console.log(error);
     res.status(500).send({
       success: false,
      error,
      message: "Error while getting products by category",
     });
   }
 };