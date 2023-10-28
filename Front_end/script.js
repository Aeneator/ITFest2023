// Select the HTML element where you want to display the products
const productList = document.getElementById("product-list");

// Fetch data from the API
fetch('https://api.example.com/products') // Replace with the actual API URL
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Iterate through the product data and create HTML elements for each product
        data.forEach(product => {
            const productItem = document.createElement("div");
            productItem.className = "product-item";
            productItem.innerHTML = `
                <h2>${product.name}</h2>
                <p>Description: ${product.description}</p>
            `;
            productList.appendChild(productItem);
        });
    })
    .catch(error => {
        console.error('Fetch error:', error);
    });

