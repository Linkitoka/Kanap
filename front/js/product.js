
// S'execute au chargement de la page
window.addEventListener('load', function () {
    // Injecte les données de l'API furniture
    load_furnitures();
});


const params = new URLSearchParams(window.location.search)
const id = params.get("id")


// Rempli la div meubles avec les données de l'API furniture
function load_furnitures() {


    let img = document.getElementsByClassName("item__img")[0];
    let title = document.getElementById("title");
    let price = document.getElementById("price");
    let description = document.getElementById("description");
    let option = document.getElementById("colors");

    fetch(`http://localhost:3000/api/products/${id}`)
        .then(Response => Response.json())
        .then(Furniture => {
            img.innerHTML = creatDiv(Furniture);
            title.innerHTML = Furniture.name;
            price.innerHTML = Furniture.price;
            description.innerHTML = Furniture.description;
            option.innerHTML = colorArray(Furniture);
            let add = document.getElementById("addToCart")

            add.addEventListener("click", function () {
                addToCart(Furniture)
            })
        });
}

// Retourne une div avec ses classes son contenu
function creatDiv(article) {
    return `<img src="${article.imageUrl}" alt="${article.altTxt}"></img>`
}
function descriArticle(article) {
    return `${article.description}`
}

// Retourne une fonction pour le choix des couleurs, si oui alors 3 couleurs si non seulement 2
function colorArray(article) {
    let result;

    for (let color of article.colors) {
        result += `<option value="${color}">${color}</option>`
    }
    return result;

}

function addToCard(article){
    return None;
}