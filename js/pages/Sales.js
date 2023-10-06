
import { request } from "../utils/request.js";
import selectData from "../utils/selectData.js";

const URL = "./api/sales/";

let table =  (data) => {
    let rows = ``;
    for (const column of data) {
        let actions = `
            <button class="btn btn-warning btn-sm" title="Detalle" data-id="${column.id}">
                <i class="bi bi-list-columns"></i>
            </button>`;

        rows += `<tr>
            <td>${column.fecha}</td>
            <td nowrap>${actions}</td>
        </tr>`;
    }
    return `        
        <div class="table-responsive" style="overflow-x: auto;">
            <table class="table align-middle">
                <thead class="table-light">
                    <tr>
                        <th>Fecha</th>
                        <th>Detalle</th>
                    </tr>
                </thead>
                <tbody>
                ${
                    rows ? rows : `<tr> <td colspan="100%" class="text-center" >No se encontraron registros</td></tr>`
                }
                </tbody>
            </table>
        </div>`;
}

let listSales = async () => {
    
    let {data} = await fetch(`${URL}`).then(r => r.json());

    return `<div class="col-md-12">
        <h4 class="pb-2 ps-3">Ventas</h4>
        
        <div class="card">
            <div class="card-body" id="container-page">
                <div class="text-end mb-3">
                    <button id="page-add-new" class="btn btn-sm btn-success">
                        <i class="bi bi-plus-lg"></i> 
                        Nuevo
                    </button>
                </div>
                ${table(data)}
            </div>
        </div>
    </div>`;
} 

let listDetail = async (salesId) => {
    
    let {data} = await fetch(`./api/sales-detail/sales/${salesId}`).then(r => r.json());
    console.log(data);

    let rows = ``;
    let total = 0;
    for (const column of data) {
        total += parseFloat(column.subtotal);
        rows += `<tr>
            <td>${column.nombre_articulo}</td>
            <td>${column.cantidad}</td>
            <td>${column.subtotal}</td>
        </tr>`;
    }
    total = `<tr> 
            <th colspan="2" class="text-end" >TOTAL: </th>
            <th> ${total}</th>
        </tr>`

    return  `
        <button id="previus-page" class="btn btn-sm btn-outline-primary mb-4">
            <i class="bi bi-arrow-bar-left"></i> 
            Ventas
        </button>      
        <div class="table-responsive" style="overflow-x: auto;">
            <table class="table align-middle">
                <thead class="table-light">
                    <tr>
                        <th>Artículo</th>
                        <th>Cantidad</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                ${
                    rows ? (rows + total)  : `<tr> <td colspan="100%" class="text-center" >No se encontraron registros</td></tr>`
                }
                </tbody>
            </table>
        </div>`;

} 

