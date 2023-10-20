import
{
    hamburgerMenu,
    toggleNavigation
} from "../../utils/utils.js";

const navigation= document.getElementById('navigation')

hamburgerMenu.addEventListener('click', toggleNavigation)
window.addEventListener('scroll',addBackground)


//adds a background to the navbar if not at the top of the page
function addBackground(){
    const scrollHeight = window.scrollY
    if(scrollHeight > 0){
    navigation.classList.add("nav__background")
    } else {
    navigation.classList.remove("nav__background")
    }
}
