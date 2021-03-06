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
            //selection de l'id du choix des couleurs = colors
            const idColors = document.querySelector("#colors");
            //Selection du bouton add to cart
            const btnSendCart = document.querySelector("#addToCart");

            //Envoyer le panier
            btnSendCart.addEventListener("click", (event) => {
                event.preventDefault();
                //Choix de couleurs
                const choiceColor = idColors.value;
                
                //Récupération des valeurs du formulaire
                let optionProduct = {
                    name: Furniture.name,
                    price: Furniture.price ,
                    imageUrl: Furniture.imageUrl, 
                    description: Furniture.description,
                    altTxt: Furniture.altTxt,
                    quantity:{
                        [choiceColor]:  parseInt(quantity.value),
                    }
                }
                
                
                
               
                let panier = JSON.parse(localStorage.getItem("panierLocalStorage"));
                if (!panier){
                    localStorage.setItem("panierLocalStorage",JSON.stringify({}))
                    panier = {};
                }

                if (panier[Furniture._id]) {
                    if(panier[Furniture._id].quantity[choiceColor]) {
                        panier[Furniture._id].quantity[choiceColor]  += parseInt(quantity.value);
                    }else{
                        panier[Furniture._id].quantity[choiceColor] = parseInt(quantity.value);
                    }
                    
                    localStorage.setItem("panierLocalStorage",JSON.stringify(panier));
                    
                    
                } else {
                    panier[Furniture._id] = optionProduct;
                    localStorage.setItem("panierLocalStorage",JSON.stringify(panier));

                }
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