import { Schema, model, models } from "mongoose";

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "The Cattegoria title is required "],
      unique: true,
      trim: true,
      maxlength: [40, "title cannot be grater than 40 characters"],
    },
    price: {
        type: Number,
        required: [true, "The property 'price' is required "],
        trim: true,
      },
    image: {
        type: String,
        trim: true
    },
    stock: {
      type: Number,
      required: [true, "The property 'stock' is required "],
      trim: true
    },
    expires: {
      type: Date,
      required: [true, "The property 'expires' is required "],
      trim: true

    },
    laboratories: {
      type: [String],
      required : [true, "The property 'laboratories' is required "],
      trim: true
    },
    categoryId: {
        type: String,
        required: [true, "The property 'categoyId' is required "],
      },
    
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.Product || model("Product", ProductSchema);
