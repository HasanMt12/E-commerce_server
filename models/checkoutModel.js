import mongoose from "mongoose";

const checkoutSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  userEmail: {
    type: String,
    required: true
  },
  bKashNumber: {
    type: String,
    required: true
  },
  transactionId: {
    type: String,
    required: true,
    unique: true
  },
  agreeToTerms: {
    type: Boolean,
    default: false,
  },
  products: [
    {
      name: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true
      }
      // You can add more fields related to the product if needed
    }
  ],
  address: {
    type: String,
    required: true
  },
  totalPrice: {
    type: String,
    required: true,
  },
  shipped: {
      type: Boolean,
      default: false,
    },
},
 {
    collection: 'checkouts',
    timestamps: true, // Add the timestamps option here
  }
);

export default mongoose.model("Checkout", checkoutSchema);
