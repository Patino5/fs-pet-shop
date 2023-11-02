import fs from 'fs';
import process from 'process';

let petData = [];

// console.log(process.argv);

const dbPath = `../pets.json`

if(process.argv.length <= 2) {
    console.log(`Usage: node fs.js [read | create | update | destroy]`)
    process.exit(1)
} else {
    const dbCommand = process.argv[2]
    const args = process.argv.slice(2)
    switch(dbCommand){
        case 'read':
            showPets(args[1])
            break;
        case 'create':
            createPet(args[1], args[2], args[3])
            break;
    }
}

function showPets(index){
    fs.readFile(dbPath, 'utf8', (error, data) => {
        if (error){
            console.log(`Error reading file`, error)
            process.exit(9)
        } else if (index === undefined){
        petData = JSON.parse(data)
        console.log(`petData`, petData);
        } else if (0 > index || petData.length <= index){
            console.log(`petData at Index:`, JSON.parse(data)[index]);
        } else {
            console.log(`Usage: node fs.js read INDEX`)
        }
    })
}

function createPet(petAge, petKind, petName){
    if([petAge,petKind, petName].includes(undefined)) {
        console.log(`Usage: node ./js.js create <age> <kind> <name>`)
        process.exit(9)
    }
    fs.readFile(dbPath, 'utf8', (error, data) => {
        if (error) {
            console.log(`Error reading file`, error)
            process.exit(9)
        }
        petData = JSON.parse(data)
        petData[petData.length] =  {
            age: Number(petAge),
            kind: petKind,
            name: petName
        }

        console.log(petData)
        fs.writeFile(dbPath, JSON.stringify(petData),
        (error) => {
            if(error){
                console.error(`Usage: node fs.js read INDEX`)//Usage: node fs.js read INDEX
                process.exit(9);
            }
            console.log('file write success')
        })
    })
}