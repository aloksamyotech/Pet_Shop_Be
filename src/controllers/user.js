import * as userService from "../services/user.js";

const userRegistration = async (req, res) => {
  const userData = await userService.registerUser(req);
  res.status(201).send(userData);
};

const userLogin = async (req, res) => {
  const data = await userService.loginUser(req);
res
    .cookie("accessToken", data.accessToken, {
      httpOnly: true, 
      secure: process.env.ENV === "production",
      sameSite: "Lax",
      path: "/",
    })
    .cookie("refreshToken", data.refreshToken, {
      httpOnly: true,
      secure: process.env.ENV === "production",
      sameSite: "Lax",
      path: "/",
    })
    .status(200)
    .json({
      user: data.loginUser, 
      accessToken: data.accessToken, 
    });
};

const updateUserController = async (req, res) => {
  try {
    const { id } = req.params; 
    const updatedUser = await userService.updateUser(id, req.body);
    
    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal server error",
      errorCode: error.errorCode || "server_error"
    });
  }
};
export default { userRegistration, userLogin ,updateUserController};
