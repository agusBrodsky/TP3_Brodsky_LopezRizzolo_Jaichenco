
import config from '../dbconfig.js'
import sql from 'mssql';

class PizzaService {
    static getAll = async () => {
        let returnEntity = null;
        console.log('Estoy en: PizzaService.GetAll');
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .query('SELECT * FROM Pizzas');
            returnEntity = result.recordsets[0];
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }
    static getById = async (id) => {
        {
            let returnEntity = null;
            //console.log(`Estoy en: PizzaService.GetById ${id}`);
            try {
                let pool = await sql.connect(config);
                let result = await pool.request()
                    .input('pId', sql.Int, id)
                    .query('SELECT * FROM Pizzas WHERE id = @pId');
                returnEntity = result.recordsets[0][0];
            } catch (error) {
                console.log(error);
            }
            return returnEntity;

        }
    }

    static insert = async(pizza) =>{
            let rowsAffected = 0;
            console.log('Estoy en: PizzaService.insert(pizza)');
            try{
                let pool = await sql.connect(config);
                let result = await pool.request()
                    .input('pNombre',pizza.Nombre)
                    .input('pLibreGluten',pizza.LibreGluten)
                    .input('pImporte',pizza.Importe)
                    .input('pDescripcion',pizza.Descripcion)
                    .query('INSERT INTO Pizzas (Nombre, LibreGluten, Importe , Descripcion) VALUES (@pNombre, @pLibreGluten, @pImporte, @pDescripcion)');
                rowsAffected = result.rowsAffected;
            } catch (error) {
                console.log(error)
            }
            return rowsAffected;
            } 
    
    static update = async (pizza) => {
        let rowsAffected = 0;
        const{Id,Nombre,LibreGluten,Importe,Descripcion} = pizza;
           
            console.log('Estoy en: PizzaService.update(pizza)');
            try{
                let pool = await sql.connect(config);
                let result = await pool.request()
                    .input('pId', Id)
                    .input('pNombre',Nombre)
                    .input('pLibreGluten',LibreGluten)
                    .input('pImporte',Importe)
                    .input('pDescripcion',Descripcion)

                    .query('UPDATE Pizzas SET Nombre = @pNombre , LibreGluten= @pLibreGluten, Importe = @pImporte, Descripcion = @pDescripcion WHERE id = @pId;');
                rowsAffected = result.rowsAffected;
            } catch (error) {
                console.log(error)
            }
            return rowsAffected;
            }
        
            static deleteById = async (id) => {
            let rowsAffected = 0;
            console.log('Estoy en: PizzaService.deleteById(id)');
            try {
                let pool = await sql.connect(config);
                let result = await pool.request()
                    .input('pId', sql.Int, id)
                    .query('DELETE FROM Pizzas WHERE id = @pId');
                rowsAffected = result.rowsAffected;
            } catch (error) {
                console.log(error)
            }
            return rowsAffected;

        }


    }
    export default PizzaService;
