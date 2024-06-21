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
            cart[courseName] += quantity; 
            updateTotalPrice(); 
        });

        const removeButton = course.querySelector('.remove-course');
        removeButton.addEventListener('click', () => {
            cart[courseName] = 0; 
            const quantityInput = course.querySelector('input[type="text"]');
            quantityInput.value = '';
            updateTotalPrice(); 
        });
    });

    const clearCartButton = document.querySelector('.clear-cart');
    clearCartButton.addEventListener('click', () => {
        Object.keys(cart).forEach(course => cart[course] = 0); 
        document.querySelectorAll('.course input[type="text"]').forEach(input => input.value = '');
        updateTotalPrice(); 
    });

    const checkoutButton = document.querySelector('.checkout');
    checkoutButton.addEventListener('click', () => {
        let totalPrice = 0;
        Object.keys(cart).forEach(course => totalPrice += cart[course] * coursePrices[course]);
        alert(`You should pay Atlas for $${totalPrice}`); // Display total price
    });
});


function checkLoginStatus() {
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        console.log("User is not logged in. Redirecting to login page...");
        window.location.href = 'login.html'; 
    } else {
        console.log("User is logged in. Access granted.");
    }
}

document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const storedEmail = localStorage.getItem('userEmail');
    const storedPassword = localStorage.getItem('userPassword');

    if (email === storedEmail && password === storedPassword) {
        localStorage.setItem('isLoggedIn', 'true'); 
        window.location.href = 'shop.html';
    } else { 
        alert('Incorrect email or password.');
    }
});

document.getElementById('registerForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password === confirmPassword) {
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userPassword', password);
        alert('Registration successful! You can now login.');
        window.location.href = 'login.html';
    } else {
        alert('Passwords do not match.');
    }
});
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
document.getElementById('loginForm').addEventListener('submit', function(event) {  
    event.preventDefault(); // 阻止表单的默认提交行为  
    window.location.href = 'shop.html'; // 直接跳转到shop.html页面  
});