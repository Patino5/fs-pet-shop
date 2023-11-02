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
        } else {
            console.log(`petData at Index:`, JSON.parse(data)[index]);
        }
    })
}