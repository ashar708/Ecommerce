const userModel = require("../../models/userModel");


async function updateUsers(req,res) {
    try {
        const sessionUser = req.userId;
        const {userId,role,email,name} = req.body;


        const payload = {
            ...(role , {role: role}),
            ...(email , {email: email}),
            ...(name , {name: name}),
        }

        const user = await userModel.findById(sessionUser);

        console.log("user-role",user.role);

        const updateUser = await userModel.findByIdAndUpdate(userId,payload);

        res.json({
            data: updateUser,
            role: role,
            message: "User updated",
            success: true,
            error: false,
        })

    } catch (error) {
        res.status(400).json({
            message: error.message || message,
            error: true,
            success: false
        })
    }
}

module.exports = updateUsers;