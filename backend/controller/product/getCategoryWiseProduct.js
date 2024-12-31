const productModel = require("../../models/productModel");

const getCategoryWiseProduct = async (req,res) => {
    try {
        const {category} = req?.body || req?.query; 

        console.log("category-aarya",category);
        const product = await productModel.find({category});


        res.json({
            data: product,
            message: "Product",
            success: true,
            error: false
        })

    } catch (error) {
        res.status(400).json({
            message: error.message || message,
            error: true,
            success: false
        })
    }
}

module.exports = getCategoryWiseProduct;