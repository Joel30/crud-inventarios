export const Navbar = () => {
    return  `<nav class="navbar navbar-expand-lg" style="background-color: #196993;" data-bs-theme="dark">
        <div class="container-fluid">
            <a class="navbar-brand pe-4" href="#">Librería</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a id="ni-home", class="nav-link active" href="./">Home</a>
                    </li>
                    <li class="nav-item">
                        <a id="ni-customer", class="nav-link" href="/clientes">Clientes</a>
                    </li>
                    <li class="nav-item">
                        <a id="ni-books", class="nav-link" href="./libros">Libros</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>`;
}
export const activateItem = (currentPage) => {
    let items = document.querySelectorAll("ul.navbar-nav li a");

    items.forEach((item) => {
        if (item.id == currentPage) {
            item.classList.add("active")
        } else {
            item.classList.remove("active")
        }
    });
}



