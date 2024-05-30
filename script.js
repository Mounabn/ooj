// Classe représentant un produit
class Product {
    constructor(id, name, price) {
      this.id = id; 
      this.name = name; 
      this.price = price; 
    }
  }
  
  // Classe représentant un article dans le panier
  class ShoppingCartItem {
    constructor(product, quantity = 1) {
      this.product = product; 
      this.quantity = quantity; 
    }
  
    // Méthode pour calculer le prix total de l'article
    getTotalPrice() {
      return this.product.price * this.quantity;
    }
  }
  
  // Classe représentant le panier d'achat
  class ShoppingCart {
    constructor() {
      this.items = [];
    }
  
    // Méthode pour ajouter un article au panier
    addItem(product) {
      const existingItem = this.items.find(item => item.product.id === product.id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        this.items.push(new ShoppingCartItem(product));
      }
      this.displayCart(); 
    }
  
    // Méthode pour supprimer un article du panier
    removeItem(productId) {
      this.items = this.items.filter(item => item.product.id !== productId);
      this.displayCart(); 
    }
  
    // Méthode pour obtenir le total des prix des articles dans le panier
    getTotalPrice() {
      return this.items.reduce((total, item) => total + item.getTotalPrice(), 0);
    }
  
    // Méthode pour afficher les articles du panier dans le DOM
    displayCart() {
      const cartElement = document.getElementById("cart"); 
      cartElement.innerHTML = ""; 
  
      // Parcourir les articles du panier et les ajouter au DOM
      this.items.forEach(item => {
        const itemElement = document.createElement("div"); 
        itemElement.classList.add("item"); 
        const nameElement = document.createElement("span"); 
        nameElement.textContent = item.product.name; 
        itemElement.appendChild(nameElement); 
  
        const quantityElement = document.createElement("span"); 
        quantityElement.textContent = "Quantity: " + item.quantity; 
        itemElement.appendChild(quantityElement);

        const increaseButton = document.createElement("button"); 
        increaseButton.textContent = "+"; 
        increaseButton.addEventListener("click", () => {
          item.quantity++;
          quantityElement.textContent = "Quantity: " + item.quantity;
          this.updateTotalPrice(); 
        });
        itemElement.appendChild(increaseButton);
  
        const decreaseButton = document.createElement("button");
        decreaseButton.textContent = "-"; 
        decreaseButton.addEventListener("click", () => {
          if (item.quantity > 1) {
            item.quantity--;
            quantityElement.textContent = "Quantity: " + item.quantity; 
          } else {
            this.removeItem(item.product.id); 
          }
          this.updateTotalPrice();
        });
        itemElement.appendChild(decreaseButton); 
       
       
    
  
        const deleteButton = document.createElement("button"); 
        deleteButton.textContent = "Delete"; 
        deleteButton.addEventListener("click", () => {
          this.removeItem(item.product.id); 
          this.updateTotalPrice(); 
        });
        itemElement.appendChild(deleteButton); 
  
        const likeButton = document.createElement("button"); 
        likeButton.textContent = "Like"; 
        likeButton.classList.add("like-button"); 
        likeButton.addEventListener("click", () => {
          likeButton.classList.toggle("liked"); 
          if (likeButton.classList.contains("liked")) {
            item.product.isLiked = true; 
            likeButton.style.color = "red"; 
          } else {
            item.product.isLiked = false; 
            likeButton.style.color = "black"; 
          }
        });
        itemElement.appendChild(likeButton); 
        cartElement.appendChild(itemElement); 
      });
  
      this.updateTotalPrice(); 
    }
  
    // Méthode pour mettre à jour le prix total affiché
    updateTotalPrice() {
      const totalPriceElement = document.getElementById("total-price"); 
      totalPriceElement.textContent = "Total Price: $" + this.getTotalPrice(); 
    }
  }
  
  // Créer des instances de produit
  const products = [
    new Product(1, "PRODUIT 1", 10), 
    new Product(2, "PRODUIT 2", 20), 
    new Product(3, "PRODUIT 3", 15), 
    new Product(4, "PRODUIT 4", 15), 
  ];
  
  // Créer une instance du panier d'achat
  const cart = new ShoppingCart();
  
  // Ajouter des produits au panier pour démonstration
  products.forEach(product => cart.addItem(product)); 