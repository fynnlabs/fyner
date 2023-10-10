const allBtn = document.getElementById('allBtn');
const breakfastBtn = document.getElementById('breakfastBtn');
const lunchBtn = document.getElementById('lunchBtn');
const shakesBtn = document.getElementById('shakesBtn');
const dinnerBtn = document.getElementById('dinnerBtn');
const hamburgerMenu = document.getElementById('hamburgerMenu')
const linkList = document.getElementById('linkList')
const shoppingCart = document.getElementById('shoppingCart')
const shoppingCartPop = document.getElementById('shoppingCartPop')
const shoppingCartPopContent = document.getElementById('shoppingCartPopContent')
const shoppingCartPopOrderBtn = document.getElementById('shoppingCartPopOrderBtn')
const totalWrapper = document.createElement('div')
const totalText = document.createElement('span')
const totalPrice = document.createElement('span')
let shoppingNumber = 0
let shoppingCartItems = []
let count = true;


const products = [
    {
        id: 1,
        name: 'Buttermilk Pancake',
        price: 15.99,
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
        category: 'breakfast',
        imgUrl: '/assets/images/pancakes.png',
        alt: 'pancakes with a chocolate glaze and some fruits on top and around it',
    },
    {
        id: 2,
        name: 'Diner Double',
        price: 13.99,
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
        category: 'lunch',
        imgUrl: '/assets/images/burger.png',
        alt: 'a burger with a meat patty some salad and a portion of fries in front of it',
    },
    {
        id: 3,
        name: 'Godzilla Milkshake',
        price: 6.99,
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
        category: 'shakes',
        imgUrl: '/assets/images/shake.png',
        alt: 'a light red milkshake in a glass with a strawberry in front of it and some slice up on the glass in the glass is a glass straw',
    },
    {
        id: 4,
        name: 'Country Delight',
        price: 20.99,
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
        category: 'dinner',
        imgUrl: '/assets/images/dinner.png',
        alt: 'a plate tacos with meat filling and a lime and green dip next to it also some different sides and dips next to the plate and a bottle with a yellow drink',
    }
];

allBtn.addEventListener("click", function () {
    handleBtnClick("all")
});
breakfastBtn.addEventListener("click", function () {
    handleBtnClick("breakfast")
});
lunchBtn.addEventListener("click", function () {
    handleBtnClick("lunch")
});
shakesBtn.addEventListener("click", function () {
    handleBtnClick("shakes")
});
dinnerBtn.addEventListener("click", function () {
    handleBtnClick("dinner")
});

hamburgerMenu.addEventListener('click', function () {
    toggleNavigation()
})

shoppingCart.addEventListener('click', function () {
    showShoppingCart()
})

renderFilteredProducts(products);

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
        productHeadline.textContent = product.name;
        productPrice.textContent = `$${product.price}`;
        plus.textContent = `+`;
        productImage.src = product.imgUrl;
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
}

//toggles the hamburger menu
function toggleNavigation() {
    linkList.classList.toggle('show');
}

//adds the item to the shoppingCart
function plusBtnClick(product) {

    shoppingNumber += 1;
    shoppingCart.innerHTML = `Warenkorb (${shoppingNumber})`

    shoppingCartPopContent.textContent = ''
    const cartItem = shoppingCartItems.find(item => item.id === product.id)

    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        const clonedProduct = {...product, quantity: 1};
        shoppingCartItems.push(clonedProduct)
    }


    updateTotalPrice();
    shoppingCartItems.forEach(item => {
        const shoppingCartItemWrapper = document.createElement('div')
        const shoppingCartItemName = document.createElement('div');
        const shoppingCartItemPrice = document.createElement('div')
        let itemPrice = item.price * item.quantity
        shoppingCartItemName.textContent = `${item.name} (${item.quantity})`;
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
}

const backgroundPop = document.getElementById('backgroundPop')

//toggles the shoppingCart
function showShoppingCart() {
    updateTotalPrice();
    shoppingCartPop.classList.toggle('shoppingCartShow');
    backgroundPop.classList.toggle('backgroundBlendShow')
    if (shoppingNumber === 0 && count === true) {
        const shoppingCartPlaceholder = document.createElement('div')
        shoppingCartPlaceholder.textContent = 'Noch keine Einträge im Warenkorb'
        shoppingCartPlaceholder.classList.add('shoppingCart__placeholder')
        shoppingCartPopContent.appendChild(shoppingCartPlaceholder)
        count = false;
    }

}

function calculateTotalPrice() {
    let total = 0;
    for (const item of shoppingCartItems) {
        total += item.price * item.quantity;
    }
    return total;
}

function updateTotalPrice() {
    const totalAmount = calculateTotalPrice();
    totalPrice.textContent = `$${totalAmount.toFixed(2)}`;
    totalText.textContent = `Summe:`
}