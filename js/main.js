const Muñecos = 
[
    //Productos
    {
        id: 101,
        name: 'Anna',
        price: '5000',
        size: '25',
        description: 'Princesa Anna, de la película "Frozen".',
        image: './assets/img/anna.jpg', 
    },
    {
        id: 102,
        name: 'Ariel',
        price: '5000',
        size: '25',
        description: 'Princesa Ariel, de la película "The Little Marmaid".',
        image: './assets/img/ariel.jpg',
    },
    {
        id: 103,
        name: 'Aurora',
        price: '5000',
        size: '25',
        description: 'Princesa Aurora, de la película "Sleeping Beauty".',
        image: './assets/img/aurora.jpg',
    },
    {
        id: 104,
        name: 'Belle',
        price: '5000',
        size: '25',
        description: 'Princesa Belle, de la película "Beauty and the Beast".',
        image: './assets/img/belle.jpg',
    },
    {
        id: 105,
        name: 'Moana',
        price: '5000',
        size: '25',
        description: 'Princesa Moana, de la película "Moana".',
        image: './assets/img/moana.jpg',
    },
    {
        id: 106,
        name: 'Mulan',
        price: '5000',
        size: '25',
        description: 'Princesa Mulan, de la película "Mulan".',
        image: './assets/img/mulan.jpg',
    },
    {
        id: 107,
        name: 'Pocahontas',
        price: '5000',
        size: '25',
        description: 'Princesa Pocahontas, de la película "Pocahontas".',
        image: './assets/img/pocahontas.jpg',
    },
    {
        id: 108,
        name: 'Rapunzel',
        price: '5000',
        size: '25',
        description: 'Princesa Rapunzel, de la película "Tangled".',
        image: './assets/img/rapunzel.jpg',
    },
    {
        id: 109,
        name: 'Snow White',
        price: '5000',
        size: '25',
        description: 'Princesa Snow White, de la película "Snow White and the Seven Dwarfs".',
        image: './assets/img/snowwhite.jpg',
    },
    {
        id: 110,
        name: 'Jasmine',
        price: '5000',
        size: '25',
        description: 'Princesa Jasmine, de la película "Aladdin".',
        image: './assets/img/jasmine.jpg',
    },
]

const cart = [];

const updateCart = (cart) =>
{
    let cartContainer = document.querySelector('#cart');

    let container = document.getElementById("cartContainer");
    if(container)
    {
        container.parentNode.removeChild(container);
    }
    let div = document.createElement('div');
    div.setAttribute('id','cartContainer');

//CARRITO DE COMPRAS
    div.innerHTML += ` <h2>Carrito de compras</h2>`;
    for (const product of cart)
    {
        div.innerHTML += `
            <div class="cart-item">
                <h4>Producto: ${product.name}</h4>
                <h4>Precio: $${product.price}</h4>
                <h4>Tamaño: ${product.size} cm</h4>
                <h4>Cantidad: ${product.quantity}</h4>
            </div>
        `;
    }

    cartContainer.appendChild(div);
}


const loadEvents = () =>
{
    let buttons = document.querySelectorAll('.button');
    for (const button of buttons) 
    {
        button.addEventListener('click', ()=>{

            let found = cart.find(element => element.id == button.id);
            if(found)
            {
                // Está en el carrito
                found.quantity++;
            }
            else
            {
                let product = Muñecos.find(element => element.id == button.id);
                if(product)
                {
//AGREGO EL ELEMENTO DE CANTIDAD DE PRODUCTOS SELECCIONADOS
                    let newProduct = {
                        id:product.id,
                        name: product.name,
                        price: product.price,
                        description: product.description,
                        image: product.image,
                        size: product.size,
                        quantity: 1
                    }
                    cart.push(newProduct);
                }
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCart(cart);
        })
    }
}

//Creo las cards

const loadProducts = (Muñecos) =>
{
    let container = document.querySelector('#container');
    for (const product of Muñecos)
    {
        let div = document.createElement('div');
        div.setAttribute('class', 'card');
        div.innerHTML = `
            <img src="${product.image}" alt="${product.description}">
            <h3>$${product.price}</h3>
            <h4>${product.name}</h4>
            <h4>${product.size} cm</h4>
            <button class="button" id="${product.id}">Agregar al carrito</button>
        `;
        container.appendChild(div);
    }
    loadEvents();
}

loadProducts(Muñecos);

const recoveryLocalStorage = () => {
    let recoveryCart = JSON.parse(localStorage.getItem("cart"));
    recoveryCart.forEach((Muñecos) => {
        cart.push(Muñecos);
    });
    updateCart(cart);
};

recoveryLocalStorage();
