document.addEventListener("DOMContentLoaded", function () {
    let adModal = document.getElementById("ad-modal");
    let adContent = document.getElementById("ad-content");
    let adImage = document.getElementById("ad-image");
    let closeBtn = document.getElementById("close-ad");
    let hasScrolled = false;
    let adTimeout;
    let ads = [
        {
            text: "🔥 Великий розпродаж! Знижки до 50%",
            image: "images/29586_800x420.jpg", 
        },
        {
            text: "🚀 Швидка доставка по всій Україні!",
            image: "images/1024x727.jpg", 
        },
        {
            text: "💎 VIP-пропозиція тільки для вас!",
            image: "images/bbe4.png", 
        },
        {
            text: "🎁 Отримайте подарунок при першому замовленні!",
            image: "images/burger-advertisement.jpg", 
        }
    ];
    let adIndex = 0;

    window.addEventListener("scroll", function () {
        if (!hasScrolled && window.scrollY > 500) {
            hasScrolled = true;
            showAd();
        }
    });

    function showAd() {
        positionAdRandomly();
        let currentAd = ads[adIndex];  // вибір поточної реклами
        adContent.innerHTML = currentAd.text;
        adImage.src = currentAd.image;  // додавання зображення
        adModal.style.display = "block";
        closeBtn.disabled = true;
        closeBtn.classList.remove("active");

        setTimeout(() => {
            closeBtn.classList.add("active");
            closeBtn.disabled = false;
        }, 5000);

        adIndex = (adIndex + 1) % ads.length; // Перемикаємо на наступне оголошення
    }

    function positionAdRandomly() {
        let maxWidth = window.innerWidth - adModal.offsetWidth - 20;
        let maxHeight = window.innerHeight - adModal.offsetHeight - 20;
        
        let randomX = Math.floor(Math.random() * maxWidth);
        let randomY = Math.floor(Math.random() * maxHeight);

        adModal.style.left = `${randomX}px`;
        adModal.style.top = `${randomY}px`;
    }

    closeBtn.addEventListener("click", function () {
        adModal.style.display = "none";
        adTimeout = setTimeout(() => {
            showAd();
        }, 10000);
    });
});
