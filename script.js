window.onload = function() {
    alert('Welcome to our site!');
};
document.getElementById("menu-link").addEventListener("click", function(event) {
    event.preventDefault();  
    const menuList = document.getElementById("menu-list");
    if (menuList.style.display === "none" || menuList.style.display === "") {
        menuList.style.display = "block"; // Show the menu list
    } else {
        menuList.style.display = "none"; // Hide the menu list
    }
});
document.getElementById("category-link").addEventListener("click", function(event) {
    event.preventDefault();  
    
    const categoryDropdown = document.getElementById("category-dropdown");
    if (categoryDropdown.style.display === "none" || categoryDropdown.style.display === "") {
        categoryDropdown.style.display = "block"; // Show the dropdown
    } else {
        categoryDropdown.style.display = "none";  // Hide the dropdown
    }
});
window.addEventListener("click", function(event) {
    const categoryDropdown = document.getElementById("category-dropdown");
    const categoryLink = document.getElementById("category-link");

    if (!categoryLink.contains(event.target) && !categoryDropdown.contains(event.target)) {
        categoryDropdown.style.display = "none";  // Hide the dropdown if clicked outside
    }
});
var modal = document.getElementById("contact-modal");
var contactLink = document.getElementById("contact-us-link");
var closeModalBtn = document.getElementById("close-modal-btn");
contactLink.addEventListener("click", function(event) {
    event.preventDefault();  // Prevent default action
    modal.style.display = "block";  // Show the modal
});
closeModalBtn.addEventListener("click", function() {
    modal.style.display = "none";  // Hide the modal
});
window.addEventListener("click", function(event) {
    if (event.target === modal) {
        modal.style.display = "none";  // Hide the modal if clicked outside
    }
});
window.addEventListener("click", function(event) {
    const menuList = document.getElementById("menu-list");
    const menuLink = document.getElementById("menu-link");

    if (!menuLink.contains(event.target) && !menuList.contains(event.target)) {
        menuList.style.display = "none"; // Hide the menu if clicked outside
    }
});

document.getElementById("search-icon").addEventListener("click", function() {
    const searchBox = document.getElementById("search-box");

    // Toggle the search box display
    if (searchBox.style.display === "none" || searchBox.style.display === "") {
        searchBox.style.display = "block";  // Show the search box
    } else {
        searchBox.style.display = "none";   // Hide the search box
    }
});
let cart = [];

function addToCart(name, price, calories) {
    // Find if item already exists in the cart
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        // If item exists, just increase the quantity
        existingItem.quantity += 1;
    } else {
        // If not, add a new item
        cart.push({ name, price, calories, quantity: 1 });
    }

    // Call function to update cart display
    updateCart();
}

// Function to update cart display in the UI
function updateCart() {
    const cartContainer = document.getElementById("cart-items");
    cartContainer.innerHTML = ""; // Clear cart display

    let total = 0;

    // Loop through cart array to display items and calculate total price
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        cartContainer.innerHTML += `
            <div class="cart-item">
                <h4>${item.name} - Rs. ${item.price} x ${item.quantity} = Rs. ${itemTotal}</h4>
                <p>${item.calories * item.quantity} cal</p>
                <button class="remove-item" data-name="${item.name}">Remove</button>
            </div>
        `;
    });

    // Update total price in the UI
    document.getElementById("cart-total").innerText = `Total: Rs. ${total}`;
}

// Function to remove item from cart
function removeFromCart(name) {
    // Find the index of the item to remove
    const itemIndex = cart.findIndex(item => item.name === name);

    if (itemIndex !== -1) {
        // Decrease quantity or remove item completely if quantity is 1
        cart[itemIndex].quantity -= 1;
        
        if (cart[itemIndex].quantity === 0) {
            cart.splice(itemIndex, 1); // Remove the item completely from the cart
        }
    }

    // Call function to update cart display
    updateCart();
}

// Event listener for the 'Add to Cart' buttons
document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", function () {
        const name = this.getAttribute("data-name");
        const price = parseFloat(this.getAttribute("data-price"));
        const calories = parseFloat(this.getAttribute("data-calories"));

        addToCart(name, price, calories);
    });
});

// Event listener for the 'Remove' buttons inside the cart
document.getElementById("cart-items").addEventListener("click", function (event) {
    if (event.target && event.target.classList.contains("remove-item")) {
        const name = event.target.getAttribute("data-name");
        removeFromCart(name);
    }
});


