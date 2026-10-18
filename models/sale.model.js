const mongoose = require("mongoose")

const saleSchema = new mongoose.Schema({
    barcode: {
        type: String,
        required: true,

    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
    },
    unitPrice: {
        type: Number,
        required: true,
        min: 0,
    },
    total: {
        type: Number,
        required: true,
        min: 0,
    },
        status: {
        type: String,
        enum: ["completed", "cancelled"],
        default: "completed",
    },
})

const SaleMed = mongoose.model("SaleRecord", saleSchema)

module.exports = SaleMed
