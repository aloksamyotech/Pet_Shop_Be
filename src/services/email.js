import { SettingsSchemaModel } from "../models/email.js";


export const getEmailSettings = async () => {
  let settings = await SettingsSchemaModel.findOne();
  if (!settings) {
    settings = await SettingsSchemaModel.create({});
  }
  return settings;
};

export const updateEmailSettings = async (req) => {
  const { login, order, customerAdd, purchase } = req.body;

  let settings = await SettingsSchemaModel.findOne();

   if (!settings) {
    settings = new SettingsSchemaModel({});
  }


  

  if (login !== undefined) settings.login = login;
  if (order !== undefined) settings.order = order;
  if (customerAdd !== undefined) settings.customerAdd = customerAdd;
  if (purchase !== undefined) settings.purchase = purchase;

  await settings.save();
  return settings;
};
