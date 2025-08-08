let allProducts = []

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
            <div class="flex justify-between p-2">
                <h3 class="p-2 text-white font-semibold text-lg truncate">${product.title}</h3>
                <div class="flex gap-2 justify-center items-center">
                    <button class="border border-orange-600 w-6 h-6 flex items-center justify-center rounded-sm text-white hover:bg-white hover:text-black transition">+</button>
                    <p class="font-bold text-white">${product.price}</p>
                    <button class="border border-orange-600 w-6 h-6 flex items-center justify-center rounded-sm text-white hover:bg-white hover:text-black transition">-</button>
                </div>
            </div>
        `;
        container.appendChild(cart);
    });
}

document.getElementById("search-input").addEventListener("input", (e) => {
    const searchText = e.target.value.toLowerCase();
    const filtered = allProducts.filter(p => p.title.toLowerCase().includes(searchText));
    renderProducts(filtered);
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