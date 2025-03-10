import mongoose, { Schema } from "mongoose";

const settingsSchema = new Schema({
  login: { type: Boolean, default: true },
  order: { type: Boolean, default: true },
  customerAdd: { type: Boolean, default: true }, 
  purchase: { type: Boolean, default: true },
});

export const SettingsSchemaModel = mongoose.model("Settings", settingsSchema);
