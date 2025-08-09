let allProducts = []
let cartlist = [];

fetch("https://dummyjson.com/products")
.then((response) => response.json())
.then(data => {
    allProducts = data.products;
    renderProducts(allProducts);
    
});

function renderProducts(products) {
    const container = document.getElementById('product-list');
    container.innerHTML = '';

    products.forEach(product => {
        const cart = document.createElement("article");
        cart.className = "bg-black/75 rounded-lg border border-orange-600";
        cart.innerHTML = `
            <img src="${product.images[0]}" alt="${product.title}" class="object-contain">
            <div class="flex justify-between items-center p-2">
                <h3 class="p-2 text-white font-semibold text-lg truncate">${product.title.split(" ").slice(0, 2).join(" ")}</h3>
                <div class="flex gap-2 justify-center items-center">
                    <button class="flex items-center justify-center text-white hover:text-orange-600 add-to-cart">+</button>
                    <p class="font-bold text-white ">${product.price}$</p>
                    <button class="flex items-center justify-center text-white hover:text-orange-600 remove-from-cart">-</button>
                </div>
            </div>
        `;
        container.appendChild(cart);

        cart.querySelector(".add-to-cart").addEventListener("click", () => {
            addToCart(product);
        })

        cart.querySelector(".remove-from-cart").addEventListener("click", () => {
            removeFromCart(product);
            renderCart();
        }); 
    });

        
}

const shoppingCartBtn = document.getElementById("shopping-cart");
const cartModal = document.getElementById("cart-modal");
const closeCartBtn = document.getElementById("close-cart");
const cartItems = document.getElementById("cart-items");

function removeFromCart(product) {
    let existing = cartlist.find(p => p.id === product.id);
    if (existing) {
        existing.quantity--;
        if (existing.quantity <= 0) {
            cartlist = cartlist.filter(p => p.id !== product.id);
        }
    }
}

shoppingCartBtn.addEventListener("click", () => {
    cartDropdown.classList.toggle("hidden");
    renderCart();
});

shoppingCartBtn.addEventListener("click", () => {
    renderCart();
    cartModal.classList.remove("hidden");
});

closeCartBtn.addEventListener("click", () => {
    cartModal.classList.add("hidden");
});

function addToCart(product) {
    let existing = cartlist.find(p => p.id === product.id);
    if (existing) {
        existing.quantity++;
    } else {
        cartlist.push({ ...product, quantity: 1 });
    }
}

function renderCart() {
    cartItems.innerHTML = "";
    if (cartlist.length === 0) {
        cartItems.innerHTML = `<p class="text-center text-gray-500">Shopping cart is empty.</p>`;
        return;
    }
    cartlist.forEach(item => {
        const div = document.createElement("div");
        div.className = "flex justify-between border-b-1 border-orange-600 py-1 items-center";
        div.innerHTML = `
            <span>${item.title}</span>
            <div class="flex items-center gap-2">
                <button class="text-white bg-red-600 px-2 rounded remove-item">-</button>
                <span>x${item.quantity}</span>
                <button class="text-white bg-green-600 px-2 rounded add-item">+</button>
            </div>
        `;
        cartItems.appendChild(div);

        div.querySelector(".remove-item").addEventListener("click", () => {
            removeFromCart(item);
            renderCart();
        });

        div.querySelector(".add-item").addEventListener("click", () => {
            addToCart(item);
            renderCart();
        });
    });
}

document.querySelectorAll(".search-input").forEach(input => {
    input.addEventListener("input", (e) => {
        const searchText = e.target.value.toLowerCase();
        const filtered = allProducts.filter(p => p.title.toLowerCase().includes(searchText));
        renderProducts(filtered);
    });
});

const checkboxes = document.querySelectorAll("aside input[type='checkbox']");

checkboxes.forEach(cb => {
    cb.addEventListener("change", () => {
        const selectedCategories = Array.from(checkboxes)
            .filter(c => c.checked)
            .map(c => c.id.toLowerCase());

        if (selectedCategories.length === 0) {
            renderProducts(allProducts);
        } else {
            const filtered = allProducts.filter(p => 
                selectedCategories.includes(p.category.toLowerCase())
            );
            renderProducts(filtered);
        }
    });
});

