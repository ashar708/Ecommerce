const cartModel = require("../../models/cartModel");

const addToCart = async (req,res) => {
    try {
        const {productId} = req.body;
        const currentUser = req.userId;

        const productAvailable = await cartModel.findOne({
            productId, userId: currentUser
        })

        console.log("productAvailable",productAvailable);

        if(productAvailable){
            return res.json({
                message: "Already exists in the Cart",
                success: false,
                error: true
            })
        }

        

        const payload = {
            productId: productId,
            quantity: 1,
            userId: currentUser
        }

        const newAddToCart = new cartModel(payload);

        const saveProduct = await newAddToCart.save();

        return res.json({
            data: saveProduct,
            message:"Product added",
            success: true,
            error: false
        })

    } catch (error) {
        res.json({
            message: error?.message || error,
            success: false,
            error: true
        })
    }
}

module.exports = addToCart;