const express = require("express");
const {createMedicine, getAllMedicines} = require("../controllers/medicine.controller");
const {createSale, cancelSale} = require("../controllers/sale.controller")

const medRoute = express.Router();

medRoute.post("/new-medicine", createMedicine);
medRoute.get("/medicines", getAllMedicines)
medRoute.post("/sale", createSale)
medRoute.post("/sale/:saleId/cancel", cancelSale)

module.exports = medRoute;
