const mongoose = require("mongoose");
const Medicine = require("../models/medicine.model");
const Sale = require("../models/sale.model");

const createSale = async (req, res) => {
  try {
    const { barcode, quantity } = req.body;
    if (
      Number.isInteger(quantity) === false ||
      typeof quantity !== "number" ||
      quantity < 1
    ) {
      return res.status(400).send({
        success: false,
        message: "Invalid quantity",
      });
    } else {
      const existingBarcode = await Medicine.findOne({ barcode: barcode });
      if (!existingBarcode) {
        return res.status(404).send({
          success: false,
          message: "Medicine not found",
        });
      } else {
        if (quantity > existingBarcode.stock) {
          return res.status(409).send({
            success: false,
            message: "Stock is insufficient",
          });
        } else {
          const total = quantity * existingBarcode.price;
          const newSale = new Sale({
            barcode: barcode,
            quantity: quantity,
            unitPrice: existingBarcode.price,
            total: total,
          });
          await newSale.save();
          const updatedStock = existingBarcode.stock - quantity;
          existingBarcode.stock = updatedStock;
          await existingBarcode.save();

          return res.status(201).send({
            success: true,
            message: "Sale created successfully",
            data: {
              barcode,
              quantity,
              unitPrice: existingBarcode.price,
              total,
              pendingStock: updatedStock,
            },
          });
        }
      }
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const cancelSale = async (req, res) => {
  try {
    const saleId = req.params.saleId;
    if (!mongoose.Types.ObjectId.isValid(saleId)) {
      return res.status(400).send({
        success: false,
        message: "Invalid sale ID",
      });
    } else {
      const existingSale = await Sale.findById(saleId);
      if (!existingSale) {
        return res.status(404).send({
          success: false,
          message: "Sale record not found",
        });
      } else {
        if (existingSale.status === "cancelled") {
          return res.status(409).send({
            success: false,
            message: "Sale already cancelled",
          });
        } else {
        //   console.log("Sale ID:", existingSale?._id);
        //   console.log("Sale Status:", existingSale?.status);
          const existingMed = await Medicine.findOne({
            barcode: existingSale.barcode,
          });
          if (!existingMed) {
            return res.status(404).send({
              success: false,
              message: "Medicine not found",
            });
          } else {
            existingMed.stock = existingSale.quantity + existingMed.stock;
            await existingMed.save();

            existingSale.status = "cancelled";
            await existingSale.save();

            return res.status(200).send({
              success: true,
              message: "Sale record has been cancelled and stock updated",
              data: {
                saleId: existingSale._id,
                status: existingSale.status,
                restoredQuantity: existingSale.quantity,
                updatedStock: existingMed.stock,
              },
            });
          }
        }
      }
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { createSale, cancelSale };
