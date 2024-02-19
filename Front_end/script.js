document.addEventListener("DOMContentLoaded", function() {
const productList = document.getElementById("product-list");
var selectElement = document.getElementById("product-filter");

var selectedValue = selectElement.value;
    console.log("Selected value: " + selectedValue);
    fetch(`http://192.168.0.198:3000/api/clothes?category=${selectedValue}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log("data: " + data.clothes);
            productList.innerHTML = '';

            data.clothes.forEach(product => {
                const productItem = document.createElement("div");
                productItem.className = "col-2";
                productItem.innerHTML = `
                    <img src = "https://raw.githubusercontent.com/alexeygrigorev/clothing-dataset/master/images/${product.imageId}.jpg">
                    <h2>${product.name}</h2>
                    <p>${product.size}<p>
                `;
                productList.appendChild(productItem);
            });
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });

selectElement.addEventListener("change", function() {
    var selectedValue = selectElement.value;
    console.log("Selected value: " + selectedValue);
    fetch(`http://192.168.198.240:3000/api/clothes?category=${selectedValue}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log("data: " + data.clothes);
            productList.innerHTML = '';

            data.clothes.forEach(product => {
                const productItem = document.createElement("div");
                productItem.className = "col-2";
                productItem.innerHTML = `
                    <img src = "https://raw.githubusercontent.com/alexeygrigorev/clothing-dataset/master/images/${product.imageId}.jpg">
                    <h2>${product.name}</h2>
                    <p>${product.size}<p>
                `;
                productList.appendChild(productItem);
            });
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
});
});




