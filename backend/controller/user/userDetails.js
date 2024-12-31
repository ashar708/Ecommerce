const userModel = require("../../models/userModel");

async function userDetailsController(req,res) {
    try {
        console.log("userId",req.userId);
        const userDetails = await userModel.findById(req.userId);
        console.log("user",userDetails);

        res.status(200).json({
            data: userDetails,
            error: false,
            success: true,
            message: "Getting user details"
        })




    } catch (error) {
        res.status(400).json({
            message: error.message || message,
            error: true,
            success: false
        })
    }
}

module.exports = userDetailsController;