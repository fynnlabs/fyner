import {filterBtns, mainBtn, products} from "../../utils/utils.js";

const hamburgerMenu = document.getElementById('hamburgerMenu')
const linkList = document.getElementById('linkList')
const shoppingCart = document.getElementById('shoppingCart')
const shoppingCartPop = document.getElementById('shoppingCartPop')
const shoppingCartPopContent = document.getElementById('shoppingCartPopContent')
const shoppingCartPopOrderBtn = document.getElementById('shoppingCartPopOrderBtn')
const backgroundPop = document.getElementById('backgroundPop')
const totalWrapper = document.createElement('div')
const totalText = document.createElement('span')
const totalPrice = document.createElement('span')
let shoppingNumber = 0
let shoppingCartItems = []
let count = true;
let itemsInShoppingCart = false
let cartItem = []
let showCart = true



hamburgerMenu.addEventListener('click', function () {
    toggleNavigation()
})

shoppingCart.addEventListener('click', function () {
    showShoppingCart()
})

shoppingCartPopOrderBtn.addEventListener('click', function () {
    shoppingCartPopOrderBtnClick()
})

backgroundPop.addEventListener('click', function (){
    showShoppingCart()
})

createBtn();

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

//renders the products
function renderFilteredProducts(filteredProducts) {
    const productListDiv = document.getElementById('products');
    productListDiv.innerHTML = ''; // Clear the existing content
    filteredProducts.forEach((product) => {
        const productWrapper = document.createElement('div');
        const productHeadDesWrapper = document.createElement('div');
        const productHeadline = document.createElement('div');
        const productPrice = document.createElement('div');
        const productDescription = document.createElement('div');
        const productImage = document.createElement('img');
        const pricePlusWrapper = document.createElement('div');
        const plus = document.createElement('div');
        const textWrapper = document.createElement('div')
        productHeadline.textContent = product.title;
        productPrice.textContent = `$${product.price}`;
        plus.textContent = `+`;
        productImage.src = product.thumbnail;
        productImage.loading = "lazy";
        productImage.alt = product.alt;
        productDescription.textContent = product.description;
        productListDiv.appendChild(productWrapper);
        productWrapper.appendChild(textWrapper)
        textWrapper.appendChild(productHeadline);
        textWrapper.appendChild(productDescription);
        productWrapper.appendChild(productImage);
        productWrapper.appendChild(pricePlusWrapper);
        pricePlusWrapper.appendChild(productPrice);
        pricePlusWrapper.appendChild(plus);
        plus.classList.add("plus");
        pricePlusWrapper.classList.add("pricePlusWrapper")
        productPrice.classList.add("price");
        productHeadline.classList.add("text__headline");
        productImage.classList.add("image");
        productDescription.classList.add("text__description");
        productWrapper.classList.add("imagetext__wrapper");
        productHeadDesWrapper.classList.add("headDesWrapper");
        textWrapper.classList.add("textWrapper")

        plus.addEventListener('click', function () {
            plusBtnClick(product);
        });
    });
    shoppingCartPopContent.textContent = 'Noch keine Einträge im Warenkorb'
}

//toggles the hamburger menu
function toggleNavigation() {

    linkList.classList.toggle('show');
    if (showCart){
        shoppingCart.style.visibility ="hidden"
        showCart = false;
    } else{
        shoppingCart.style.visibility ="visible"
        showCart = true;
    }
}

//adds the item to the shoppingCart
function plusBtnClick(product) {
    shoppingNumber += 1;
    shoppingCart.innerHTML = `Warenkorb (${shoppingNumber})`

    shoppingCartPopContent.textContent = ''

    //checks if the product exists in the cart if so then the quantity is upped if not the product gets added and gets the quantity attribute
    cartItem = shoppingCartItems.find(item => item.id === product.id)
    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        const clonedProduct = {...product, quantity: 1};
        shoppingCartItems.push(clonedProduct)
    }

    updateTotalPrice();

    //renders each product from shoppingCartItems in the shopping cart
    shoppingCartItems.forEach(item => {
        const shoppingCartItemWrapper = document.createElement('div')
        const shoppingCartItemName = document.createElement('div');
        const shoppingCartItemPrice = document.createElement('div')
        let itemPrice = item.price * item.quantity
        shoppingCartItemName.textContent = `${item.title} (${item.quantity})`;
        shoppingCartItemPrice.textContent = `${itemPrice.toFixed(2)}`
        shoppingCartItemName.classList.add('shoppingCartItem__name')
        shoppingCartItemWrapper.classList.add('shoppingCartItem__wrapper')
        shoppingCartPopContent.appendChild(shoppingCartItemWrapper)
        shoppingCartItemWrapper.appendChild(shoppingCartItemName);
        shoppingCartItemWrapper.appendChild(shoppingCartItemPrice);
    });

    shoppingCartPopContent.appendChild(totalWrapper);
    totalWrapper.appendChild(totalText)
    totalWrapper.appendChild(totalPrice)
    totalWrapper.classList.add('total__wrapper')
    totalText.classList.add('total__text')
    shoppingCartPopOrderBtn.style.opacity = 1;
    shoppingCartPopOrderBtn.classList.add('shoppingCartPop__orderBtnHover')
    itemsInShoppingCart = true;
}


//toggles the shoppingCart
function showShoppingCart() {
    updateTotalPrice();
    if (shoppingNumber === 0 && count === true) {
        const shoppingCartPlaceholder = document.createElement('div')
        shoppingCartPlaceholder.classList.add('shoppingCart__placeholder')
        shoppingCartPopContent.appendChild(shoppingCartPlaceholder)
        count = false;
    }
    if(shoppingCartPop.style.visibility === "visible"){
        shoppingCartPop.style.visibility = "hidden"
        backgroundPop.style.visibility = "hidden"
    } else{
        shoppingCartPop.style.visibility = "visible"
        backgroundPop.style.visibility = "visible"
    }
}

//calculates the total price from all shopping cart items
function calculateTotalPrice() {
    let total = 0;
    for (const item of shoppingCartItems) {
        total += item.price * item.quantity;
    }
    return total;
}

//updates the total price
function updateTotalPrice() {
    const totalAmount = calculateTotalPrice();
    totalPrice.textContent = `$${totalAmount.toFixed(2)}`;
    totalText.textContent = `Summe:`
}

//makes the orderBtn work to give an alert that it is ordered and clears shopping cart
function shoppingCartPopOrderBtnClick() {
    if (itemsInShoppingCart) {
        alert('Deine Bestellung wurde aufgenommen.')
        shoppingCartPopContent.textContent = 'Noch keine Einträge im Warenkorb'
        shoppingCartPopOrderBtn.style.opacity = 0.4;
        shoppingCart.innerHTML = 'Warenkorb (0)'
        shoppingCartItems = [];
        shoppingCartPopOrderBtn.classList.remove('shoppingCartPop__orderBtnHover')
        shoppingNumber = 0;
    }
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