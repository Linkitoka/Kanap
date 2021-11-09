orderIdClear();

function orderIdClear() {
    const orderId = document.querySelector("orderid");
    orderId.innerText = localStorage.getItem("orderId");
  
    // On vide le localStorage pour recommencer plus tard le processus d'achat
    localStorage.clear(); 
  }