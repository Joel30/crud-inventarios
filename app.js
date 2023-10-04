import {Navbar, activateItem} from "./js/components/Navbar.js"
import {Customers} from "./js/pages/Customers.js";
import {Books, testAddings} from "./js/pages/Books.js";

const app = document.getElementById("app");

let container = document.createElement("div");
container.setAttribute("class", "container pt-4");
// container.innerHTML = Customers;

app.innerHTML = Navbar();

const addEvents = () => {
    let itemHome = document.getElementById("ni-home");
    let itemCustomer = document.getElementById("ni-customer");
    let itemBooks = document.getElementById("ni-books");

    let currentPage = "";

    itemHome.addEventListener("click", (e) => {
        e.preventDefault();
        if (e.target.id != currentPage) {
            currentPage = e.target.id;
            activateItem(currentPage);
            container.innerHTML = Customers
            
        }
    });
    
    itemCustomer.addEventListener("click", (e) => {
        e.preventDefault();
        if (e.target.id != currentPage) {
            currentPage = e.target.id;
            activateItem(currentPage);
            container.innerHTML = Customers
        }
    });
    
    itemBooks.addEventListener("click", async (e) => {
        e.preventDefault();
        if (e.target.id != currentPage) { 
            currentPage = e.target.id;
            activateItem(currentPage);
            container.innerHTML = await Books()
            testAddings(container);

        }
    });
}

addEvents();

app.appendChild(container);

