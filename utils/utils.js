const linkList = document.getElementById('linkList')

export const filterBtns = ["All", "Smartphones", "Laptops", "Fragrances", "Skincare", "Groceries", "Home-Decoration"]
export const mainBtn = document.getElementById('mainBtn');
export const hamburgerMenu = document.getElementById('hamburgerMenu')
export let products = [];

export function toggleNavigation() {
    linkList.classList.toggle('show')
}