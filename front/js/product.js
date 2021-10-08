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

            // Panier ----------------------
            // Recupération de l'option de couleurs
            //selection de l'id du choix des couleurs = colors
            const idColors = document.querySelector("#colors");
            //Selection du bouton add to cart
            const btnSendCart = document.querySelector("#addToCart");
            console.log(btnSendCart)

            //Envoyer le panier
            btnSendCart.addEventListener("click", (event) => {
                event.preventDefault();
                //Choix de couleurs
                const choiceColor = idColors.value;

                //Récupération des valeurs du formulaire
                let optionProduct = {
                    colors: choiceColor,
                    id: Furniture._id,
                    name: Furniture.name,
                    price: Furniture.price / 100,
                    imageUrl: Furniture.imageUrl,
                    description: Furniture.description,
                    altTxt: Furniture.altTxt,
                    qte: 1,
                }
                let productAddOnLocalStorage = JSON.parse(localStorage.getItem("productLocalStorage"));


                if (productAddOnLocalStorage) {
                    productAddOnLocalStorage.push(optionProduct);
                    localStorage.setItem("productLocalStorage",JSON.stringify(productAddOnLocalStorage));
                    console.log(productAddOnLocalStorage);
                    confirmPopup();
                } else {

                    productAddOnLocalStorage = [];
                    productAddOnLocalStorage.push(optionProduct);
                    localStorage.setItem("productLocalStorage",JSON.stringify(productAddOnLocalStorage));

                }
                //fonction popup
                function confirmPopup() {
                    if (window.confirm(` ${Furniture.name} couleur: ${choiceColor} a bien été ajouté au panier
    Continuer les achats OK ou aller vers le panier ANNULER`)) {
                        window.location.href = "index.html";
                    } else {
                        window.location.href = "cart.html";
                    }

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