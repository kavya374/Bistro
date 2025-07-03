import orderModel from './../models/orderModel.js';
import userModel from './../models/userModel.js';
import Stripe from 'stripe';
import dotenv from 'dotenv';
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ✅ Placing user order
const placeOrder = async (req, res) => {
  try {
    console.log("🔥 Incoming place order request");
    console.log("✅ Authenticated userId:", req.userId);
    console.log("📦 Request body:", req.body);

    const { items, amount, address } = req.body;

    if (!req.userId || !items || !amount || !address) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields in request.",
      });
    }

    const newOrder = new orderModel({
      userId: req.userId,
      items,
      amount,
      address,
    });

    await newOrder.save();
    await userModel.findByIdAndUpdate(req.userId, { cartData: {} });

    const line_items = items.map((item) => ({
      price_data: {
        currency: "lkr",
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: "lkr",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 2 * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `http://localhost:5173/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `http://localhost:5173/verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
  console.error("💥 Error in placeOrder:", error.message);
  console.error("💥 Stack trace:", error.stack);
  return res.status(500).json({
    success: false,
    message: error.message || "Error placing order",
  });
}

};

// ✅ Verifying Stripe order
const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;

  try {
    if (success === 'true') {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      return res.json({ success: true, message: "Order payment confirmed" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      return res.json({ success: false, message: "Payment failed, order deleted" });
    }
  } catch (error) {
    console.error("💥 Error in verifyOrder:", error);
    res.status(500).json({ success: false, message: "Error verifying payment" });
  }
};

// ✅ Fetch user orders
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.error("💥 Error in userOrders:", error);
    res.status(500).json({ success: false, message: "Error fetching orders" });
  }
};

// ✅ Admin: list all orders
const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, data: orders });
  } catch (error) {
    console.error("💥 Error in listOrders:", error);
    res.status(500).json({ success: false, message: "Error listing orders" });
  }
};

// ✅ Admin: update order status
const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
    res.json({ success: true, message: "Status updated" });
  } catch (error) {
    console.error("💥 Error in updateStatus:", error);
    res.status(500).json({ success: false, message: "Error updating status" });
  }
};

export {
  placeOrder,
  verifyOrder,
  userOrders,
  listOrders,
  updateStatus,
};
