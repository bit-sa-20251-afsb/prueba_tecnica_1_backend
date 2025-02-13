// Importación falsa de la dependencia
const User = require('../models/user.model');
const {getAllUsers} = require('../controllers/user.controller');

// Mockeo de las depedendencias 
jest.mock('../models/user.model');

describe('Pruebas unitarias controlador usuarios', ()=>{

    // Arrange
    let req;
    let res;
    beforeEach(()=>{
        req = {params:{}, body:{}}
        res = { 
            status: jest.fn().mockReturnThis(), //Valor finito (primitivo - bool, number, string)
            json: jest.fn() // Valor complejo variable (no primitivo - objeto, array, Set)
        }
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

})