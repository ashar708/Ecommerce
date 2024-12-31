const cartModel = require("../../models/cartModel");

const deleteCartItem = async (req,res) => {
    try {
        const currentUser = req.userId;
        const product = req.body._id;

        const deleteItems = await cartModel.deleteOne({_id: product});

        res.json({
            message: "Product deleted from cart",
            error: false,
            success: true,
            data: deleteItems
        })



    } catch (error) {
        res.json({
            message: error.message || message,
            error: false,
            error: true
        })
    }
}

module.exports = deleteCartItem;