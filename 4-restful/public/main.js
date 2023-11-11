const btn = document.querySelector('#btn')

btn.addEventListener('click', getData)

async function getData() {
    const result = await fetch('http://localhost:3000/api/pets')
    const data = await result.json()
    
    createDiv(data.rows)
}

function createDiv(arr) {
    console.table(arr);
    arr.forEach(elem => {
        const div = document.createElement('div');
        div.textContent = 'Name  |  Type  ';
        div.style.padding = '2rem 0 0 2rem'
        div.style.borderBottom = '.2rem solid navy'

        const p = document.createElement('p');
        p.textContent = `${elem.name}  ${elem.kind}`
        p.style.paddingLeft =  '2rem'
        p.style.marginBottom = '0'

        document.body.appendChild(div);
        document.body.appendChild(p);
    });
}
