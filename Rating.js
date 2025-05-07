// Функція для відкриття модального вікна
function openRatingModal(productName) {
    document.getElementById('ratingModal').style.display = 'block';
    document.getElementById("modalOverlay").style.display = "block"; 
    document.getElementById('ratingModal').setAttribute('data-product', productName);
    loadReviews(productName);
}

// Функція для закриття модального вікна 
function closeRatingModal() {
    document.getElementById('ratingModal').style.display = 'none';
    document.getElementById("modalOverlay").style.display = "none"; 
}

// Функція вибору рейтингу 
function rateProduct(stars) {
    document.getElementById('selectedStars').value = stars; // Зберігаємо рейтинг
    let starsElements = document.querySelectorAll('.stars .star');
    starsElements.forEach((star, index) => {
        star.classList.toggle('active', index < stars);
    });
}

// Функція збереження відгуку
function submitReview() {
    let product = document.getElementById('ratingModal').getAttribute('data-product');
    let reviewText = document.getElementById('reviewText').value.trim();
    let stars = parseInt(document.getElementById('selectedStars').value) || 5;
    let username = 'ra***be'; // Приклад імені користувача
    let userIcon = 'images/Іконка.jpg'; // Іконка користувача
    let countryFlag = 'images/Flag_of_Ukraine.svg.webp'; // Шлях до зображення прапора
    let date = new Date().toLocaleDateString('uk-UA', { day: 'numeric', month: 'long', year: 'numeric' });

    if (!reviewText) {
        alert('Будь ласка, напишіть відгук.');
        return;
    }

    let reviews = JSON.parse(localStorage.getItem('reviews')) || {};
    if (!reviews[product]) {
        reviews[product] = [];
    }

    let newReview = { username, userIcon, countryFlag, date, stars, reviewText };
    reviews[product].push(newReview);
    localStorage.setItem('reviews', JSON.stringify(reviews));

    document.getElementById('reviewText').value = ''; // Очистити поле вводу
    loadReviews(product);
    updateRatingStatistics(product);
    updateProductCard(product);


}

// Функція завантаження відгуків та відображення кнопок видалення
function loadReviews(product) {
    let reviews = JSON.parse(localStorage.getItem('reviews')) || {};
    let reviewList = document.getElementById('reviewList');
    reviewList.innerHTML = '';

    if (reviews[product]) {
        reviews[product].forEach((review, index) => {
            let reviewItem = document.createElement('div');
            reviewItem.classList.add('review-item');
            reviewItem.innerHTML = `
                <div class="review-header">
                    <img src="${review.userIcon}" class="user-icon"> 
                    <span class="username">${review.username}</span>
                    <img src="${review.countryFlag}" class="flag-icon">
                    <span class="date">${review.date}</span>
                    <button class="delete-review" onclick="deleteReview('${product}', ${index})">🗑️</button>
                </div>
                <div class="review-stars">${'★'.repeat(review.stars)}${'☆'.repeat(5 - review.stars)}</div>
                <p class="review-text">${review.reviewText}</p>
            `;
            reviewList.appendChild(reviewItem);
            updateRatingStatistics(product); 
        });
    }
}


// Функція для видалення конкретного відгуку
function deleteReview(product, index) {
    let reviews = JSON.parse(localStorage.getItem('reviews')) || {};
    if (reviews[product]) {
        reviews[product].splice(index, 1);
        if (reviews[product].length === 0) {
            delete reviews[product];
        }
        localStorage.setItem('reviews', JSON.stringify(reviews));
        loadReviews(product);
        updateRatingStatistics(product); 
        updateProductCard(product);

    }
}



// Завантаження відгуків для товарів після завантаження сторінки
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.product').forEach(product => {
        let productName = product.getAttribute('data-name');
        loadReviews(productName);
        updateProductCard(product);
    });
});


function updateRatingStatistics(product) {
    let reviews = JSON.parse(localStorage.getItem('reviews')) || {};
    let reviewCount = reviews[product] ? reviews[product].length : 0;

    document.getElementById('review-count').textContent = reviewCount; 

    if (!reviews[product] || reviews[product].length === 0) {
        document.getElementById('average-rating').textContent = "0.0";
        document.getElementById('rating-distribution').innerHTML = "<p>Немає оцінок</p>";
        return;
    }

    let ratingCounts = [0, 0, 0, 0, 0];
    let totalRatings = 0;
    let sumRatings = 0;

    reviews[product].forEach(review => {
        ratingCounts[review.stars - 1]++;
        totalRatings++;
        sumRatings += review.stars;
    });

    let averageRating = (sumRatings / totalRatings).toFixed(1);
    document.getElementById('average-rating').textContent = averageRating;

    let ratingDistribution = document.getElementById('rating-distribution');
    ratingDistribution.innerHTML = "";

    for (let i = 5; i >= 1; i--) {
        let percentage = totalRatings > 0 ? (ratingCounts[i - 1] / totalRatings * 100).toFixed(1) : 0;
        ratingDistribution.innerHTML += `
            <div class="rating-bar">
                <span>${"★".repeat(i)}${"☆".repeat(5 - i)}</span>
                <div class="bar"><div class="fill" style="width: ${percentage}%;"></div></div>
                <span>${percentage}%</span>
            </div>
        `;
    }
}

function updateProductCard(product) {
    let reviews = JSON.parse(localStorage.getItem('reviews')) || {};
    let reviewCount = reviews[product] ? reviews[product].length : 0;
    let totalRatings = 0;
    let sumRatings = 0;

    if (reviews[product] && reviewCount > 0) {
        reviews[product].forEach(review => {
            sumRatings += review.stars;
        });
    }

    let averageRating = reviewCount > 0 ? (sumRatings / reviewCount).toFixed(1) : "0.0";

    // Знаходимо відповідну картку товару
    let productCard = document.querySelector(`.product[data-name="${product}"]`);
    if (productCard) {
        let ratingElement = productCard.querySelector(".average-rating");
        let countElement = productCard.querySelector(".review-count");

        if (ratingElement) ratingElement.textContent = averageRating;
        if (countElement) countElement.textContent = reviewCount;
    }
}



