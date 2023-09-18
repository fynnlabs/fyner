
const hamburgerMenu = document.getElementById('hamburgerMenu')
const linkList = document.getElementById('linkList')

hamburgerMenu.addEventListener('click', function () {toggleNavigation()})

function toggleNavigation() {
    linkList.classList.toggle('show')
}

