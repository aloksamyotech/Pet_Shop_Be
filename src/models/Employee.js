import mongoose, { Schema } from "mongoose";

const EmployeeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    EId: {
      type: String,
      unique: true,
    },
    salary: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);


EmployeeSchema.pre("save", async function (next) {
    if (!this.EId) {
      try {
        const lastEmployee = await mongoose
          .model("Employee")
          .findOne({}, {}, { sort: { createdAt: -1 } });
  
        let nextEmployeeNumber = 1;
        if (lastEmployee && lastEmployee.EId) {
          const lastNumber = parseInt(lastEmployee.EId.split("-")[1], 10);
          if (!isNaN(lastNumber)) {
            nextEmployeeNumber = lastNumber + 1;
          }
        }
  
        this.EId = `EMD-${nextEmployeeNumber.toString().padStart(4, "0")}`;
        next();
      } catch (error) {
        next(error);
      }
    } else {
      next();
    }
  });
  

export const EmploySchemaModel = mongoose.model("Employee", EmployeeSchema);
