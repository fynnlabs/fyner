import
{
    hamburgerMenu,
    products,
    filterBtns,
    mainBtn,
    toggleNavigation,
    fetchData
} from "../../utils/utils.js";

fetchData('https://dummyjson.com/products', products, renderFilteredProducts);

//call createBtn
createBtn();

hamburgerMenu.addEventListener('click', toggleNavigation)


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
