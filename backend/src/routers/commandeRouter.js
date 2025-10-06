const commandecontroller = require("../controllers/commandecontroller");
const route = require("express").Router();

route.post("/searchCommande/:_id", commandecontroller.searchCommande);
route.put("/updateCommande/:_id", commandecontroller.updateCommande);
route.delete("/deleteCommande/:_id", commandecontroller.deleteCommande);
route.get("/findAllCommande", commandecontroller.findAllCommande);
route.post("/createCommande", commandecontroller.createCommande);

module.exports = route;
