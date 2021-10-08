// S'execute au chargement de la page
window.addEventListener('load', function () {
  // Injecte les données de l'API furniture
  load_furnitures();
});



// Rempli la div meubles avec les données de l'API furniture
function load_furnitures() {


  let productAddOnLocalStorage = JSON.parse(localStorage.getItem("productLocalStorage"));
  

  // Creation du code html pour le panier
  let addProductInCard = document.getElementById("cart__items");
   // Creation du code html pour le panier VIDE
   let addCartProduct = document.getElementById("cart__items");
  //Variable de la function pour le panier pleins
  let cartProductObject = creatCart();
  //Variable de la function pour le panier VIDE
  let cartEmpty = cartEmptyFunction();
  let productOfLocal = productAddOnLocalStorage;

  //SI le panier est vide alors function vide SINON boucle pour récupéré les objects dans le LocalStorage
  if (productAddOnLocalStorage === null) {
    addCartProduct.innerHTML = cartEmpty;
    console.log(cartEmpty);
    
  } else {
 
    for (object of productAddOnLocalStorage) {
      addProductInCard.innerHTML = cartProductObject;
    }

  }

  //Function intéger pour le panier vide
  function cartEmptyFunction() {
    return `<h1> est vide </h1>`
  }
  //Fuction appeler les objet de mon localStorage dans ma function et les étidté avec leurs nom
  function creatCart(productAddOnLocalStorage) {
    let result;
    for (object of productAddOnLocalStorage.productOfLocal) {
      result += `<article class="cart__item" data-id="${object._id}">
                <div class="cart__item__img">
                  <img src="${object.imageUrl}" alt="${object.altTxt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__titlePrice">
                    <h2>${object.name}</h2>
                    <p>${object.price*100}€</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : 1 </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="10" value="42">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>`
    }
    return result;
  }
}
