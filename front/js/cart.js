// S'execute au chargement de la page
window.addEventListener('load', function () {
  // Injecte les données de l'API furniture
  load_furnitures();
});


const params = new URLSearchParams(window.location.search)
const id = params.get("id")


// Rempli la div meubles avec les données de l'API furniture
function load_furnitures() {
    let div = document.getElementById("items");

    fetch("http://localhost:3000/api/products")
    
  
  

  let productAddOnLocalStorage = JSON.parse(localStorage.getItem("productLocalStorage"));
  
  
  if (productAddOnLocalStorage === null) {
    addCartProduct.innerHTML = cartEmpty;
  } else {
    let productOnLocalStorage = [];
    for (object of productAddOnLocalStorage){
      console.log(object);

    }
    addProductInCard.innerHTML = cartProductObject;
  }
}
let cartEmpty = cartEmptyFunction();
function cartEmptyFunction () {
  return `<h1> est vide </h1>`
}
let addCartProduct = document.getElementById("cart__items")
// Creation du code html pour le panier
let addProductInCard = document.getElementById("cart__items")
let cartProductObject = creatCart();
function creatCart(article) {
  return `<article class="cart__item" data-id="${article.id}">
                <div class="cart__item__img">
                  <img src="${article.imageUrl}" alt="${article.altTxt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__titlePrice">
                    <h2>${article.name}</h2>
                    <p>${article.price}</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="10" value="42">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>`
}
