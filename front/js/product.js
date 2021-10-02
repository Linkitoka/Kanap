
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
            console.log(colorArray)
            
        });
}

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
    return `${article.description}`
}

// Retourne une fonction pour le choix des couleurs, si oui alors 3 couleurs si non seulement 2
function colorArray(article) {
    let result;
        if  (article.colors[2]){
            result = `<option value="${article.colors[0]}">${article.colors[0]}</option>
                        <option value="${article.colors[1]}">${article.colors[1]}</option>;
                            <option value="${article.colors[2]}">${article.colors[2]}</option>`;
        } else{
            result = `<option value="${article.colors[0]}">${article.colors[0]}</option>
                        <option value="${article.colors[1]}">${article.colors[1]}</option>`;
        }
    return result;

}

