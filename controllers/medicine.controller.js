const Medicine = require("../models/medicine.model");

const createMedicine = async (req, res) => {
  
  try {
    const { name, barcode, price, stock } = req.body;
    const medInfo = new Medicine({
      name: name,
      barcode: barcode,
      price: price,
      stock: stock,
    });

    // Check if Medicine Exist
    const checkMed = await Medicine.findOne({ barcode: barcode });
    if (checkMed) {
      res
        .status(409)
        .send({ success: false, message: "Medicine already exist" });
    } else {
      const newMed = await medInfo.save();
      res.status(201).send({
        success: true,
        message: "New medicine added",
        data: newMed,
      });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getAllMedicines = async (req, res) => {
  try {
    const allMed = await Medicine.find();
    res.status(200).send({
      success:true,
      message: "All Medicines List",
      data: allMed,
    })
  } catch (error) {
    res.status(400).send(error.message)
  }  
}

const searchMedicine = async (req, res) => {
  const validBarcode = req.param
}

module.exports = { createMedicine, getAllMedicines };
