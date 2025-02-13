
describe("Test de la calculadora", () => {

    // Arrange
    // Definir las variables que van a estar involucradas en el test
    let number1;
    let number2;
    let number3;

    // Usar el beforeEach para asignar valores a las variables que inicialicé en el paso anterior
    beforeEach( ()=>{
        number1 = 1;
        number2 = 2;
        number3 = 0;
    })
    
    it('Operación suma', ()=>{
        // Act
        let result = number1+number2;
        // Assert
        expect(result).toBe(3);
    })

    it('Hacer compra en la tienda', ()=>{
        // Arrange
        let plata = 10000;
        let precio_compra = 2000;
        // Act
        let resultado_compra = plata - precio_compra;
        // Assert
        expect(resultado_compra).toBe(8000);
    })

    it('Operacion multiplicacion', ()=>{
        // Act
        let result = number1 * number2;
        // Assert
        expect({resultado: result}).toEqual({resultado: result})
        expect(result).not.toBe(10)
    })

    it('Operacion división con error', ()=>{
        //Act
        let result = number1 / number3;
        // Assert
        expect(result).toBe(Infinity);
        expect(new Error('No se puede dividir por cero').message).toBe('No se puede dividir por cero');
    })

})