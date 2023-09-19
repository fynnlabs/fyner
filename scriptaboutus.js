
const hamburgerMenu = document.getElementById('hamburgerMenu')
const linkList = document.getElementById('linkList')

hamburgerMenu.addEventListener('click', function () {toggleNavigation()})

//toggles the hamburger menu
function toggleNavigation() {
    linkList.classList.toggle('show')
}

