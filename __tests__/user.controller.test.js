// Importación falsa de la dependencia
const User = require('../models/user.model');
const {getAllUsers, createUser, loginUser} = require('../controllers/user.controller');
const { generateToken } = require('../middlewares/jwtGenerate');
// Mockeo de las depedendencias 
jest.mock('../models/user.model');
jest.mock('../middlewares/jwtGenerate');

describe('Pruebas unitarias controlador usuarios', ()=>{

    // Arrange
    let req;
    let res;
    let username;
    let password;
    let token;
    beforeEach(()=>{
        req = {params:{}, body:{}}
        res = { 
            status: jest.fn().mockReturnThis(), //Valor finito (primitivo - bool, number, string)
            json: jest.fn() // Valor complejo variable (no primitivo - objeto, array, Set)
        }
        username = 'test';
        password = 'test';
        token = 'token-generado-jwt';
    })

    describe('Tests de obtener los usuarios - GET USERS',()=> {
        it('Deberia obtener todos los usuarios', async ()=> {
            // Arrange
            let listUsers = [{username: 'test1', password: 'test1'}, 
                {username: 'test2', password: 'test2'}]
            User.find.mockResolvedValue(listUsers);
            // Act
            await getAllUsers(req,res);
            // Assert
            expect(User.find).toHaveBeenCalled(); // Verificación de que una función fue utilizada.
            expect(res.status).toHaveBeenCalledWith(200); // Verificación de que un valor si es el esperado.
            expect(res.json).toHaveBeenCalledWith({users: listUsers});
        })

        it('Deberia retornar un status 500 porque algo salió mal', async ()=>{
            // Arrange
            User.find.mockRejectedValue(new Error('DB Error'));
            // Act
            await getAllUsers(req,res);
            // Assert
            expect(User.find).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({msg: 'Ocurrió un error'});
        })
    })

    describe('Tests de crear un usuario - CREATE USER',()=>{
        it('Deberia crear un usuario', async ()=>{
            
            // Arrange
            req.body = {username, password};
            User.findOne.mockResolvedValue(null);
            User.prototype.save = jest.fn().mockResolvedValue(); // Verificación de que si se hizo el guardado
            
            // Act
            await createUser(req,res);

            // Assert
            expect(User.findOne).toHaveBeenCalledWith({username});
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                msg: `El usuario ${username} se creó correctamente.`
            })
        })

        it('Deberia fallar la conexión a la base de datos', async ()=>{
            // Arrange
            req.body = {username, password}
            User.findOne.mockRejectedValue(new Error('DB Error'));
            // Act
            await createUser(req,res);
            // Assert
            expect(User.findOne).toHaveBeenCalledWith({username})
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                msg: 'Ocurrió un error inesperado'
            })
        })

        it('Deberia obtener un error en caso que el usuario o contraseña esten vacios', ()=>{
           
            // Arrange

            // Act
            createUser(req,res);
            // Assert
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({msg: 'Por favor ingrese los campos de usuario y contraseña'})
        })

        it('Deberia encontrar un usuario existente en base de datos', async ()=>{
            // Arrange
            req.body = {username, password};
            User.findOne.mockResolvedValue({username,password});
            // Act
            await createUser(req,res);
            // Assert
            expect(User.findOne).toHaveBeenCalledWith({username});
            expect(res.status).toHaveBeenCalledWith(409);
            expect(res.json).toHaveBeenCalledWith({
                msg: `El usuario ${username} ya existe. Por favor intente con otro usuario.`
            }); 
        })
    })

    describe('Tests para logear un usuario - LOGIN USER', ()=>{
        it('Deberia ocurrir un error en caso de tener un usuario o contraseña', () => {
            // Arrange

            // Act
            loginUser(req,res);
            // Assert
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({msg: 'Por favor ingrese los campos de usuario y contraseña'})
        })

        it('Deberia logear el usuario correctamente', async ()=> {
            // Arrange
            req.body = {username,password};
            User.findOne.mockResolvedValue({username,password});
            generateToken.mockResolvedValue(token);
            // Act
            await loginUser(req,res);
            // Assert
            expect(User.findOne).toHaveBeenCalledWith({username});
            expect(generateToken).toHaveBeenCalledWith({username,password});
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                msg: `Bienvenido a la aplicación: ${username}`,
                token: token
            });
        })
    }) 

})