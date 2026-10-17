const Medicine = require("../models/medicines")
const Sale = require("../models/sale.model")

const createSale = async (req, res) => {
    try {
        const { barcode, quantity } = req.body;
        if (Number.isInteger(quantity) === false || typeof quantity !== "number" || quantity < 1) {
            return res.status(400).send({
                success: false,
                message: "Invalid quantity"
            })
        } else {
            const existingBarcode = await Medicine.findOne({ barcode: barcode })
            if (!existingBarcode) {
                return res.status(404).send({
                    success: false,
                    message: "Medicine not found",
                })
            } else {
                if (quantity > existingBarcode.stock) {
                    return res.status(409).send({
                        success: false,
                        message: "Stock is insufficient"
                    })
                } else {
                    const total = quantity * existingBarcode.price
                    const newSale = new Sale({
                        barcode: barcode,
                        quantity: quantity,
                        unitPrice: existingBarcode.price,
                        total: total
                    })
                    await newSale.save();
                    const updatedStock = existingBarcode.stock - quantity;
                    existingBarcode.stock = updatedStock
                    await existingBarcode.save();
                }

                return res.status(201).send({
                    success: true,
                    message: "Sale created successfully",
                    data: {
                        barcode: barcode,
                        quantity: quantity,
                        unitPrice: existingBarcode.price,
                        total: total,
                    }
                })
            }
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}

const cancelSale = async (req, res) => {
    try {
        const { saleId } = req.body;
        const matchId = Sale.findOne({_id: saleId})
        if(!matchId){
            return res.status(404).send({
                success:false,
                message: "Sale not found",
            })
        } else {
            
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}

module.exports = createSale