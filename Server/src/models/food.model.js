import mongoose from "mongoose"

const FoodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    enum: ["starter", "main", "dessert","veg","non-veg"],
  },
  image: {
    type: String,
    required: true
  },
  isAvailable: {
    type: Boolean,
    default: true
  }
},{timestamps: true});

export const Food = mongoose.model("Food", FoodSchema)
