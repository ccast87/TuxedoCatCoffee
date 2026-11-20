
"use strict";

const getElement = selector => document.querySelector(selector);

// Coffee shop menu items and prices
const products = {
    espresso: { name: "Espresso", price: 1.95 },
    latte: { name: "Latte", price: 2.95 },
    cappuccino: { name: "Cappuccino", price: 3.45 },
    coffee: { name: "Drip Coffee", price: 1.75 },
    biscotti: { name: "Biscotti", price: 1.95 },
    scone: { name: "Scone", price: 2.95 }
};

// Get the product name from the image filename
const getSelectedProduct = src => {
    const filename = src.split("/").pop();
    const product = filename.replace("_info.jpg", "").replace(".jpg", "");

    return product;
};

document.addEventListener("DOMContentLoaded", () => {

    // Get all menu images
    const images = document.querySelectorAll("#menu-list img");

    for (let image of images) {
        const originalSrc = image.src;

        // Show product information when hovering
        image.addEventListener("mouseover", () => {
            image.src = image.id;
        });

        // Restore original image when mouse leaves
        image.addEventListener("mouseout", () => {
            image.src = originalSrc;
        });

        // Add the selected product to the order
        image.addEventListener("click", event => {
            event.preventDefault();

            const productName = getSelectedProduct(image.id);
            const product = products[productName];

            // Create a new option in the order list
            const option = document.createElement("option");

            option.textContent = product.name + " - $" +
                product.price.toFixed(2);

            option.value = product.price;

            getElement("#order").appendChild(option);

            // Calculate the total of all items in the order
            let total = 0;

            for (let item of getElement("#order").options) {
                total += Number(item.value);
            }

            // Display the order total
            getElement("#total").textContent =
                "Total: $" + total.toFixed(2);
        });
    }

    // Clear all items from the order
    getElement("#clear_order").addEventListener("click", () => {
        getElement("#order").innerHTML = "";
        getElement("#total").textContent = "";
    });

    // Open the checkout page
    getElement("#place_order").addEventListener("click", () => {
        window.location.href = "checkout.html";
    });

});
