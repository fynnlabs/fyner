import
{
    hamburgerMenu,
    products,
    filterBtns,
    mainBtn,
    toggleNavigation,
    fetchData
} from "../../utils/utils.js";

//call createBtn
createBtn();
//calls fetchData
fetchData('https://dummyjson.com/products', products, renderFilteredProducts);

hamburgerMenu.addEventListener('click', toggleNavigation)

//if Btn clicked the website is rendered with the specific category products
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
        //creates divs for each piece of content that are needed
        const productWrapper = document.createElement('div')
        const productHeadDesWrapper = document.createElement('div')
        const productHeadline = document.createElement('div');
        const productPrice = document.createElement('div')
        const productDescription = document.createElement('div')
        const productImage = document.createElement('img')
        //adds the content that should get loaded
        productHeadline.textContent = product.title
        productPrice.textContent = `$${product.price}`
        productImage.src = product.thumbnail;
        productImage.loading = "lazy";
        productImage.alt = product.alt;
        productDescription.textContent = product.description
        //makes the hierarchy for the divs
        productListDiv.appendChild(productWrapper);
        productWrapper.appendChild(productImage);
        productWrapper.appendChild(productHeadDesWrapper)
        productHeadDesWrapper.appendChild(productHeadline);
        productHeadline.appendChild(productPrice);
        productHeadDesWrapper.appendChild(productDescription);
        //adds the classes for the styling
        productPrice.classList.add("price__color");
        productHeadline.classList.add("text__headline");
        productImage.classList.add("left__image");
        productDescription.classList.add("text__description")
        productWrapper.classList.add("imagetext__wrapper")
        productHeadDesWrapper.classList.add("headDesWrapper")
    });
}

//creates Btns for each String that is in filterBtns
function createBtn(){
    filterBtns.forEach(category =>{
        const button = document.createElement('div')
        button.classList.add("all__btn")
        button.textContent = category
        mainBtn.appendChild(button)

        createdButtonClick(category.toLocaleLowerCase(), button)
    })
}

//makes it that every Btn from createBtn is able to filter for their category
function createdButtonClick(category, buttonElement){
    buttonElement.addEventListener("click", function (){
        handleBtnClick(category);
    })
}