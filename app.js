import {Navbar, activateItem} from "./js/components/Navbar.js"

import Warehouse from "./js/pages/Warehouse.js";
import Categories from "./js/pages/Category.js";
import Articles from "./js/pages/Articles.js";
import Sales from "./js/pages/Sales.js";

const app = document.getElementById("app");

let container = document.createElement("div");
container.setAttribute("class", "container pt-4");
// container.innerHTML = Customers;

app.innerHTML = Navbar();

let Home = `<h4 class="ms-3"> Home </h4>`;

let current = localStorage.getItem("current");

if (current) {
    activateItem(current);

    if (current == "ni-home") {
        container.innerHTML = Home;
    }
    if (current == "ni-warehouse") {
        Warehouse(container);
    }
    if (current == "ni-category") {
        Categories(container);
    }
    if (current == "ni-articles") {
        Articles(container);
    }
    if (current == "ni-sales") {
        Sales(container);
    }
} else {
    container.innerHTML = Home;
}

const addEvents = () => {
    let itemHome = document.getElementById("ni-home");
    let itemWarehouse = document.getElementById("ni-warehouse");
    let itemCategories = document.getElementById("ni-category");
    let itemArticles = document.getElementById("ni-articles");
    let itemVentas = document.getElementById("ni-sales");

    let currentPage = "";

    itemHome.addEventListener("click", (e) => {
        e.preventDefault();
        if (e.target.id != currentPage) {
            currentPage = e.target.id;

            localStorage.setItem("current", currentPage);
            activateItem(currentPage);

            container.innerHTML = Home;
        }
    });
    
    itemWarehouse.addEventListener("click", (e) => {
        e.preventDefault();
        if (e.target.id != currentPage) {
            currentPage = e.target.id;

            localStorage.setItem("current", currentPage);
            activateItem(currentPage);

            Warehouse(container);
        }
    });
    itemCategories.addEventListener("click", (e) => {
        e.preventDefault();
        if (e.target.id != currentPage) {
            currentPage = e.target.id;

            localStorage.setItem("current", currentPage);
            activateItem(currentPage);

            Categories(container);
        }
    });
    itemArticles.addEventListener("click", (e) => {
        e.preventDefault();
        if (e.target.id != currentPage) {
            currentPage = e.target.id;

            localStorage.setItem("current", currentPage);
            activateItem(currentPage);

            Articles(container);
        }
    });
    itemVentas.addEventListener("click", (e) => {
        e.preventDefault();
        if (e.target.id != currentPage) {
            currentPage = e.target.id;

            localStorage.setItem("current", currentPage);
            activateItem(currentPage);

            Sales(container);
        }
    });
    
}

addEvents();

app.appendChild(container);

