//variables
const allBtn = document.getElementById('allBtn');
const breakfastBtn = document.getElementById('breakfastBtn');
const lunchBtn = document.getElementById('lunchBtn');
const shakesBtn = document.getElementById('shakesBtn');
const dinnerBtn = document.getElementById('dinnerBtn');
const hamburgerMenu = document.getElementById('hamburgerMenu')
const linkList = document.getElementById('linkList')

//the info for the products that should get rendered on the Website
const products = [
    {
        id: 1,
        name: 'Buttermilk Pancake',
        price: 15.99,
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. At, cumque eligendi esse laudantium magnam molestiae perspiciatis quibusdam rerum suscipit. Sapiente.',
        category: 'breakfast',
        imgUrl: '/assets/images/pancakes.png'
    },
    {
        id: 2,
        name: 'Diner Double',
        price: 13.99,
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. At, cumque eligendi esse laudantium magnam molestiae perspiciatis quibusdam rerum suscipit. Sapiente.',
        category: 'lunch',
        imgUrl: '/assets/images/burger.png'
    },
    {
        id: 3,
        name: 'Godzilla Milkshake',
        price: 6.99,
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. At, cumque eligendi esse laudantium magnam molestiae perspiciatis quibusdam rerum suscipit. Sapiente.',
        category: 'shakes',
        imgUrl: '/assets/images/shake.png'
    },
    {
        id: 4,
        name: 'Country Delight',
        price: 20.99,
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. At, cumque eligendi esse laudantium magnam molestiae perspiciatis quibusdam rerum suscipit. Sapiente.',
        category: 'dinner',
        imgUrl: '/assets/images/dinner.png'
    }
];

allBtn.addEventListener("click", function () {handleBtnClick("all")});
breakfastBtn.addEventListener("click", function () {handleBtnClick("breakfast")});
lunchBtn.addEventListener("click", function () {handleBtnClick("lunch")});
shakesBtn.addEventListener("click", function () {handleBtnClick("shakes")});
dinnerBtn.addEventListener("click", function () {handleBtnClick("dinner")});
hamburgerMenu.addEventListener('click', function () {toggleNavigation()})


//the initial render of the website with all products on it
renderFilteredProducts(products);

//if Btn clicked the website is rendered with the specific category
function handleBtnClick(category){
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
        const productImage =document.createElement('img')
        productHeadline.textContent = product.name
        productPrice.textContent = `$${product.price}`
        productImage.src = product.imgUrl;
        productImage.loading = "lazy";
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

