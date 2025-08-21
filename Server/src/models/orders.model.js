import mongoose from "mongoose"

const OrderSchema = new mongoose.Schema({
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  items:[
    {
      foodId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Food",
        required: true
      },
      quantity:{
        type: Number,
        required: true,
        min: 1
      },
      price:{
        type: Number,
        required: true,
        min: 0
      }
    }
  ],
  totalAmount:{
    type: Number,
    required: true,
    min: 0
  },
  status:{
    type: String,
    enum: ["pending", "confirmed", "preparing", "delivered", "cancelled"],
    default: "pending"
  },
  paymentMethod:{
    type: String,
    enum: ["COD", "Online"],
    required: true
  },
  deliveryAddress:{
    street:{
      type: String,
      required: true
    },
    city:{
      type: String,
      required: true
    },
    state:{
      type: String,
      required: true
    },
    postalCode:{
      type: String,
      required: true
    },
    landmark:{
      type: String,
      required: true
    }
  }
},{timestamps:true})

export default mongoose.model("Order", OrderSchema)
