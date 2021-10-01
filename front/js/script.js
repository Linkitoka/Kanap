
// S'execute au chargement de la page
window.addEventListener('load', function () {
    // Injecte les données de l'API furniture
    load_furnitures();
});


// Rempli la div meubles avec les données de l'API furniture
function load_furnitures() {
    let div = document.getElementById("items");

    fetch("http://localhost:3000/api/products")
        .then(Response => Response.json())
        .then(Furniture => {
            for (let element of Furniture) {
                
                let content = creatDiv(element)
                div.innerHTML += content;
               
            }
        });
}   

// Retourne une div avec ses classes son contenu
function creatDiv(element) {
    return `<a href="./product.html?id=${element._id}">
                <article>
                    <img src="${element.imageUrl}" alt="${element.altTxt}, ${element.name}"></img>
                        <h3 class="productName">${element.name}</h3>
                        <p class="productDescription">${element.description}</p>
                </article>
            </a>`;
}

