import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    shortDesc: {
      type: String,
      required: true,
    },
     ml: {
      type: String,
      required: true,
    },
     description: {
      type: String,
      required: true,
    },
       image1: {
      data: Buffer,
      contentType: String,
    },
       image2: {
      data: Buffer,
      contentType: String,
    },
       notesImage: {
      data: Buffer,
      contentType: String,
    },
       usageImage: {
      data: Buffer,
      contentType: String,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: mongoose.ObjectId,
      ref: "categories",
      required: true,
    },
  },
  { timestamps: true },
    { collection: 'products' },
);

export default mongoose.model("products", productSchema);