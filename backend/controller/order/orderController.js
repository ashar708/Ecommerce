const orderModel = require("../../models/orderModel");

const orderController = async (req,res) => {
    try {
       const userId = req.userId;
       const orderList = await orderModel.find({userId: userId}).sort({createdAt: -1});

       res.json({
        data: orderList,
        message: "Order list",
        success: true,
        error: false
       })
    } catch (error) {
        res.status(500).json({
            messsage: error.message || error,
            error: true,
            success: false
        })
    }
}

module.exports = orderController;