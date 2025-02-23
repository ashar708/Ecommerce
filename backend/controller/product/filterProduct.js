const productModel = require("../../models/productModel")

const filterProduct = async (req,res) => {
    try {
        const categoryList = req?.body?.category || [];
        const product = await productModel.find({
                category: {
                    "$in" : categoryList
                }
        })
        res.json({
            data: product,
            message: "Category list",
            error: false,
            success: true
        })
    } catch (error) {
        res.json({
            messsage: error.message || error,
            error: true,
            success: false
        })
    }
}

module.exports = filterProduct;