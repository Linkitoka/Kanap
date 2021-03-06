// S'execute au chargement de la page
window.addEventListener('load', function () {
  // Injecte les données de l'API furniture
  load_furnitures();
});



// Rempli la div meubles avec les données de l'API furniture
function load_furnitures() {


  let cart = JSON.parse(localStorage.getItem("panierLocalStorage"));

  // Creation du code html pour le panier
  let addProductInCard = document.getElementById("cart__items");
  // Creation du code html pour le panier VIDE
  let addCartProduct = document.getElementById("cartAndFormContainer");
  // Creation du code html pour le totalquantity du panier
  let totalQuantity = document.getElementById("totalQuantity");
  // Creation du code html pour le totalprice du panier
  let totalPrice = document.getElementById("totalPrice");

  //SI le panier est vide alors function vide SINON boucle pour récupéré les objects dans le LocalStorage
  if (!cart) {
    addCartProduct.innerHTML = cartEmptyFunction();

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
  function deleteItem() {
    let buttons = document.querySelectorAll(".deleteItem");
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        let id = button.parentElement.parentElement.parentElement.parentElement.dataset.id;
        let color = button.parentElement.parentElement.parentElement.parentElement.dataset.color;
        let cart = JSON.parse(localStorage.getItem("panierLocalStorage"));
        delete cart[id].quantity[color];
        localStorage.setItem("panierLocalStorage", JSON.stringify(cart));
        let total = getTotal(cart);
        totalQuantity.innerHTML = total.quantity;
        totalPrice.innerHTML = total.total;
        button.parentElement.parentElement.parentElement.parentElement.remove();
      })
    })
  }
  
  //Function pour ajouter ou enlever un produit via les inputs.
  function addEvents() {
    let inputs = document.querySelectorAll(".itemQuantity");
    inputs.forEach(input => {
      input.addEventListener('change', () => {
        let id = input.parentElement.parentElement.parentElement.parentElement.dataset.id;
        let color = input.parentElement.parentElement.parentElement.parentElement.dataset.color;
        let quantity = input.value;
        let cart = JSON.parse(localStorage.getItem("panierLocalStorage"));
        cart[id].quantity[color] = parseInt(quantity);
        localStorage.setItem("panierLocalStorage", JSON.stringify(cart));
        let total = getTotal(cart);
        totalQuantity.innerHTML = total.quantity;
        totalPrice.innerHTML = total.total;
      })
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
      totalPrice += quantity * products[object].price;
    }
    return { quantity: totalQuantity, total: totalPrice };
  }
  // function vérifie les formule
  function verificationFirstName() {
    let firstName = document.getElementById("firstName");
    let errorFirstName = document.getElementById("firstNameErrorMsg");
    let nameValid = /^[a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+([-'\s][a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+)?$/;

    if (firstName.validity.valueMissing) {
      errorFirstName.textContent = 'Prénom manquant';
    } else if (nameValid.test(firstName.value) == false) {
      errorFirstName.textContent = 'Format incorrect';
    } else if (nameValid.test(firstName.value) == true) {
      errorFirstName.textContent = null;
      return lastName.value;
    }
    return false;
  }

  function verificationLastName() {
    let lastName = document.getElementById("lastName");
    let errorLastName = document.getElementById("lastNameErrorMsg");
    let nameValid = /^[a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+([-'\s][a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+)?$/;

    if (lastName.validity.valueMissing) {
      errorLastName.textContent = 'Nom manquant';
    } else if (nameValid.test(lastName.value) == false) {
      errorLastName.textContent = 'Format incorrect';
    } else if (nameValid.test(lastName.value) == true) {
      errorLastName.textContent = null;
      return lastName.value;
    }
    return false;
  }

  function verificationAddress() {
    let address = document.getElementById("address");
    let errorAddress = document.getElementById("addressErrorMsg");
    let nameValid = /^[a-zA-ZéèîïÉÈÎÏ0-9]+([-'\s][a-zA-ZéèîïÉÈÎÏ0-9][a-zéèêàçîï]+)+$/;

    if (address.validity.valueMissing) {
      errorAddress.textContent = 'Adresse manquante';
    } else if (nameValid.test(address.value) == false) {
      errorAddress.textContent = 'Format incorrect';
    } else if (nameValid.test(address.value) == true) {
      errorAddress.textContent = null;
      return address.value;
    }
    return false;
  }

  function verificationCity() {
    //champs a vérifier..
    let city = document.getElementById("city");
    let errorCity = document.getElementById("cityErrorMsg");
    let nameValid = /^[a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+([-'\s][a-zA-ZéèîïÉÈÎÏ0-9][a-zéèêàçîï0-9]+)*$/;

    if (city.validity.valueMissing) {
      errorCity.textContent = 'Ville manquante';
    } else if (nameValid.test(city.value) == false) {
      errorCity.textContent = 'Format incorrect';
    } else if (nameValid.test(city.value) == true) {
      errorCity.textContent = null;
      return city.value;
    }
    return false
  }

  function verificationEmail() {
    let email = document.getElementById("email");
    let errorEmail = document.getElementById("emailErrorMsg");
    let nameValid = /^[a-zA-Z-0-9]+@[a-zA-Z-]+\.[a-zA-Z]{2,6}$/;

    if (email.validity.valueMissing) {
      errorEmail.textContent = 'Email manquant';
    } else if (nameValid.test(email.value) == false) {
      errorEmail.textContent = 'Format incorrect';
    } else if (nameValid.test(email.value) == true) {
      errorEmail.textContent = null;
      return email.value;
    }
    return false;

  }

  let btnOrder = document.getElementById("order");
  
  btnOrder.addEventListener('click', e => {
    e.preventDefault();
    let valid = 1;
    let contact = {};
    let firstName = verificationFirstName();
    let lastName = verificationLastName();
    let address = verificationAddress();
    let city = verificationCity();
    let email = verificationEmail();

    if (email) {
      contact["firstName"] = firstName;
      contact["lastName"] = lastName;
      contact["address"] = address;
      contact["city"] = city;
      contact["email"] = email;
    } else {
      valid = 0;
    }
    
      // Si tous les champs son correct alors fetch vers le order
    let arrayContact = []
    for (let id in cart) {
      arrayContact.push(id);
    }
    
    if (valid) {
      fetch(`http://localhost:3000/api/products/order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contact, products: arrayContact })
      })
        .then(Response => Response.json())
        .then(Response => {
          localStorage.setItem("orderId", Response.orderId);
          
          // Add orderid avec confirmation
          document.location.href = "confirmation.html";
        })
    }
  });
}