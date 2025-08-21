import mongoose from "mongoose"

const ReviewSchema = new mongoose.Schema({
  foodId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Food",
    required: true
  },
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  rating:{
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment:{
    type: String,
    required: true,
    minlength: 5,
    maxlength: 500
  }
},{timestamps:true})

export const Review = mongoose.model("Review", ReviewSchema)
