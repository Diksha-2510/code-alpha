document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:5000/products") // Get products from backend
        .then(response => response.json())
        .then(products => {
            let productsContainer = document.getElementById("products");
            products.forEach(product => {
                let div = document.createElement("div");
                div.classList.add("product");
                div.innerHTML = `
                    <h3>${product.name}</h3>
                    <p>Price: $${product.price}</p>
                    <button onclick="addToCart('${product.name}', ${product.price})">Add to Cart</button>
                `;
                productsContainer.appendChild(div);
            });
        });

    window.addToCart = (name, price) => {
        let cart = document.getElementById("cart");
        let item = document.createElement("li");
        item.textContent = `${name} - $${price}`;
        cart.appendChild(item);
    };
});
