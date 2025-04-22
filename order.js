window.addEventListener('DOMContentLoaded', function () {
    const addToFavoritesBtn = document.getElementById('add-to-favorites');
    const applyFavoritesBtn = document.getElementById('apply-favorites');
    const buyNowBtn = document.getElementById('buy-now');

    const orderItemsTable = document.getElementById('order-items');
    const orderTotal = document.getElementById('order-total');

    // 🧹 Reset all selects to 0 on page load
    document.querySelectorAll('select').forEach(select => {
        select.value = "0";
    });

    // Function to update the order summary table
    function collectOrderItems() {
        orderItemsTable.innerHTML = '';
        let total = 0;
        const orderData = {};

        document.querySelectorAll('select').forEach(select => {
            const quantity = parseInt(select.value);
            const price = parseFloat(select.getAttribute('data-price'));

            if (quantity > 0) {
                const label = select.parentElement.querySelector('label').textContent;
                const itemTotal = (price * quantity).toFixed(2);
                total += parseFloat(itemTotal);

                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${label}</td>
                    <td>${quantity}</td>
                    <td>$${price.toFixed(2)}</td>
                    <td>$${itemTotal}</td>
                    <td><button class="remove-btn" data-select-id="${select.id}">Remove</button></td>
                `;
                orderItemsTable.appendChild(row);

                orderData[select.id] = quantity;
            }
        });

        orderTotal.textContent = `$${total.toFixed(2)}`;

        // Remove button functionality
        document.querySelectorAll('.remove-btn').forEach(button => {
            button.addEventListener('click', function () {
                const selectId = this.getAttribute('data-select-id');
                const select = document.getElementById(selectId);
                if (select) {
                    let currentQuantity = parseInt(select.value);
                    select.value = currentQuantity > 1 ? currentQuantity - 1 : 0;
                    collectOrderItems();
                }
            });
        });
    }

    // On any dropdown change, update the summary
    document.querySelectorAll('select').forEach(select => {
        select.addEventListener('change', collectOrderItems);
    });

    // Save as favorites
    addToFavoritesBtn.addEventListener('click', function () {
        const favorites = {};

        document.querySelectorAll('select').forEach(select => {
            if (parseInt(select.value) > 0) {
                favorites[select.id] = select.value;
            }
        });

        localStorage.setItem('computerPartsFavorites', JSON.stringify(favorites));
        alert('Your current order has been saved as favorites!');
    });

    // Apply favorites
    applyFavoritesBtn.addEventListener('click', function () {
        const favorites = JSON.parse(localStorage.getItem('computerPartsFavorites')) || {};

        for (const [id, value] of Object.entries(favorites)) {
            const select = document.getElementById(id);
            if (select) {
                select.value = value;
            }
        }

        collectOrderItems();
        alert('Your favorites have been applied to the current order!');
    });

    // Initialize order summary on page load
    collectOrderItems();

    // 🛒 Buy Now functionality
    buyNowBtn.addEventListener('click', function () {
        const orderItems = [];

        document.querySelectorAll('select').forEach(select => {
            if (parseInt(select.value) > 0) {
                const item = {
                    name: select.parentElement.querySelector('label').textContent,
                    quantity: select.value,
                    price: parseFloat(select.dataset.price),
                    total: parseFloat(select.dataset.price) * parseInt(select.value)
                };
                orderItems.push(item);
            }
        });

        if (orderItems.length === 0) {
            alert('Your cart is empty. Please select at least one item before continuing.');
            return;
        }

        // Save to localStorage and go to checkout
        localStorage.setItem('orderItems', JSON.stringify(orderItems));
        window.location.href = 'checkout.html';
    });
});
