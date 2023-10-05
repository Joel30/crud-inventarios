
import { request } from "../utils/request.js";
import selectData from "../utils/selectData.js";

const URL = "./api/article/";

let table =  (data) => {
    let rows = ``;
    for (const column of data) {
        let actions = `
            <button class="btn btn-warning btn-sm" title="Editar" data-id="${column.id}">
                <i class="bi bi-pencil-square"></i>
            </button>
            <button class="btn btn-danger btn-sm" title="Eliminar" data-id="${column.id}">
                <i class="bi bi-trash3-fill"></i>
            </button>`;

        rows += `<tr>
            <td>${column.nombre}</td>
            <td>${column.descripcion}</td>
            <td>${column.precio}</td>
            <td>${column.nombre_almacen}</td>
            <td>${column.nombre_categoria}</td>
            <td nowrap>${actions}</td>
        </tr>`;
    }
    return `        
        <div class="table-responsive" style="overflow-x: auto;">
            <table class="table align-middle">
                <thead class="table-light">
                    <tr>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Precio</th>
                        <th>Almacen</th>
                        <th>Categoría</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody id="list_category">
                ${
                    rows ? rows : `<tr> <td colspan="100%" class="text-center" >No se encontraron registros</td></tr>`
                }
                </tbody>
            </table>
        </div>`;
}

let listArticles = async () => {
    
    let {data} = await fetch(`${URL}`).then(r => r.json());

    return `<div class="col-md-12">
        <h4 class="pb-2 ps-3">Artículos</h4>
        
        <div class="card">
            <div class="card-body" id="container-books">
                <div class="text-end mb-3">
                    <button id="book-add-new" class="btn btn-sm btn-success">
                        <i class="bi bi-plus-lg"></i> 
                        Nuevo
                    </button>
                </div>
                ${table(data)}
            </div>
        </div>
    </div>`;
} 

let newArticle = async() => `
    <div class="card-body">
        <form class="row g-3" id="form_new">
            <div class="col-md-4">
                <label for="art_name" class="form-label">Nombre</label>
                <input type="text" class="form-control" id="art_name" name="nombre" required>
                <div class="invalid-feedback"> </div>
            </div>
            <div class="col-md-4">
                <label for="art_description" class="form-label">Descripción</label>
                <input type="text" class="form-control" id="art_description" name="descripcion" required>
                <div class="invalid-feedback"> </div>
            </div>
            <div class="col-md-4">
                <label for="art_price" class="form-label">Precio</label>
                <input type="number" step="any" class="form-control" id="art_price" name="precio" required>
                <div class="invalid-feedback"> </div>
            </div>
            <div class="col-md-4">
                <label for="art_wh_id" class="form-label">Almacen</label>
                <select id="art_wh_id" class="form-select" name="almacen_id">
                    ${
                        await selectData(`./api/warehouse/available`, {id: "id", name:"nombre"})
                    }
                </select>
                <div class="invalid-feedback"> </div>
            </div>
            <div class="col-md-4">
                <label for="art_cat_id" class="form-label">Categoría</label>
                <select id="art_cat_id" class="form-select" name="categoria_id">
                    ${
                        await selectData(`./api/category/available`, {id: "id", name:"nombre"})
                    }
                </select>
                <div class="invalid-feedback"> </div>
            </div>

            <div class="col-12 text-center">
                <div class="row justify-content-center">
                    <div class="col-12 col-md-4">
                        <div class="d-grid mx-5 mx-md-0">
                            <button class="btn btn-primary" type="submit">Agregar</button>
                        </div>
                    </div>
                    <div class="col-md-auto pt-2 pt-md-0">
                        <div class="d-grid gap-2 mx-5 mx-md-0">
                            <a id="form-cancel" class="btn btn-secondary px-1 px-md-4">Cancelar</a>
                        </div>
                    </div>
                </div>
            </div>
        </form>

    </div>`;

let editArticle = async(id) => {
    let {data} = await fetch(`${URL}${id}`).then(r => r.json());
 
    return `
    <div class="card-body">
        <form class="row g-3" id="form_edit">

            <input type="hidden" name="_method" value="put">
        
            <div class="col-md-4">
                <label for="art_name" class="form-label">Nombre</label>
                <input type="text" class="form-control" id="art_name" value="${data.nombre}" name="nombre" required>
                <div class="invalid-feedback"> </div>
            </div>
            <div class="col-md-4">
                <label for="art_description" class="form-label">Descripción</label>
                <input type="text" class="form-control" id="art_description" value="${data.descripcion}" name="descripcion" required>
                <div class="invalid-feedback"> </div>
            </div>
            <div class="col-md-4">
                <label for="art_price" class="form-label">Precio</label>
                <input type="number" step="any" class="form-control" id="art_price" value="${data.precio}" name="precio" required>
                <div class="invalid-feedback"> </div>
            </div>
            <div class="col-md-4">
                <label for="art_wh_id" class="form-label">Almacen</label>
                <select id="art_wh_id" class="form-select" name="almacen_id">
                    ${
                        await selectData(`./api/warehouse/available`, {id: "id", name:"nombre"}, data.almacen_id)
                    }
                </select>
                <div class="invalid-feedback"> </div>
            </div>
            <div class="col-md-4">
                <label for="art_cat_id" class="form-label">Categoría</label>
                <select id="art_cat_id" class="form-select" name="categoria_id">
                    ${
                        await selectData(`./api/category/available`, {id: "id", name:"nombre"}, data.categoria_id)
                    }
                </select>
                <div class="invalid-feedback"> </div>
            </div>

            <div class="col-12 text-center">
                <div class="row justify-content-center">
                    <div class="col-12 col-md-4">
                        <div class="d-grid mx-5 mx-md-0">
                            <button class="btn btn-warning" type="submit">Actualizar</button>
                        </div>
                    </div>
                    <div class="col-md-auto pt-2 pt-md-0">
                        <div class="d-grid gap-2 mx-5 mx-md-0">
                            <a id="form-cancel" class="btn btn-secondary px-1 px-md-4">Cancelar</a>
                        </div>
                    </div>
                </div>
            </div>
        </form>

    </div>`;
}

const Articles = async (ref = document) => {
    ref.innerHTML = await listArticles()
    let container = ref.querySelector("#container-books");


    let btnsEdit = ref.querySelectorAll("table tr td [title='Editar']");
    let btnsDelet = ref.querySelectorAll("table tr td [title='Eliminar']");
    btnsEdit.forEach((button) => {
        button.addEventListener("click", async(e) => {
            let id  = button.dataset.id;
            container.innerHTML = await editArticle(id);
            let form = container.querySelector("#form_edit");
            let a = request(form,`${URL}${id}`, {ref, insertPageBook: Articles});
        })
    });
    btnsDelet.forEach((button) => {
        button.addEventListener("click", async(e) => {
            let id  = button.dataset.id;
            let status = await fetch(`${URL}${id}`, {method: 'DELETE'}).then(r => {console.log(r); return r.ok;});
            if (status) {
                var row = button.parentNode.parentNode;
                row.remove();
            }
        })
    });

    let button = ref.querySelector("#book-add-new");
    button.addEventListener("click", async() => {
        container.innerHTML = await newArticle();
        let form = container.querySelector("#form_new");
        request(form,`${URL}`, {ref, insertPageBook: Articles});
    });
}

export default Articles;