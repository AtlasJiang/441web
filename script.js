// Atlas

// Object containing the prices of each course
const coursePrices = {
    "Course 1": 15,
    "Course 2": 20,
    "Course 3": 25,
    "Course 4": 30,
    "Course 5": 35
};

let cart = {
    "Course 1": 0,
    "Course 2": 0,
    "Course 3": 0,
    "Course 4": 0,
    "Course 5": 0
};

document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('course.html')) {
        checkLoginStatus();
    }

    // Event listeners for each course's add and remove buttons
    const courses = document.querySelectorAll('.course');
    courses.forEach(course => {
        const addButton = course.querySelector('button');
        const courseName = course.querySelector('h2').textContent;

        addButton.addEventListener('click', () => {
            const quantityInput = course.querySelector('input[type="text"]');
            const quantity = parseInt(quantityInput.value.trim());
            if (quantity > 0) {
                cart[courseName] += quantity;
                updateCartItems();
                updateTotalPrice();
            } else {
                alert("Please enter a valid quantity.");
            }
        });

        const removeButton = course.querySelector('.remove-course');
        removeButton.addEventListener('click', () => {
            cart[courseName] = 0;
            const quantityInput = course.querySelector('input[type="text"]');
            quantityInput.value = '';
            updateCartItems();
            updateTotalPrice();
        });
    });

    const clearCartButton = document.querySelector('.clear-cart');
    clearCartButton.addEventListener('click', () => {
        Object.keys(cart).forEach(course => cart[course] = 0);
        document.querySelectorAll('.course input[type="text"]').forEach(input => input.value = '');
        updateCartItems();
        updateTotalPrice();
    });

    const checkoutButton = document.querySelector('.checkout');
    checkoutButton.addEventListener('click', () => {
        let totalPrice = 0;
        Object.keys(cart).forEach(course => totalPrice += cart[course] * coursePrices[course]);
        alert(`You should pay Atlas for $${totalPrice}`); // Display total price
    });

    // Initial rendering of the cart items
    updateCartItems();
    updateTotalPrice();
});

function checkLoginStatus() {
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        console.log("User is not logged in. Redirecting to login page...");
        window.location.href = 'login.html';
    } else {
        console.log("User is logged in. Access granted.");
    }
}

// Function to render the cart items
function updateCartItems() {
    const cartItemsContainer = document.getElementById('cartItems');
    cartItemsContainer.innerHTML = ''; // Clear the container
    let hasItems = false;
    Object.keys(cart).forEach(course => {
        if (cart[course] > 0) {
            hasItems = true;
            const itemDiv = document.createElement('div');
            itemDiv.className = 'cart-item';
            itemDiv.innerHTML = `<strong>${course}</strong>: ${cart[course]} x $${coursePrices[course]} = $${cart[course] * coursePrices[course]}`;
            cartItemsContainer.appendChild(itemDiv);
        }
    });
    if (!hasItems) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
    }
}

// Function to update the total price based on the items in the cart
function updateTotalPrice() {
    let totalPrice = 0;
    Object.keys(cart).forEach(course => totalPrice += cart[course] * coursePrices[course]);
    const totalPriceElement = document.querySelector('.total-price-section h2');
    totalPriceElement.textContent = `Total Price for All Courses: $${totalPrice}`;
}

document.getElementById('logoutButton')?.addEventListener('click', function() {
    localStorage.removeItem('isLoggedIn'); // Remove isLoggedIn from localStorage
    window.location.href = 'login.html';
});