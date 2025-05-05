import mongoose, { Schema } from 'mongoose';

const PetType = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    isDelete: {
        type: Boolean,
        default: false
      }
   
  },
  { timestamps: true }
);

export const PetTypeModelSchema = mongoose.model('PetTypeModel', PetType);
