const burgerMenuButton = document.querySelector('.burgerMenuButton');
const burgerMenuButtonIcon = document.querySelector('.burgerMenuButton i');
const burgerMenu = document.querySelector('.burgerMenu');
const menuItems = document.querySelectorAll('.burgerMenu a'); // Assumant que les éléments sont des liens <a>

burgerMenuButton.onclick = function() {
    burgerMenu.classList.toggle('open');
    const isOpen = burgerMenu.classList.contains('open');
    burgerMenuButtonIcon.classList = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
}

menuItems.forEach(item => {
    item.onclick = function() {
        burgerMenu.classList.remove('open');
        burgerMenuButtonIcon.classList = 'fa-solid fa-bars'; // Assurant que l'icône retourne à "bars"
    }
});
