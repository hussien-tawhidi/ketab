import mongoose from "mongoose";

const { Schema } = mongoose;

const CartItemSchema = new Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  image: { type: [String], required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

const AddressSchema = new Schema({
  province: { type: String, required: true },
  city: { type: String, required: true },
  address: { type: String, required: true },
  houseNumber: { type: String, required: true },
  unit: { type: String },
  name: { type: String, required: true },
  phone: { type: String, required: true },
});

const OrderSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    address: { type: { AddressSchema }, required: true },
    selectedDelivery: { type: String, required: true },
    selectedPayment: { type: String, required: true },
    totalPrice: { type: Number, required: true },
    deliveryCost: { type: String, required: true },
    discountCode: { type: String },
    discountApplied: { type: Boolean, default: false },
    cartItems: { type: [CartItemSchema], required: true },
    status: { type: String, default: "pending" },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);

export default Order;
