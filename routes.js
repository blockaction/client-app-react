const nextRoutes = require("next-routes");
const routes = (module.exports = nextRoutes());

routes.add("index", "/");

routes.add("peers", "/peers");
routes.add("attestations-details", "/attestations-details");
routes.add("all-validators", "/all-validators");
// routes.add("validator", "/validator/:key");
routes.add("pending-validators", "/pending-validators/:key");
// routes.add("epoch", "/epoch/:key");
// routes.add("slot", "/slot/:key");
routes.add("roi", "/reward");
routes.add("faqs", "/faqs");

