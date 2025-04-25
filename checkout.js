

document.addEventListener('DOMContentLoaded', function () {
    const checkoutItemsTable = document.getElementById('checkout-items');
    const checkoutTotal = document.getElementById('checkout-total');
    
    const orderItems = JSON.parse(localStorage.getItem('orderItems')) || [];
    
    let total = 0;
    
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
    
    checkoutTotal.textContent = `$${total.toFixed(2)}`;
});



// Pay Now button
const payNowBtn = document.getElementById('pay-now');

payNowBtn.addEventListener('click', function () {
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
        return; 
    }

    // show the success message
    document.getElementById('checkout-page').style.display = 'none';
    document.getElementById('success-page').style.display = 'block';

    // Display the delivery date
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 3);
    document.getElementById('delivery-date').textContent =
        `Estimated Delivery Date: ${deliveryDate.toDateString()}`;
        localStorage.removeItem('orderItems');

});


