/* global Cart */
'use strict';

// Create an event listener so that when the delete link is clicked, the removeItemFromCart method is invoked.
var table = document.getElementById('cart');
table.addEventListener('click', removeItemFromCart);
var cart;

function loadCart() {
  var cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  cart = new Cart(cartItems);
}

// Make magic happen --- re-pull the Cart, clear out the screen and re-draw it
function renderCart() {
  loadCart();
  clearCart();
  showCart();
}

// TODO: Remove all of the rows (tr) in the cart table (tbody)
function clearCart() {
  var table = document.getElementById('cart');
  var tbody = table.children[1];
  while (tbody.firstChild) {
    tbody.removeChild(tbody.firstChild);
  }
}

// TODO: Fill in the <tr>'s under the <tbody> for each item in the cart
function showCart() {
  // TODO: Find the table body
  var table = document.getElementById('cart');
  var tbody = table.children[1];

  // TODO: Iterate over the items in the cart
  // TODO: Create a TR
  // TODO: Create a TD for the delete link, quantity,  and the item
  // TODO: Add the TR to the TBODY and each of the TD's to the TR
  for (let i = 0; i < cart.items.length; i++) {
    var tr = document.createElement('tr');
    var tdDelete = document.createElement('td');
    var deleteLink = document.createElement('a');
    deleteLink.textContent = 'X';
    deleteLink.href = '#';
    deleteLink.id = i;
    tdDelete.appendChild(deleteLink);

    var tdQuantity = document.createElement('td');
    tdQuantity.textContent = cart.items[i].quantity;

    var tdItem = document.createElement('td');
    tdItem.textContent = cart.items[i].product.name;

    // append td's to tr and tr to tbody
    tr.appendChild(tdDelete);
    tr.appendChild(tdQuantity);
    tr.appendChild(tdItem);
    tbody.appendChild(tr);
  }
}

function removeItemFromCart(event) {
  // TODO: When a delete link is clicked, use cart.removeItem to remove the correct item
  // TODO: Save the cart back to local storage
  // TODO: Re-draw the cart table
  event.preventDefault();
  event.stopPropagation();

  console.log(event.target.id);
  if (event.target.id) {
    var id = Number(event.target.id);
    console.log(id);
    cart.removeItem(id);
    cart.saveToLocalStorage();
    clearCart();
    showCart();
  }
}

// This will initialize the page and draw the cart on screen
renderCart();
