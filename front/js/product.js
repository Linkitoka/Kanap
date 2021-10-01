
// S'execute au chargement de la page
window.addEventListener('load', function () {
    // Injecte les données de l'API furniture
    load_furnitures();
});


const params = new URLSearchParams(window.location.search)
const id = params.get("id")


// Rempli la div meubles avec les données de l'API furniture
function load_furnitures() {

    
    fetch(`http://localhost:3000/api/products/${id}`)
        .then(Response => Response.json())
        .then(Furniture => {
            let content = creatDiv(Furniture);
            img.innerHTML += content;
            console.log(img)
        }
        );
}
let img = document.getElementsByClassName("item__img");
/*
let title = document.getElementById("title");
let price = document.getElementById("price");
let description = document.getElementById("descrition");
let option = document.getElementsById("colors"); 
*/

// Retourne une div avec ses classes son contenu
function creatDiv(article){
    return `<img src="${article.imageUrl}" alt="${article.altTxt}"></img>`

}
function titleArticle(element){
    return `${element.name}`
}


   
