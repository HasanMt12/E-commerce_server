import CheckoutModel from "../models/checkoutModel.js";

// Checkout and Payment Controller
export const checkoutController = async (req, res) => {
  try {
    const {
      username,
      userEmail,
      bKashNumber,
      transactionId,
      products,
      totalPrice,
      address,
      agreeToTerms
    } = req.body;

    // Validate required fields
    if (!username || !userEmail || !bKashNumber || !transactionId || !products || !address || !agreeToTerms) {
      return res.status(400).json({ error: "All fields are required for checkout" });
    }

    // Create a new checkout instance
    const checkout = new CheckoutModel({
      username,
      userEmail,
      bKashNumber,
      transactionId,
      products,
      totalPrice,
      address,
      agreeToTerms
    });

    // Save the checkout data to the database
    await checkout.save();

    res.status(201).json({
      success: true,
      message: "Checkout successful",
      checkout,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error during checkout",
      error: error.message,
    });
  }
};

// Get all payments (for admin)
export const getAllPaymentsController = async (req, res) => {
  try {
    const payments = await CheckoutModel.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "All payments",
      payments,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error while fetching payments",
      error: error.message,
    });
  }
};

// Get user's payment history
export const getUserPaymentsController = async (req, res) => {
  try {
    const { userEmail } = req.params;

    const userPayments = await CheckoutModel.find({ userEmail }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "User's payment history",
      userPayments,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error while fetching user's payment history",
      error: error.message,
    });
  }
};
