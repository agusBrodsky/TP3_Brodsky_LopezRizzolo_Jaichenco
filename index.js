import express from "express";
import PizzaService from "./services/PizzaService.js";

const app = express();
const port = 3000;
app.use(express.json());
app.get('/', (req,res) => {
    res.send('Hello World bro');
})

app.listen (port, () =>{
    console.log(`Escuchando puerto ${port}`);
})
//GET ALL
app.get('/pizza', async (req,res) => {
    let pizzas = await PizzaService.getAll();
    res.status(200).send(pizzas)
})
// GET BY ID
app.get('/pizza/:id', async (req,res) => {
    let pizzas = await PizzaService.getById(req.params.id);
    res.status(200).send(pizzas)
})
// INSERT
app.post('/pizza', async(req,res) =>{

    console.log("En post, req:", req)
    try{
        await PizzaService.insert(req.body)
        res.status(200).json({message : 'Pizza creada'});
    } catch (error){
        console.error(error);
        res.status(500).json({error:'Fallo el insert browli'});
    }
})
//UPDATE
app.put('/pizza',async (req,res) => {
    console.log("En update, req:", req)
    try{
        await PizzaService.update(req.body)
        res.status(200).json({message : 'Pizza actualizada'});
    } catch (error){
        console.error(error);
        res.status(500).json({error:'Fallo el insert browli'});
    }
})
//
app.delete ('/pizza/:id',async (req,res) => {
    console.log("En delete, req:", req)
    try{
        await PizzaService.deleteById(req.params.id)
        res.status(200).json({message : 'Pizza eliminada'});
    } catch (error){
        console.error(error);
        res.status(500).json({error:'Fallo el insert browli'});
    }
})


