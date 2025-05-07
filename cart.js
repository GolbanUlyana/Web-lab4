function addToCart(name, price, image) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Перевіряємо, чи товар уже є у кошику
    let existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;  // Збільшуємо кількість
    } else {
        cart.push({ name, price, image, quantity: 1 });  // Додаємо новий товар
    }

    localStorage.setItem('cart', JSON.stringify(cart));

}

function showToast(message) {
    let toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 1000); // Зникає через 3 секунди
}

function addToCart(name, price, image) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    let existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, image, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    showToast("✅ Товар додано до кошика! "); // Виклик кастомного повідомлення
}


// Завантаження кошика на сторінці cart.html
function loadCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartContainer = document.getElementById('cart-items');
    let cartCount = document.getElementById('cart-count');
    let cartTotalItems = document.getElementById('cart-total-items');
    let cartTotalItemsBtn = document.getElementById('cart-total-items-btn');
    let cartTotalPrice = document.getElementById('cart-total-price');
    let cartFinalPrice = document.getElementById('cart-final-price');

    cartContainer.innerHTML = ''; // Очищення перед оновленням
    let totalPrice = 0;

    // Якщо кошик порожній, показуємо повідомлення
    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <div class="empty-cart">
                <h2>Ваш кошик порожній</h2>
                <p>Додайте сюди свої улюблені товари.</p>
                <button class="trend-button" onclick="window.location.href='index.html'">Дивитися трендові предмети</button>
            </div>
        `;

        // Оновлюємо значення до 0
        cartCount.textContent = 0;
        cartTotalItems.textContent = 0;
        cartTotalItemsBtn.textContent = 0;
        cartTotalPrice.textContent = "0.00₴";
        cartFinalPrice.textContent = "0.00₴";
        return; // Виходимо з функції
    }

    // Додаємо товари у кошик
    cart.forEach((item, index) => {
        let itemPrice = parseFloat(item.price) || 0;
        let itemQuantity = parseInt(item.quantity) || 1;
        totalPrice += itemPrice * itemQuantity;

        let cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-image">
            <div class="cart-info">
                <p class="cart-title">${item.name}</p>
                <p class="cart-price">${itemPrice.toFixed(2)}₴</p>
            </div>
            <select class="cart-quantity" onchange="updateQuantity(${index}, this.value)">
                ${[...Array(10).keys()].map(i => `<option value="${i + 1}" ${i + 1 === itemQuantity ? 'selected' : ''}>Кількість ${i + 1}</option>`).join('')}
            </select>
            <button class="cart-remove" onclick="removeFromCart(${index})">🗑️</button>
        `;
        cartContainer.appendChild(cartItem);
    });

    // Оновлюємо інформацію про кошик
    cartCount.textContent = cart.length;
    cartTotalItems.textContent = cart.length;
    cartTotalItemsBtn.textContent = cart.length;
    cartTotalPrice.textContent = totalPrice.toFixed(2) + "₴";
    cartFinalPrice.textContent = totalPrice.toFixed(2) + "₴";
}


// Завантажуємо кошик при відкритті сторінки
if (document.getElementById('cart-items')) {
    loadCart();

}



function updateQuantity(index, quantity) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart[index].quantity = parseInt(quantity);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));

    loadCart(); // Оновлення кошика після видалення товару
    showToast(); // Відображення повідомлення про видалення
}

function showToast() {
    const toast = document.getElementById('toast');
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 1000); // Повідомлення буде видно протягом 3 секунд
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
    showToast(); // Показуємо повідомлення після видалення товару
}


fetch('index.html')
    .then(response => response.text())
    .then(html => {
        let parser = new DOMParser();
        let doc = parser.parseFromString(html, 'text/html');
        let allProducts = doc.querySelectorAll('.products-container .product');

        let recommendedContainer = document.getElementById('recommended-list');
        recommendedContainer.innerHTML = '';

        let shuffled = Array.from(allProducts).sort(() => 0.5 - Math.random());
        let selected = shuffled.slice(0, 3); // Вибираємо 3 випадкові товари

        selected.forEach(product => {
            let image = product.querySelector('img').src;
            let name = product.querySelector('p[data-translate]').textContent;
            let price = product.querySelector('.product-price').textContent;
            let rating = product.querySelector('.product-rating').innerHTML;

            let productDiv = document.createElement('div');
            productDiv.classList.add('product'); // Важливо: зберігаємо клас для стилізації
            productDiv.innerHTML = `
                <img src="${image}" alt="${name}">
                <p>${name}</p>
                <div class="product-info">
                    <p class="product-price">${price}</p>
                    <button class="buy-button">Купити</button>
                </div>
                <div class="product-rating">${rating}</div>
            `;
            recommendedContainer.appendChild(productDiv);
        });
    });
