import express from "express";
import fs from "fs";

const PORT = 8000;

// let pets = undefined

// const start = () =>{
//     const app = express()
//     app.use(express.json())

//     pets = importPetsFromDatabase()

//     app.post("/pets", create)
//     app.get("/pets/:petIndex?", read)
//     app.use(send404)

//     app.listen(PORT, () => {
//         console.log(`Server is running on port ${PORT}`)
//     })
// }

// const importPetsFromDatabase = () => {
// const data = fs.readFileSync("./pets.json")
// return JSON.parse(data)
// }

// const updateDatabase = () => {
// fs.writeFileSync("./pets.json", JSON.stringify(pets))
// }

// const create = (req, res) => {
// const pet = req.body
// if ([pet.age, pet.kind, pet.name].includes(undefined)) {
//     res.status(500)
//     res.send("Failed.")
// } else {
//     pets.push(pet)
//     updateDatabase()
//     res.send("Success.")
// }
// }

// const read = (req, res) => {
// const { petIndex } = req.params
// if (petIndex === undefined) {
//     res.status(200)
//     res.json(pets)
// } else {
//     const index = parseInt(petIndex)
//     if (index >= 0 && index < pets.length) {
//         res.status(200)
//         res.json(pets[index])
//     } else {
//         res.send("Not Found.")
//     }
// }
// }

// const send404 = (req, res) => {
// res.status(404)
// res.send("404 Error - Page Not Found")
// }

// start()

// take a request that checks if request has test header

// forward if has the right header 

// forward to route and allow route to handle the error


app.use(function(req, res, next) {
    if(!req.headers.testheader) {
        next()
    } 
    req.headers.testheader = 999
    next()
})


app.get('/', function(req, res, next) {
    const number = req.headers.testheader
    if(number) {
        console.log(number)
        res.json({message: 'Authorized'})
    } else {
        next({message: 'Token not present', status: 401})
    }
})

app.get('/test', function(req, res) {
    res.json({message: 'Hit the /test route'})
})


app.use((err, req, res, next) => {
    res.status(err.status).json({err: err.message})
})


app.listen(PORT, function() {
    console.log(`Listening on port: ${PORT} for requests...`)
})

// // :id 
// // req.params.id