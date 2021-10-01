
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
    colors.forEach(element => console.log(element))
    fetch(`http://localhost:3000/api/products/${id}`)
        .then(Response => Response.json())
        .then(Furniture => {

            let content = creatDiv(Furniture);
            let content1 = titleArticle(Furniture);
            let content2 = priceArticle(Furniture);
            let content3 = descriArticle(Furniture);
            let content4 = colorArray(Furniture);
            img.innerHTML += content;
            title.innerHTML += content1;
            price.innerHTML += content2;
            description.innerHTML += content3;
            option.innerHTML += content4;
            
        });
}
/*
let title = document.getElementById("title"); 
*/

// Retourne une div avec ses classes son contenu
function creatDiv(article) {
    return `<img src="${article.imageUrl}" alt="${article.altTxt}"></img>`
}

function titleArticle(article) {
    return `${article.name}`
}
function priceArticle(article) {
    return `${article.price}`
}
function descriArticle(article){
    return`${article.description}`
}
function colorArray(article){
    return `<option value="${article.colors}">${article.colors}</option>
                <option value="${article.colors}">${article.colors}</option>`
}


   
