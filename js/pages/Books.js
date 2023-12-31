
import Table from "../components/Table.js";
import { request } from "../utils/request.js";

let container = document.createElement("div");





let Books = async () => {
    
    let {data} = await fetch("./api/books").then(r => r.json());

    return `<div class="col-md-12">
        <h4 class="pb-2 ps-3">Libros</h4>
        
        <div class="card">
            <div class="card-body" id="container-books">
                <div class="text-end mb-3">
                    <button id="book-add-new" class="btn btn-sm btn-success">
                        <i class="bi bi-plus-lg"></i> 
                        Nuevo
                    </button>
                </div>
                ${Table("", data)}
            </div>
        </div>
    </div>`;
} 

let newBook = `
    <div class="card-body">
        <form class="row g-3" id="form_new">
            <div class="col-md-4">
                <label for="book_category" class="form-label">Categoría</label>
                <input type="text" class="form-control" id="book_category" name="category" required>
                <div class="invalid-feedback"> </div>
            </div>
            <div class="col-md-4">
                <label for="book_title" class="form-label">Título</label>
                <input type="text" class="form-control" id="book_title" name="title" required>
                <div class="invalid-feedback"> </div>
            </div>
            <div class="col-md-4">
                <label for="book_author" class="form-label">Nombre de autor</label>
                <input type="text" class="form-control" id="book_author" name="author" required>
                <div class="invalid-feedback"> </div>
            </div>
            <div class="col-md-4">
                <label for="book_price" class="form-label">Precio</label>
                <input type="text" class="form-control" id="book_price" name="price" required>
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

let editBook = async(id) => {
    let {data} = await fetch(`./api/books/${id}`).then(r => r.json());
    console.log(data);

    return `
    <div class="card-body">
        <form class="row g-3" id="form_edit">

            <input type="hidden" name="_method" value="put">
        
            <div class="col-md-4">
                <label for="book_category" class="form-label">Categoría</label>
                <input type="text" class="form-control" id="book_category" value="${data.category}" name="category" required>
                <div class="invalid-feedback"> </div>
            </div>
            <div class="col-md-4">
                <label for="book_title" class="form-label">Título</label>
                <input type="text" class="form-control" id="book_title" value="${data.title}" name="title" required>
                <div class="invalid-feedback"> </div>
            </div>
            <div class="col-md-4">
                <label for="book_author" class="form-label">Nombre de autor</label>
                <input type="text" class="form-control" id="book_author" value="${data.author}" name="author" required>
                <div class="invalid-feedback"> </div>
            </div>
            <div class="col-md-4">
                <label for="book_price" class="form-label">Precio</label>
                <input type="text" class="form-control" id="book_price" value="${data.price}" name="price" required>
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

const testAddings = (ref = document) => {
    console.log({ref});
    let button = ref.querySelector("#book-add-new");
    let container = ref.querySelector("#container-books");
    button.addEventListener("click", () => {
        container.innerHTML = newBook;
        let form = container.querySelector("#form_new");
        let a = request(form,"./api/books", {container, Books});
        console.log(a);

        console.log("sdfsd");
        // form.addEventListener("submit", (e) => {
        //     e.preventDefault();
        //     console.log("enviando ...");
        // })
    });
    console.log(button);
}

const insertPageBook = async (ref = document) => {
    ref.innerHTML = await Books()
    let container = ref.querySelector("#container-books");


    let btnsEdit = ref.querySelectorAll("table tr td [title='Editar']");
    let btnsDelet = ref.querySelectorAll("table tr td [title='Eliminar']");
    btnsEdit.forEach((button) => {
        button.addEventListener("click", async(e) => {
            let id  = button.dataset.id;
            container.innerHTML = await editBook(id);
            let form = container.querySelector("#form_edit");
            let a = request(form,`./api/books/${id}`, {ref, insertPageBook});
        })
    });
    btnsDelet.forEach((button) => {
        button.addEventListener("click", async(e) => {
            let id  = button.dataset.id;
            let status = await fetch(`./api/books/${id}`, {method: 'DELETE'}).then(r => r.ok);
            if (status) {
                var row = button.parentNode.parentNode;
                row.remove();
            }
        })
    });

    let button = ref.querySelector("#book-add-new");
    button.addEventListener("click", () => {
        container.innerHTML = newBook;
        let form = container.querySelector("#form_new");
        let a = request(form,"./api/books", {ref, insertPageBook});
    });
}

export {Books, insertPageBook};