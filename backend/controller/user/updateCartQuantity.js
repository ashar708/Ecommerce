const cartModel = require('../../models/cartModel');

const updateCartQuantity = async (req,res) => {
    try {
        const currentUser = req.userId;
        const productId = req.body._id;
        const qty = req.body.quantity;

        const updateProduct = await cartModel.updateOne({_id:productId},{
            ...(qty && {quantity: qty})
        });

        res.json({
            message: "Updated quantity",
            error:false,
            success: true,
            data: updateProduct
        })


    } catch (error) {
        res.json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

module.exports = updateCartQuantity;