document.getElementById('pay-btn').addEventListener('click', function() {
    // Show an alert when the "Pay Now" button is clicked
    alert(' your order Id is #gp123978R');

    // Simulating the payment process (like opening a scanner or QR code)
    showPaymentScanner();  // You can replace this with actual payment logic
});
// Open the "Track Your Order" modal
document.getElementById("track-order-link").onclick = function() {
    document.getElementById("track-order-modal").style.display = "block";
  };
  
  // Close the modal when the close button is clicked
  document.getElementById("close-track-modal-btn").onclick = function() {
    document.getElementById("track-order-modal").style.display = "none";
  };
  
  // Optionally, close the modal when clicking outside of the modal
  window.onclick = function(event) {
    if (event.target == document.getElementById("track-order-modal")) {
      document.getElementById("track-order-modal").style.display = "none";
    }
  };
  
  // Automatically show "Your order is on the way" message when the "Track Order" button is clicked
  document.getElementById("track-order-btn").onclick = function() {
    // Display the order status message
    document.getElementById("order-status").innerText = "Your order is on the way.";
  };
 // Open the review modal
document.getElementById('review-link').addEventListener('click', function() {
    document.getElementById('review-modal').style.display = 'block';
});

// Close Modal
document.querySelector('.close').addEventListener('click', function() {
    document.getElementById('review-modal').style.display = 'none';
});

// Handle star selection
const stars = document.querySelectorAll('.star');
let selectedRating = 0; // To store the current rating

stars.forEach(star => {
  star.addEventListener('click', function() {
    selectedRating = parseInt(star.getAttribute('data-value')); // Get the value of the clicked star

    // Remove the 'selected' class from all stars
    stars.forEach(s => s.classList.remove('selected'));

    // Add 'selected' class to the clicked star and all previous stars
    for (let i = 0; i < selectedRating; i++) {
      stars[i].classList.add('selected');
    }
  });
});

// Submit Review
document.getElementById('submit-review').addEventListener('click', function() {
    const reviewText = document.getElementById('review-text').value;

    if (reviewText && selectedRating > 0) {
      // Show thank you alert with rating and review
      alert(`Thank you for your rating of ${selectedRating} star${selectedRating > 1 ? 's' : ''}! Your review: "${reviewText}"`);
      
      // Optional: You can now send this data to your backend using AJAX or fetch
      
      // Optionally, close the modal after submission
      document.getElementById('review-modal').style.display = 'none';
    } else {
      alert('Please select a rating and write a review.');
    }
});



  
  // Get modal elements
const loginModal = document.getElementById('login-modal');
const signupModal = document.getElementById('signup-modal');
const loginLink = document.getElementById('login-link');
const closeBtn = document.getElementById('close-btn');
const closeSignupBtn = document.getElementById('close-signup-btn');
const createAccountLink = document.getElementById('create-account-link');

// Open login modal when clicking the login link
loginLink.addEventListener('click', function(e) {
  e.preventDefault();
  loginModal.style.display = 'block';
});

// Close login modal when clicking the close button
closeBtn.addEventListener('click', function() {
  loginModal.style.display = 'none';
});

// Open sign-up modal when clicking on "Create a new account"
createAccountLink.addEventListener('click', function(e) {
  e.preventDefault();
  loginModal.style.display = 'none';
  signupModal.style.display = 'block';
});

// Close sign-up modal when clicking the close button
closeSignupBtn.addEventListener('click', function() {
  signupModal.style.display = 'none';
});
// Pay Now Button click event
document.getElementById('pay-btn').addEventListener('click', function() {
    // Show confirmation modal
    document.getElementById('confirmation-modal').style.display = 'block';
  });
  // No Button (Close modal and go back)
  document.getElementById('no-btn').addEventListener('click', function() {
    // Close the confirmation modal
    document.getElementById('confirmation-modal').style.display = 'none';
    
    // Optionally, you can simulate going back (using history.back(), or redirecting to a previous page)
    window.history.back();  // Or use window.location.href to redirect to a specific page
  });
  
  // Yes Button (Show the scanner)
  document.getElementById('yes-btn').addEventListener('click', function() {
    // Close the confirmation modal
    document.getElementById('confirmation-modal').style.display = 'none';
    
    // Show the scanner
    document.getElementById('scanner').style.display = 'block';
  
    // Here you can implement your scanner functionality (like QR code scanning or any other scanner you need)
  });
  // Initialize the QR Code scanner
  
  // Get the "Yes" button, "No" button, and the image element
const yesButton = document.getElementById('yes-btn');
const noButton = document.getElementById('no-btn');
const scannerPhoto = document.getElementById('scanner-photo');

// Add event listener to the "Yes" button
yesButton.addEventListener('click', function() {
    // Show the image when the "Yes" button is clicked
    scannerPhoto.style.display = 'block';
});

// Add event listener to the "No" button
noButton.addEventListener('click', function() {
    // Go back to the previous page when the "No" button is clicked
    window.history.back();
});

