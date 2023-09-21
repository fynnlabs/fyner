
const hamburgerMenu = document.getElementById('hamburgerMenu')
const linkList = document.getElementById('linkList')
const navigation= document.getElementById('navigation')

hamburgerMenu.addEventListener('click', function () {toggleNavigation()})
window.addEventListener('scroll', function(){addBackground()})

//toggles the hamburger menu
function toggleNavigation() {
    linkList.classList.toggle('show')
}

//adds a background to the navbar if not at the top of the page
function addBackground(){
    const scrollHeight = window.scrollY
    if(scrollHeight > 0){
    navigation.classList.add("nav__background")
    } else {
    navigation.classList.remove("nav__background")
    }
}

