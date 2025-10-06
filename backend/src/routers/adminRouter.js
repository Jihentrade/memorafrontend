const adminController = require("../controllers/admincontroller");
const route = require("express").Router();
const { isAuth } = require("../middlewares/isAuth");

route.post("/createAdmin", adminController.createAdmin);
route.delete("/deleteAdmin/:_id", adminController.deleteAdmin);
route.put("/updateAdmin/:_id", adminController.updateAdmin);
route.post("/searchAdmin/:_id", adminController.searchAdmin);
route.post("/resetpassword", adminController.resetPassword);
route.post("/forgotpassword", adminController.forgotPassword);
route.get("/findAll", adminController.findAllAdmin);
route.put("/updateAdminPass", adminController.updatePass);
route.post('/resetpassword/:token', adminController.resetPassword)
module.exports = route;
