import mongoose, { Schema } from 'mongoose';

const AddItem = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    customerId: mongoose.Schema.Types.ObjectId,
    
    isDelete: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

export const AddItemModelSchema = mongoose.model('AddItemModel', AddItem);
