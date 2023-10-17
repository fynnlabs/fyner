//variables
const mainBtn = document.getElementById('mainBtn')
const filterBtns = ["All", "Smartphones", "Laptops", "Fragrances", "Skincare", "Groceries", "Home-Decoration"]
const hamburgerMenu = document.getElementById('hamburgerMenu')
const linkList = document.getElementById('linkList')

let products = [];

fetch('https://dummyjson.com/products')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        //console.log('data',data.products); // Use the data as needed
        data.products.map((product)=>{
            products.push(product)
        })
        console.log(products)
        //the initial render of the website with all products on it
        // has to be called here, otherwise the func might get called without any data
        renderFilteredProducts(products);
    })
    .catch(error => {
        console.error('Error:', error);
    });

createBtn();

hamburgerMenu.addEventListener('click', function () {
    toggleNavigation()
})


//if Btn clicked the website is rendered with the specific category
function handleBtnClick(category) {
    let filteredProducts
    /*filterProducts(category)*/
    if (category === 'all') {
        filteredProducts = products
    } else {
        filteredProducts = products.filter(product => product.category === category);
    }
    //call render function
    renderFilteredProducts(filteredProducts);
}

//the function that renders after the filtered category
function renderFilteredProducts(filteredProducts) {
    const productListDiv = document.getElementById('products');
    productListDiv.innerHTML = ''; // Clear the existing content
    filteredProducts.forEach(product => {
        const productWrapper = document.createElement('div')
        const productHeadDesWrapper = document.createElement('div')
        const productHeadline = document.createElement('div');
        const productPrice = document.createElement('div')
        const productDescription = document.createElement('div')
        const productImage = document.createElement('img')
        productHeadline.textContent = product.title
        productPrice.textContent = `$${product.price}`
        productImage.src = product.thumbnail;
        productImage.loading = "lazy";
        productImage.alt = product.alt;
        productDescription.textContent = product.description
        productListDiv.appendChild(productWrapper);
        productWrapper.appendChild(productImage);
        productWrapper.appendChild(productHeadDesWrapper)
        productHeadDesWrapper.appendChild(productHeadline);
        productHeadline.appendChild(productPrice);
        productHeadDesWrapper.appendChild(productDescription);
        productPrice.classList.add("price__color");
        productHeadline.classList.add("text__headline");
        productImage.classList.add("left__image");
        productDescription.classList.add("text__description")
        productWrapper.classList.add("imagetext__wrapper")
        productHeadDesWrapper.classList.add("headDesWrapper")
    });
}

//toggles the hamburger menu
function toggleNavigation() {
    linkList.classList.toggle('show')
}

function createBtn(){
    filterBtns.forEach(category =>{
        const button = document.createElement('div')
        button.classList.add("all__btn")
        button.textContent = category
        mainBtn.appendChild(button)

        createdButtonClick(category.toLocaleLowerCase(), button)
    })
}

function createdButtonClick(category, buttonElement){
    buttonElement.addEventListener("click", function (){
        handleBtnClick(category);
    })
}