document.addEventListener("DOMContentLoaded", function () {
    const categoryLinks = document.querySelectorAll(".dropdown-menu a");
    const showMoreBtn = document.querySelector(".show-more-btn");
    let currentCategory = "all";
    let shownProducts = 0;
    const productsPerClick = 20; 

    // Фільтрація товарів при натисканні на категорію
    categoryLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            currentCategory = this.getAttribute("data-translate");
            shownProducts = 0;
            filterProducts();
        });
    });

    function filterProducts() {
        const products = document.querySelectorAll(".product");

        products.forEach(product => {
            const category = product.getAttribute("data-category");

            if (currentCategory === "all" || category === currentCategory) {
                product.classList.add("hidden"); // Спочатку ховаємо всі товари
            } else {
                product.style.display = "none";
            }
        });

        showLimitedProducts(); // Показуємо тільки перші товари
    }

    function showLimitedProducts() {
        const products = Array.from(document.querySelectorAll(".product"));

        let filteredProducts = currentCategory === "all" 
            ? products 
            : products.filter(product => product.getAttribute("data-category") === currentCategory);

        shownProducts = 0;
        filteredProducts.forEach((product, index) => {
            if (index < productsPerClick) {
                product.style.display = "block";
                product.classList.remove("hidden");
                shownProducts++;
            } else {
                product.style.display = "none";
                product.classList.add("hidden");
            }
        });

        updateShowMoreButton(filteredProducts);
    }

    function updateShowMoreButton(filteredProducts) {
        const hiddenProducts = filteredProducts.filter(product => product.classList.contains("hidden"));
        showMoreBtn.style.display = hiddenProducts.length > 0 ? "flex" : "none";
    }

    // Кнопка "Показати більше"
    showMoreBtn.addEventListener("click", function () {
        let hiddenProducts = Array.from(document.querySelectorAll(".product.hidden"));

        for (let i = 0; i < productsPerClick && i < hiddenProducts.length; i++) {
            hiddenProducts[i].style.display = "block";
            hiddenProducts[i].classList.remove("hidden");
            shownProducts++;
        }

        updateShowMoreButton(hiddenProducts);
    });

    filterProducts(); // Запускаємо фільтр при завантаженні
});
