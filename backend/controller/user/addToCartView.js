const cartModel = require('../../models/cartModel');

const addToCartView = async (req,res) => {
    try {


        const currentUser = req.userId;
        const productView = await cartModel.find({userId: currentUser}).populate("productId");

        res.json({
            data: productView,
            success: true,
            error: false
        })


    } catch (error) {
        res.json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

module.exports = addToCartView;