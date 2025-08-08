fetch("https://dummyjson.com/products")
    .then((response) => response.json())
    .then(data => {
        const container = document.getElementById('product-list');
        container.innerHTML = '';
        
        data.products.forEach(product => {
            const cart = document.createElement("article");
            cart.className = "bg-black/75 rounded-lg border border-orange-600 overflow-hidden";
            cart.innerHTML = `
                <img src="${product.images[0]}" alt="${product.title}" class="object-contain w-full h-48">
                <div class="flex justify-between p-2">
                    <h3 class="p-2 text-white font-semibold text-lg truncate">${product.title}</h3>
                    <div class="flex gap-2 justify-center items-center">
                        <button class="border border-orange-600 w-6 h-6 flex items-center justify-center rounded-sm text-white hover:bg-white hover:text-black transition">+</button>
                        <p class="font-bold text-white">${product.price}$</p>
                        <button class="border border-orange-600 w-6 h-6 flex items-center justify-center rounded-sm text-white hover:bg-white hover:text-black transition">-</button>
                    </div>
                </div>
            `;
            container.appendChild(cart);
        });
    });

