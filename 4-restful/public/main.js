const btn = document.querySelector('#btn')

btn.addEventListener('click', getData)

async function getData() {
    const result = await fetch('http://localhost:3000/api/pets')
    const data = await result.json()
    console.log(data.rows[0]);
    createDiv(data.rows)
}

function createDiv(arr) {
    console.log(arr);
    arr.forEach(elem => {
        const div = document.createElement('div');
        div.textContent = `Name: ${elem.name}    Type: ${elem.kind}`;
        document.body.appendChild(div);
    });
}
