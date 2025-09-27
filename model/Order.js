import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    customer: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
    },

    address: {
      province: { type: String, required: true },
      city: { type: String, required: true },
      plack: { type: String, required: true },
      postCode: { type: String, required: true },
      fullAddress: { type: String, required: true }, // kooche, khiaban, etc.
    },

    items: [
      {
        book: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Book", // 🔗 connect to Book model
          required: true,
        },
        quantity: { type: Number, default: 1, min: 1 },
        unitPrice: { type: Number, required: true }, // snapshot of price at time of order
      },
    ],

    total: { type: Number, required: true },
    totalDiscount: { type: Number, default: 0 },

    paymentMethod: { type: String, default: "cod" }, // cod, online, etc.
    status: { type: String, default: "pending" }, // pending, paid, shipped, delivered
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
