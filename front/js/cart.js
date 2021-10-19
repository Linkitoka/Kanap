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
   let addCartProduct = document.getElementById("cartAndFormContainer");

  
   
  //Variable de la function pour le panier VIDE
  let cartEmpty = cartEmptyFunction();
  let productOfLocal = productAddOnLocalStorage;

  //SI le panier est vide alors function vide SINON boucle pour récupéré les objects dans le LocalStorage
   if (!productAddOnLocalStorage) {
    addCartProduct.innerHTML = cartEmpty;
    
  } else {
    //Variable de la function pour le panier pleins
    let cartProductObject = creatCart(productAddOnLocalStorage);
      addProductInCard.innerHTML = cartProductObject;
     
  }
  /* 
  if (productAddOnLocalStorage){
    productAddOnLocalStorage.quantity[choiceColor] += quantity;
  }else{
    localStorage.
  }
  */
  
  //Function intéger pour le panier vide
  function cartEmptyFunction() {
    return `<h1> Votre panier est vide </h1>`
  }
  //Fuction appeler les objet de mon localStorage dans ma function et les étidté avec leurs nom
  function creatCart(products) {
    console.log(products);
    let result = "";
    for ( let object in products) {
      for (let color in products[object].quantity) {
      result += `<article class="cart__item" data-id="${object}">
                <div class="cart__item__img">
                  <img src="${products[object].imageUrl}" alt="${products[object].altTxt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__titlePrice">
                    <h2>${products[object].name} <br>Color: ${color}</br></h2>
                    <p>${products[object].price*100}€</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté :  </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${products[object].quantity[color]}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>`
            }
          }    
    
    return result;
  }
}
