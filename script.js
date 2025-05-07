document.addEventListener("DOMContentLoaded", function () {
    // Масив можливих варіантів пошуку
    const searchTexts = ["туш", "сукня", "телефон", "годинник", "рюкзак"];

    // Вибір випадкового тексту
    const randomText = searchTexts[Math.floor(Math.random() * searchTexts.length)];

    // Встановлення тексту у placeholder
    document.getElementById("search-input").placeholder = randomText;
});
