const linkList = document.getElementById('linkList')

export const filterBtns = ["All", "Smartphones", "Laptops", "Fragrances", "Skincare", "Groceries", "Home-Decoration"]
export const mainBtn = document.getElementById('mainBtn');
export const hamburgerMenu = document.getElementById('hamburgerMenu')
export let products = [];

//toggles the hamburger navigation menu
export function toggleNavigation() {
    linkList.classList.toggle('show')
}

//fetches data from an url and puts them into an array
export function fetchData(url, products, renderFilteredProducts){
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            data.products.map((product)=>{
                products.push(product)
            })
            //the initial render of the website with all products on it
            // has to be called here, otherwise the func might get called without any data
            renderFilteredProducts(products);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}