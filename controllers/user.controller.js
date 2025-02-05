const User = require('./../models/user.model');
const {generateToken} = require('./../middlewares/jwtGenerate');

const getAllUsers = async (req,res) => {
    try {
        const users = await User.find();
        return res.status(200).json({users});
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg: 'Ocurrió un error'});
    }
}

const createUser = async (req,res) =>{ 
    const {username, password} = req.body;
    if(!username || !password){
        return res.status(400).json({msg: 'Por favor ingrese los campos de usuario y contraseña'})
    }
    try {
        const user = await User.findOne({username});
        if(user){
            return res.status(409).json({
                msg: `El usuario ${username} ya existe. Por favor intente con otro usuario.`
            })
        }

        const dbUser = new User({
            username: username,
            password: password,
        });

        await dbUser.save();

        return res.status(200).json({
            msg: `El usuario ${username} se creó correctamente.`
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Ocurrió un error inesperado'
        });
    }
}

const loginUser = async (req,res) =>{
    const {username, password} = req.body;
    if(!username || !password){
        return res.status(400).json({msg: 'Por favor ingrese los campos de usuario y contraseña'})
    };
    try {
        const dbUser = await User.findOne({username});
        if(!dbUser){
            return res.status(400).json({
                msg: `El usuario ${username} NO EXISTE`
            })
        }

        if(password !== dbUser.password){
            return res.status(409).json({
                msg: `La contraseña del usuario ${username} no coincide`
            })
        }

        const token = await generateToken({username, password});

        return res.status(200).json({
            msg: `Bienvenido a la aplicación: ${username}`,
            token: token
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Ocurrió un error inesperado'
        })
    }

}

module.exports = {
    getAllUsers,
    createUser,
    loginUser
}