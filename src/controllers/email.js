import { getEmailSettings, updateEmailSettings } from "../services/email.js";


const fetchEmailSettings = async (req, res) => {
  try {
    const settings = await getEmailSettings();
    res.status(200).json({ success: true, data: settings });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


const modifyEmailSettings = async (req, res) => {
  try {
    const settings = await updateEmailSettings(req);
    res.status(200).json({ success: true, message: "Settings updated", data: settings });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update settings" });
  }
};


export default {
    fetchEmailSettings,
    modifyEmailSettings
  };
  
