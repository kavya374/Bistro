import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  address: { type: Object, required: true },
  items: { type: Array, required: true },
  amount: { type: Number, required: true },
  status: { type: String, default: 'pending' },
  payment: { type: Boolean, default: false }, // ✅ Added
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);
