const productModel = require("../../models/productModel");

const searchProduct = async (req,res) => {
    try {
        const query = req.query.q;
        const regex = new RegExp(query,"i","g");

        const product = await productModel.find({
            "$or": [
                {
                    productName: regex
                },
                {
                    category: regex
                }
            ]
        })
        console.log(query);

        res.json({
            data: product,
            success: true,
            error: false,
            message: "Got products"
        })

    } catch (error) {
        res.json({
            message: error.message || error,
            success: false,
            error: true
        })
    }
}

module.exports = searchProduct;