import mongoose from "mongoose"

const PaymentSchema = new mongoose.Schema({
  orderId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true
  },
  paymentId:{
    type: String,
    required: true
  },
  amount:{
    type: Number,
    required: true,
    min: 0
  },
  status:{
    type: String,
    enum: ["pending", "success", "failed"],
    default: "pending"
  },
  method:{
    type: String,
    enum: ["card", "UPI", "COD", "wallet"],
    required: true
  }
},{timestamps:true})

export const Payment = mongoose.model("Payment", PaymentSchema)
