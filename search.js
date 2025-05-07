document.getElementById("search-button").addEventListener("click", function() {
    let searchText = document.getElementById("search-input").value.toLowerCase();
    let products = document.querySelectorAll(".product"); // Отримуємо всі товари

    products.forEach(product => {
        let productName = product.querySelector("img").alt.toLowerCase(); // Отримуємо назву товару з атрибута alt

        if (productName.includes(searchText)) {
            product.style.display = "block"; // Показуємо товар, якщо є збіг
        } else {
            product.style.display = "none"; // Ховаємо товар, якщо немає збігу
        }
    });
});

      