document.addEventListener("DOMContentLoaded", function () {
    const filterLinks = document.querySelectorAll(".dropdown-menu a");
    const products = document.querySelectorAll(".product");

    filterLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault(); // Запобігаємо переходу за посиланням
            const filter = this.getAttribute("data-translate"); // Отримуємо категорію з атрибута data-translate
            products.forEach(product => {
                // Якщо категорія співпадає або вибрана категорія "всі"
                if (filter === "all" || product.getAttribute("data-category") === filter) {
                    product.classList.remove("hide");
                } else {
                    product.classList.add("hide");
                }
            });
        });
    });
});
