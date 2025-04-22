// checkout.js

document.addEventListener('DOMContentLoaded', function () {
    const checkoutItemsTable = document.getElementById('checkout-items');
    const checkoutTotal = document.getElementById('checkout-total');
    
    // Retrieve order summary from localStorage
    const orderItems = JSON.parse(localStorage.getItem('orderItems')) || [];
    
    let total = 0;
    
    // Populate the table with order items
    orderItems.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td>$${item.total.toFixed(2)}</td>
        `;
        checkoutItemsTable.appendChild(row);
        
        total += item.total;
    });
    
    // Update total price
    checkoutTotal.textContent = `$${total.toFixed(2)}`;
});

// Back to Order button
/*const backToOrderBtn = document.getElementById('back-to-order');
backToOrderBtn.addEventListener('click', function () {
    window.location.href = 'index.html'; // Redirect back to the order page
});*/

// Pay Now button
const payNowBtn = document.getElementById('pay-now');

payNowBtn.addEventListener('click', function () {
    // Get required form fields
    const fullName = document.getElementById('full-name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const address = document.getElementById('address').value.trim();
    const city = document.getElementById('city').value.trim();
    const cardName = document.getElementById('card-name').value.trim();
    const cardNumber = document.getElementById('card-number').value.trim();
    const cvv = document.getElementById('cvv').value.trim();

    // Check if any field is empty
    if (
        fullName === '' ||
        email === '' ||
        phone === '' ||
        address === '' ||
        city === '' ||
        cardName === '' ||
        cardNumber === '' ||
        cvv === ''
    ) {
        alert('Please fill in all the required fields before proceeding.');
        return; // Stop further execution if validation fails
    }

    // If all fields are filled, show the success message
    document.getElementById('checkout-page').style.display = 'none';
    document.getElementById('success-page').style.display = 'block';

    // Display the delivery date (2 days later)
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 2);
    document.getElementById('delivery-date').textContent =
        `Estimated Delivery Date: ${deliveryDate.toDateString()}`;
        localStorage.removeItem('orderItems');

});

// New Order button
/*const newOrderBtn = document.getElementById('new-order');
newOrderBtn.addEventListener('click', function () {
    localStorage.removeItem('orderItems');
    window.location.href = 'index.html'; // Redirect back to the order page
});*/
