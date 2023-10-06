
import { request } from "../utils/request.js";

const URL = "./api/category/";

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
            console.log(column);

        rows += `<tr>
            <td>${column.nombre}</td>
            <td>${column.descripcion}</td>
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
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody">
                ${
                    rows ? rows : `<tr> <td colspan="100%" class="text-center" >No se encontraron registros</td></tr>`
                }
                </tbody>
            </table>
        </div>`;
}

let listCategories = async () => {
    
    let {data} = await fetch(`${URL}`).then(r => r.json());

    return `<div class="col-md-12">
        <h4 class="pb-2 ps-3">Categorías</h4>
        
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

let newCategory = `
    <div class="card-body">
        <form class="row g-3" id="form_new">
            <div class="col-md-4">
                <label for="cat_name" class="form-label">Nombre</label>
                <input type="text" class="form-control" id="cat_name" name="nombre" required>
                <div class="invalid-feedback"> </div>
            </div>
            <div class="col-md-4">
                <label for="cat_description" class="form-label">Descripción</label>
                <input type="text" class="form-control" id="cat_description" name="descripcion" required>
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

let editCategory = async(id) => {
    let {data} = await fetch(`${URL}${id}`).then(r => r.json());

    return `
    <div class="card-body">
        <form class="row g-3" id="form_edit">

            <input type="hidden" name="_method" value="put">
        
            <div class="col-md-4">
                <label for="cat_name" class="form-label">Nombre</label>
                <input type="text" class="form-control" id="cat_name" value="${data.nombre}" name="nombre" required>
                <div class="invalid-feedback"> </div>
            </div>
            <div class="col-md-4">
                <label for="cat_description" class="form-label">Descripción</label>
                <input type="text" class="form-control" id="cat_description" value="${data.descripcion}" name="descripcion" required>
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

const Categories = async (ref = document) => {
    ref.innerHTML = await listCategories()
    let container = ref.querySelector("#container-page");


    let btnsEdit = ref.querySelectorAll("table tr td [title='Editar']");
    let btnsDelet = ref.querySelectorAll("table tr td [title='Eliminar']");
    btnsEdit.forEach((button) => {
        button.addEventListener("click", async(e) => {
            let id  = button.dataset.id;
            container.innerHTML = await editCategory(id);
            let form = container.querySelector("#form_edit");
            request(form,`${URL}${id}`, ref, Categories);
        })
    });
    btnsDelet.forEach((button) => {
        button.addEventListener("click", async(e) => {
            let id  = button.dataset.id;
            let status = await fetch(`${URL}${id}`, {method: 'DELETE'}).then(r => r.ok);
            if (status) {
                let row = button.parentNode.parentNode;
                row.remove();
            }
        })
    });

    let button = ref.querySelector("#page-add-new");
    button.addEventListener("click", () => {
        container.innerHTML = newCategory;
        let form = container.querySelector("#form_new");
        request(form,`${URL}`, ref, Categories);
    });
}

export default Categories;