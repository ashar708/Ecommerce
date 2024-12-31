const cartModel = require("../../models/cartModel");

const countProducts = async (req,res) => {
    try {
        const userId = req.userId;
        const count = await cartModel.countDocuments({userId: userId});

        res.json({
            data: count,
            error: false,
            success: true,
        message: "Items counted"        })

    } catch (error) {
        res.json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

module.exports = countProducts;