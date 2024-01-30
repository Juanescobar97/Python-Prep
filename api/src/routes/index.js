const { Router } = require('express');
const axios = require('axios');
const {Pokemon} = require('../models/Pokemon')
const { Type } = require('../db');
const { sequelize } = require('../db');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/pokemons', async (req, res) =>{
    try{
        let response = await axios.get('https://pokeapi.co/api/v2/pokemon/')
        let pokemons = response.data
        res.json(pokemons)
    } catch {
        console.error(error);
        res.status(500).send('Error al cargar Pokemons')
    }
});

router.get('/pokemons/:id', async (req,res)=>{
    const  {id} = req.params;

    try{
        let response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        let pokemon = response.data;
        res.json(pokemon);
    } catch (error) {
        console.error(error);
        res.status(500).json({error:"No hay Pokemons con ese ID"})
    }
});

router.get('/pokemons/name', async(req,res) =>{
    const name= req.query

    try{
        let response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
        let  result = response.data
        res.json(result)
    } catch (error) {
        console.error(error);
        res.status(500).json({error:"No existe un Pokemon con ese nombre"})
    }
});

router.post('/pokemons', async(req,res) => {
    const {name, types} = req.body
    try{
        let newPoke = await Pokemon.create({name});

        await newPoke.setTypes(types);

        res.status(201).json(newPoke)
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Error al crear Pokemon's"})
    }
});

router.get('/types', async (req, res) => {
    try {
      const typesInDB = await Type.findAll();
  
      if (typesInDB.length === 0) {
        const response = await axios.get('https://pokeapi.co/api/v2/type');
        const typesFromAPI = response.data.results;
  
        for (const type of typesFromAPI) {
          await Type.create({ name: type.name });
        }
      }
  
      const allTypes = await Type.findAll();
      res.json(allTypes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error en el servidor', details: error.message });
    }
  });

module.exports = router;
