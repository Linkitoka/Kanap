// S'execute au chargement de la page
window.addEventListener('load', function () {
  // Injecte les données de l'API furniture
  load_furnitures();
});



// Rempli la div meubles avec les données de l'API furniture
function load_furnitures() {


  let cart = JSON.parse(localStorage.getItem("productLocalStorage"));

  // Creation du code html pour le panier
  let addProductInCard = document.getElementById("cart__items");
  // Creation du code html pour le panier VIDE
  let addCartProduct = document.getElementById("cartAndFormContainer");

  // Creation du code html pour le totalquantity du panier
  let totalQuantity = document.getElementById("totalQuantity");
  // Creation du code html pour le totalprice du panier
  let totalPrice = document.getElementById("totalPrice");

  //Variable de la function pour le panier VIDE
  let cartEmpty = cartEmptyFunction();

  //SI le panier est vide alors function vide SINON boucle pour récupéré les objects dans le LocalStorage
  if (!cart) {
    addCartProduct.innerHTML = cartEmpty;

  } else {
    //Variable de la function pour le panier pleins
    let cartProductObject = creatCart(cart);
    addProductInCard.innerHTML = cartProductObject;
    //total quantity dans le panier 
    let total = getTotal(cart);
    totalQuantity.innerHTML = total.quantity;
    totalPrice.innerHTML = total.total;
    //AddEvents ajouter et changer des quantités
    addEvents();
    deleteItem();
    verification();
    
  }


  //Function intéger pour le panier vide
  function cartEmptyFunction() {
    return `<h1> Votre panier est vide </h1>`
  }
  //Fuction appeler les objet de mon localStorage dans ma function et les étidté avec leurs nom
  function creatCart(products) {
    let result = "";
    for (let object in products) {
      for (let color in products[object].quantity) {
        result += `<article class="cart__item" data-id="${object}" data-color="${color}">
                <div class="cart__item__img">
                  <img src="${products[object].imageUrl}" alt="${products[object].altTxt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__titlePrice">
                    <h2>${products[object].name} <br>Color: ${color}</br></h2>
                    <p>${products[object].price * 10 / 10}€</p>
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
  //function pour supprimer un item du panier. (localStorage + HTML)
  function deleteItem(){
    let buttons = document.querySelectorAll(".deleteItem");
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        let id = button.parentElement.parentElement.parentElement.parentElement.dataset.id;
        let color = button.parentElement.parentElement.parentElement.parentElement.dataset.color;
        let cart = JSON.parse(localStorage.getItem("productLocalStorage"));
        delete cart[id].quantity[color];
        localStorage.setItem("productLocalStorage", JSON.stringify(cart));
        let total = getTotal(cart);
        totalQuantity.innerHTML = total.quantity;
        totalPrice.innerHTML = total.total;
        button.parentElement.parentElement.parentElement.parentElement.remove();
    })
  })
  }
  //Function pour ajouter ou enlever un produit via les inputs.
  function addEvents(){
    let inputs = document.querySelectorAll(".itemQuantity");
    inputs.forEach(input => {
      input.addEventListener('change', () => {
        let id = input.parentElement.parentElement.parentElement.parentElement.dataset.id;
        let color = input.parentElement.parentElement.parentElement.parentElement.dataset.color;
        let quantity = input.value;
        let cart = JSON.parse(localStorage.getItem("productLocalStorage"));
        cart[id].quantity[color] = parseInt(quantity);
        localStorage.setItem("productLocalStorage", JSON.stringify(cart));
        let total = getTotal(cart);
        totalQuantity.innerHTML = total.quantity;
        totalPrice.innerHTML = total.total;
      } )
    })
  } 
  // function qui additionne le total des produits du panier
  function getTotal(products) {
    let totalPrice = 0;
    let totalQuantity = 0;
    for (let object in products) {
      let quantity = 0;
      for (let color in products[object].quantity) {
        quantity += products[object].quantity[color];
        totalQuantity += products[object].quantity[color];
      }
      totalPrice += quantity*products[object].price;
    }
    return {quantity: totalQuantity, total: totalPrice};
  }
  function verification(){
    //champs a vérifier..
    let btnOrder = document.getElementById("order");
    var firstName = document.getElementById("firstName");
    var errorFirstName = document.getElementById("firstNameErrorMsg");
    var prenomValid = /^[a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+([-'\s][a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+)?$/;
            
    btnOrder.addEventListener('click', validation);
            
      function validation(event){
         //Si le champ est vide
           if (firstName.validity.valueMissing){
            event.preventDefault();
            errorFirstName.textContent = 'Prénom manquant';
            errorFirstName.style.color = 'red';
              //Si le format de données est incorrect
              }else if (prenomValid.test(firstName.value) == false){
                event.preventDefault();
                errorFirstName.textContent = 'Format incorrect';
                errorFirstName.style.color = 'orange';
                }else{ 
                }
            }
  }
    







}