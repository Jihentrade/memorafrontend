const clientController = require("../controllers/clientcontroller");
const route = require("express").Router();

route.post("/createClient", clientController.createClient);
route.put("/updateClient/:_id", clientController.updateClient);
route.post("/searchClient/:_id", clientController.searchClient);
route.delete("/deleteClient/:clientId", clientController.deleteClient);
route.get("/findAll", clientController.findAllClients);
route.get("/getClient/:clientId", clientController.getClient);
route.post("/sendDevis", clientController.sendDevis);

module.exports = route;
