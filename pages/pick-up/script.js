const allBtn = document.getElementById('allBtn');
const breakfastBtn = document.getElementById('breakfastBtn');
const lunchBtn = document.getElementById('lunchBtn');
const shakesBtn = document.getElementById('shakesBtn');
const dinnerBtn = document.getElementById('dinnerBtn');
const hamburgerMenu = document.getElementById('hamburgerMenu')
const linkList = document.getElementById('linkList')

const products = [
    {
        id: 1,
        name: 'Buttermilk Pancake',
        price: 15.99,
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
        category: 'breakfast',
        imgUrl: '/assets/images/pancakes.png',
        alt: 'pancakes with a chocolate glaze and some fruits on top and around it'
    },
    {
        id: 2,
        name: 'Diner Double',
        price: 13.99,
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
        category: 'lunch',
        imgUrl: '/assets/images/burger.png',
        alt: 'a burger with a meat patty some salad and a portion of fries in front of it'
    },
    {
        id: 3,
        name: 'Godzilla Milkshake',
        price: 6.99,
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
        category: 'shakes',
        imgUrl: '/assets/images/shake.png',
        alt: 'a light red milkshake in a glass with a strawberry in front of it and some slice up on the glass in the glass is a glass straw'
    },
    {
        id: 4,
        name: 'Country Delight',
        price: 20.99,
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
        category: 'dinner',
        imgUrl: '/assets/images/dinner.png',
        alt: 'a plate with tacos with meat filling and a lime and green dip next to it also some different sides and dips next to the plate and a bottle with a yellow drink'
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
    filteredProducts.forEach(product => {
        const productWrapper = document.createElement('div');
        const productHeadDesWrapper = document.createElement('div');
        const productHeadline = document.createElement('div');
        const productPrice = document.createElement('div');
        const productDescription = document.createElement('div');
        const productImage = document.createElement('img');
        const pricePlusWrapper = document.createElement('div');
        const plus = document.createElement('div');
        productHeadline.textContent = product.name;
        productPrice.textContent = `$${product.price}`;
        plus.textContent = `+`;
        plus.setAttribute("id", "plusBtn");
        productImage.src = product.imgUrl;
        productImage.loading = "lazy";
        productImage.alt = product.alt;
        productDescription.textContent = product.description;
        productListDiv.appendChild(productWrapper);
        productWrapper.appendChild(productHeadline);
        productWrapper.appendChild(productDescription);
        productWrapper.appendChild(productImage);
        productWrapper.appendChild(pricePlusWrapper);
        pricePlusWrapper.appendChild(productPrice);
        pricePlusWrapper.appendChild(plus);
        plus.classList.add("plus");
        pricePlusWrapper.classList.add("pricePlusWrapper")
        productPrice.classList.add("price");
        productHeadline.classList.add("text__headline");
        productImage.classList.add("left__image");
        productDescription.classList.add("text__description");
        productWrapper.classList.add("imagetext__wrapper");
        productHeadDesWrapper.classList.add("headDesWrapper");
    });
}

//toggles the hamburger menu
function toggleNavigation() {
    linkList.classList.toggle('show');
}