let saleItems = async (ref = document, mainref) => {
    
    let {data} = await fetch(`./api/article`).then(r => r.json());
    console.log(data);

    

    let rows = ``;
    let total = 0;
    for (const [i, column] of data.entries()) {
        let actions = `
            <button class="btn btn-success btn-sm" title="Cart" data-id="${column.id}" data-index="${i}">
                <i class="bi bi-cart-plus"></i>
            </button>`;

        let cartIds = JSON.parse(localStorage.getItem("cart_ids"));

        rows += `<tr class="${ cartIds?.includes(column.id) ? "table-success" : ""}">
            <th>${column.nombre}</th>
            <td>${column.descripcion}</td>
            <td>${column.precio}</td>
            <td>${column.stock}</td>
            <td><input type="number" class="form-control" id="quantity${i}" value="1" name="descripcion" min="1" size="10" required></td>
            <td>${actions}</td>
        </tr>`;
    }

    let modal = `
        <!-- Button trigger modal -->
        <button type="button" class="btn btn-primary btn-lg rounded-4 px-3" data-bs-toggle="modal" data-bs-target="#staticBackdrop" style="visibility: hidden" id="cart-list">
            <i class="bi bi-cart-check-fill"></i>
        </button>

        <!-- Modal -->
        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="staticBackdropLabel">Artículos:</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="table-responsive" style="overflow-x: auto;">
                            <table class="table align-middle">
                                <tr>
                                    <th>Nombre</th>
                                    <th>Descripción</th>
                                    <th>Precio</th>
                                    <th>Cantidad</th>
                                </tr>
                                <tbody id="cart-modal-tbody">
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-sm btn-warning" data-bs-dismiss="modal">Cerrar</button>
                        <button type="button" class="btn btn-sm btn-primary px-sm-5" id="cart-modal-sale">Vender</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    ref.innerHTML =  `
        <div class="row">
            <div class="col-sm-4">
                <button id="previus-page" class="btn btn-sm btn-outline-primary mb-4">
                    <i class="bi bi-arrow-bar-left"></i> 
                    Ventas
                </button> 
            </div>
            <div class="col-sm-4 offset-sm-4 text-end">
                ${modal}
            </div>
        </div>   
        <div class="table-responsive" style="overflow-x: auto;">
            <table class="table align-middle">
                <tr>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th>Precio</th>
                    <th>Disponibles</th>
                    <th>Cantidad</th>
                    <th>Agregar</th>
                </tr>
                <tbody>
                ${
                    rows ? rows  : `<tr> <td colspan="100%" class="text-center" >No se encontraron registros</td></tr>`
                }
                </tbody>
            </table>
        </div>`;

    
    


    let buttons = ref.querySelectorAll("[title='Cart']");
    let cartButton = ref.querySelector("#cart-list");
    let modalBody = ref.querySelector("#cart-modal-tbody");

    let loadCart = (items = []) => {
        let itemsCart = items;
        if (items.length === 0) {
            let cart = localStorage.getItem("cart");
            cart = JSON.parse(cart);
            itemsCart = cart;
        }

        let rows = [];
        for (const item of itemsCart) {
            let tr = document.createElement("tr");

            let tdName = document.createElement("td")
            tdName.innerHTML = item.nombre;

            let tdDesc = document.createElement("td")
            tdDesc.innerHTML = item.descripcion;

            let tdPrice = document.createElement("td")
            tdPrice.innerHTML = item.precio;

            let tdQuantity = document.createElement("td")
            tdQuantity.innerHTML = item.cantidad;

            let tdBtn = document.createElement("td")
            let btn = document.createElement("button");
            btn.setAttribute("class", "btn btn-sm btn-danger")
            btn.innerHTML = `<i class="bi bi-trash3-fill"></i>`;
            tdBtn.appendChild(btn);

            
            tr.replaceChildren(tdName, tdDesc, tdPrice, tdQuantity, tdBtn);
            
            rows.push(tr);
            
            btn.addEventListener("click", () => {
                tr.remove();
                let cart = localStorage.getItem("cart");
                let cartIds = localStorage.getItem("cart_ids");
                cart = JSON.parse(cart);
                cartIds = JSON.parse(cartIds)
                let newCart  = cart.filter(article => article.id != item.id);
                let newCId  = cartIds.filter(id => id != item.id);

                localStorage.setItem("cart", JSON.stringify(newCart));
                localStorage.setItem("cart_ids", JSON.stringify(newCId));

                let rowArticle = document.querySelector(`[data-id="${item.id}"]`);
                rowArticle.parentElement.parentElement.removeAttribute("class");

            });
        }
        modalBody.replaceChildren(...rows);
    }

    if (localStorage.getItem("cart") && JSON.parse(localStorage.getItem("cart")).length != 0) {
        cartButton.style.visibility = "visible";
        loadCart()
    }

    buttons.forEach((button) => {
        button.addEventListener("click", async(e) => {
            let id  = button.dataset.index;
            console.log(data[id]);
            let cart = localStorage.getItem("cart");
            let cartId = [];
            if (cart && JSON.parse(cart).length != 0) {
                cart = JSON.parse(cart);
                cartId = JSON.parse(localStorage.getItem("cart_ids"));

            } else {
                cartButton.style.visibility = "visible";
                cart = [];
            }
            let quantity = parseInt(ref.querySelector(`#quantity${id}`).value);
            // let cartData = {nombre: data[id].nombre, descripcion:data[id].descripcion, precio: data[id].precio, cantidad: quantity | 1}
            data[id].cantidad = quantity;
            cart.push(data[id]);
            loadCart(cart);
            localStorage.setItem("cart", JSON.stringify(cart))

            cartId.push(data[id].id)
            localStorage.setItem("cart_ids", JSON.stringify(cartId))
            let row = button.parentNode.parentNode;
            row.setAttribute("class", "table-success")
            // row.remove();
        })
    });



    let saveCart = () => {
        let btn = document.querySelector("#cart-modal-sale");
        btn.addEventListener("click", async() => {
            let cartData = localStorage.getItem("cart");
            if (cartData) {
                cartData = JSON.parse(cartData);

                if (cartData.length > 0) {
                    let sale = await fetch(`./api/sales`, {
                        method: "POST"
                    }) .then(res => res.json());

                    for (const data of cartData) {
                        let body = new FormData();
                        body.append("cantidad", data.cantidad)
                        body.append("subtotal", (data.cantidad * data.precio))
                        body.append("ventas_id", sale.id)
                        body.append("articulos_id", data.id)
                        body.append("currentstock", data.stock)
                        await fetch(`./api/sales-detail`, {
                            method: "POST",
                            body
                        }) .then(res => res.json())
                    }

                    localStorage.removeItem("cart");
                    localStorage.removeItem("cart_ids");

                    let modal = bootstrap.Modal.getInstance(document.getElementById("staticBackdrop"));
                    if (modal) modal.hide();

                    Sales(mainref);
                }
            }
        })
    }

    saveCart()


} 


const Sales = async (ref = document) => {
    ref.innerHTML = await listSales()
    let container = ref.querySelector("#container-page");

    let btnDetail = ref.querySelectorAll("table tr td [title='Detalle']");
    btnDetail.forEach((button) => {
        button.addEventListener("click", async(e) => {
            let id  = button.dataset.id;
            container.innerHTML = await listDetail(id);
            let btnBack = container.querySelector("#previus-page");
            btnBack.addEventListener("click", () => {
                Sales(ref);
            })
        })
    });

    let button = ref.querySelector("#page-add-new");
    button.addEventListener("click", async() => {
        await saleItems(container, ref);
        let btnBack = container.querySelector("#previus-page");
            btnBack.addEventListener("click", () => {
                Sales(ref);
            })
        let form = container.querySelector("#form_new");
        // request(form,`${URL}`, ref, Categories);
    });
}

export default Sales;