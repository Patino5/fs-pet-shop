// import express from 'express';
// import fs from 'fs';

// const PORT = 3000;
// const petDatabase = "./pets.json";
// const app = express();

// const petData = fs.readFileSync(petDatabase, 'utf8');
// const pets = JSON.parse(petData);

// app.use(express.json());

// app.get('/pets', (req, res) => {
// res.status(200).json(pets);
// });

// app.get('/pets/:id', (req, res) => {
//     const id = parseInt(req.params.id);
//     if (id >= 0 && id < pets.length) {
//         res.status(200).json(pets[id]);
//     } else {
//         res.status(404).send('Not Found');
//     }
// });

// app.post('/pets', (req, res) => {
// const pet = req.body;
// if ([pet.name, pet.kind, pet.age].includes(undefined)) {
//     res.status(400).send("Bad Request");
// }else{
//     pets.push(pet);
//     fs.writeFileSync('./pets.json', JSON.stringify(pets))
//     res.status(201).json(pet);
// }
// })

// app.put('/pets/:id', (req, res) => {
//     const updatedPetData = req.body;
//     const index = parseInt(req.params.id);
  
//     if (index >= 0 && index < pets.length) {
//       const updatedPet = pets[index];
  
//       if ([updatedPetData.name, updatedPetData.kind, updatedPetData.age].includes(undefined)) {
//         res.status(400).send("Bad Request");
//       } else {
//         updatedPet.name = updatedPetData.name;
//         updatedPet.kind = updatedPetData.kind;
//         updatedPet.age = updatedPetData.age;
  
//         fs.writeFileSync(petDatabase, JSON.stringify(pets));
  
//         res.status(200).json(updatedPet);
//       }
//     } else {
//       res.status(404).send("Pet not found");
//     }
//   });

//   app.delete('/pets/:id', (req, res) => {
//     const index = parseInt(req.params.id);
  
//     if (index >= 0 && index < pets.length) {
//       const deletedPet = pets.splice(index, 1);
//       fs.writeFileSync(petDatabase, JSON.stringify(pets));
//       res.status(200).json(deletedPet)
//   }else{
//     res.status(404).send("Pet not found")
//   }
// })
  
// app.use((req, res) => {
//     res.status(404).send('Bad Request');
// })

// app.listen(PORT, () => {
// console.log(`Listening on port: ${PORT}`)
// });

const express = require('express')
const pg = require('pg')
const app = express() 
const {Pool} = pg

const PORT = 3000

const pool = new Pool ({
  user: 'ryanpatino',
  database: 'petsdb',
  password: 'AirForce25%',
  host: 'localhost',
  port: 5432
})

// middlewares
app.use(express.static(__dirname + '/public'))
app.use(express.json())

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/public/index.html")
})

app.get('/api/pets', async (req, res) => {
  try {
    const {rows} = await pool.query(`SELECT * FROM pets;`)
    res.send({rows})
  } catch (error) {
    console.log(error)
    res.json(error)
  }
})

app.get('/api/pets/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const {rows} = await pool.query(`SELECT * FROM pets WHERE id = ${id};`)

    if(rows.length === 1) {
      res.status(200).json(rows)
    } else {
      res.status(404).send('Not Found')
    }
  } catch (error) {
    console.log(error)
    res.json(error)
  }
})

app.post('/api/pets', async (req, res) => {
  const pet = req.body;
  if ([pet.name, pet.kind, pet.age].includes(undefined)) {
    res.status(400).send('Bad Request');
  } else {
    try {
      const { rows } = await pool.query('INSERT INTO pets(name, kind, age) VALUES($1, $2, $3) RETURNING *', [
        pet.name,
        pet.kind,
        pet.age,
      ]);
      res.status(201).json(rows[0]);
    } catch (error) {
      res.status(500).send('Internal Server Error');
    }
  }
});

app.put('/api/pets/:id', async (req, res) => {
  const updatedPetData = req.body;
  const id = parseInt(req.params.id)

  if (id >= 0) {
    try {
      const {rows} = await pool.query('UPDATE pets SET name = $1, kind = $2, age = $3 WHERE id = $4 RETURNING *', [
        updatedPetData.name ,
        updatedPetData.kind,
        updatedPetData.age,
        id
      ] )
      if(rows.length === 1) {
        res.status(200).json(rows)
      } else {
        res.status(404).send('Not Found')
      }
    } catch (error) {
      res.status(500).send('Internal Server Error')
    }
  
  } else {
    res.status(400).send('Bad Request')
  }
})

app.delete('/api/pets/:id', async (req, res) =>{
  const id = parseInt(req.params.id)
  if (id >= 0){
  try {
    const {rows} = await pool.query('DELETE FROM pets WHERE id = $1 RETURNING *', [id])

    if(rows.length === 1) {
      res.status(200).json(rows)
    } else {
      res.status(404).send('Not Found')
    }
  } catch (error) {
    res.status(500).send('Internal Server Error')
  }
} else {
  res.status(404).send('Bad Request')
}
})


app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
})