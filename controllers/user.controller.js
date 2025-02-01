const User = require('./../models/user.model');

const getAllUsers = async (req,res) => {
    try {
        const users = await User.find();
        return res.status(200).json({users});
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg: 'Ocurrió un error'});
    }
}

module.exports = {
    getAllUsers
}