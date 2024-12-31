const userModel = require("../../models/userModel");
const bcrypt = require('bcryptjs');

async function userSignUpController (req,res) {
    try {
        const {email,password,name} = req.body;
        const user = await userModel.findOne({email});
        if(user){
            throw new Error("A user exists with the same email");
        }
        if(!email){
            throw new Error("Please provide a new email");
        }
        if(!password){
            throw new Error("Please provide a new password");
        }
        if(!name){
            throw new Error("Please provide a new name");
        }


        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);

        if(!hashPassword){
            throw new Error("Something is wrong");
        }

        const payload = {
            ...req.body,
            role: "GENERAL",
            password: hashPassword
        }

        const userData = new userModel(payload);
        const saveUser = await userData.save();

        res.status(201).json({
            data: saveUser,
            success: true,
            error: false,
            message: "User created successfully"
        })

    } catch (error) {
        res.json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

module.exports = userSignUpController;