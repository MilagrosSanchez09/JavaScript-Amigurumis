
const Muñecos = [];
const cart = [];

//CREO LAS CARDS

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

//TRAIGO EL ARRAY DE PRODUCTOS
const getData = async () =>
{
    try{
        const response = await fetch('/data.json');
        const data = await response.json();
        loadProducts(data);
        Muñecos.push(...data);
    }
    catch(e)
    {
        console.log(e);
    }
}
getData()

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
    loadEvents();
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

            // Agrego una alerta al hacer click sobre el botón Agregar al carrito.
            swalSuccesCart = Swal.mixin({
                customClass: {
                  confirmButton: 'btn btn-success',
                  cancelButton: 'btn btn-danger'
                },
                buttonsStyling: false
              })
              
              swalSuccesCart.fire({
                position: 'top-center',
                icon: 'success',
                title: 'Se ha guardado con éxito en su carrito.',
                showConfirmButton: false,
                timer: 15000
                }
              )
            
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCart(cart);
        })
    }
}

const recoveryLocalStorage = () => {
    let recoveryCart = JSON.parse(localStorage.getItem("cart"));
    recoveryCart.forEach((Muñecos) => {
        cart.push(Muñecos);
    });
    updateCart(cart);
};

recoveryLocalStorage();

