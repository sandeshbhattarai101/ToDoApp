import User from "../Model/usermodel.js"


export const getUser= async(req, res) => {

    const user = await User.findById(req.user.id)

    res.status(200).json({
        message: "Current User data",
        user : user
    })

}