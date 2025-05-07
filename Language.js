document.addEventListener('DOMContentLoaded', function () {
    // Обробник для зміни мови
    document.getElementById('ukrainian').addEventListener('change', function () {
        if (this.checked) {
            // Зміна тексту на українську
            changeLanguage('uk');
        }
    });

    document.getElementById('english').addEventListener('change', function () {
        if (this.checked) {
            // Зміна тексту на англійську
            changeLanguage('en');
        }
    });


});

// Функція для зміни тексту на сторінці в залежності від мови
function changeLanguage(language) {
    const elements = document.querySelectorAll('[data-translate]'); // Вибираємо всі елементи, які мають атрибут data-translate

    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        element.textContent = translations[language][key] || element.textContent; // Замінюємо текст на відповідний
    });
}

// Переклади для кожної мови
const translations = {
    'uk': {

        'all' : 'Всі' ,
        'Products for animals' : 'Товари для тварин' ,
        'For telephones' : ' Для телифонів' ,
        'Retro sweatshirt' : 'Ретро світшот' ,
        'Casual sweatshirt' : 'Повсякденна світшотка' ,
        'printed sweatshirt' : ' світшот з принтом' ,
        'Green flocking moss rabbit' : 'Зелений флокінг мох кролик' ,
        'Plush oval rug' : 'Плюшевий овальний килимок' ,
        '1 pair of fashionable over-the-knee boots' : '1 пара модних чобіт вище коліна' ,
        'Solid color jacket' : 'Одноколірний пілжак' ,
        'Case with black TPU pattern of mountains and water' : 'Чохол з чорним TPU малюнком гор та води' ,
        'Automatic feeder' : 'Автоматична годівниця' ,
        'Plush bed' : 'Плюшеве ліжко' ,
        'Large realistic leaf plant' : 'Велика реалістична листова рослина ' ,
        'Floral blouse' : 'Квіткова блуза' ,
        '1 pair MAINALUN' : '1 пара MAINALUN' ,
        'Business shoes' : 'Взуття для бізнесу' ,
        'Tea set' : 'Чайний набір' ,
        'Chinese trend' : 'Китайська тенденція' ,
        'Summer T-shirt' : 'Літня футболка' ,
        'Roman sandals' : 'Римські сандалі' ,
        'Brush with steam' : 'Щітка з паром' ,
        'Liquid silicone cable' : 'Рідкий силіконовий кабель' ,
        'Jug for lemonade' : 'Кувшин для лимонаду' ,
        'Bath towel' : 'Рушник для ванни' ,
        'Black capybara case' : 'Чорний чохол з капібарою' ,
        'Women`s skirt for spring' : 'Жіноча спідниця для весни' ,
        'Transparent bird bath' : 'Прозора ванна для птахів' ,
        'Cable protection cover' : 'Захисна обкладинка для кабелю' ,
        '3-tier cake stand' : '3-рівнева підставка для торту' ,
        'Beige high-waisted shorts' : 'Бежеві шорти з високою талією' ,
        'Thinking cat case' : 'Чохол думаючий кіт' ,
        'Women`s fluffy slippers' : 'Жіночі пухнасті тапочки' ,
        'Mini dress with v-neck and floral lace' : 'Міні-сукня з v-вирізом та квітковим мереживом' ,
        'change':'змінити',
        'sales': 'Хіти продажів',
        'new_arrivals': 'Нові надходження',
        'categories': 'Категорії',
        'recommended': 'Рекомендовані',
        'home_kitchen': 'Дім і кухня',
        'women_clothing': 'Жіночий одяг',
        'men_clothing': 'Чоловічий одяг',
        'footwear': 'Взуття',
        'accessories': 'Аксесуари',
        'search_placeholder': 'Пошук...',
        'login_text': 'Увійти/зареєструватися',
        'account_orders': 'Замовлення й обліковий запис',
        'support': 'Підтримка',
        'support_center': 'Центр підтримки',
        'security_center': 'Центр безпеки',
        'terms_conditions': 'Умови користування',
        'why_Luiolunit': 'Чому вибирають Luiolunit?',
        'security': 'Безпека та конфіденційність',
        'secure_payments': 'Безпечні платежі',
        'delivery_guarantee': 'Гарантія доставки',
        'security_reminder': 'Нагадування про безпеку: Остерігайтеся шахрайських повідомлень і посилань. Luiolunit не проситиме додаткових зборів через SMS або електронну пошту.',
        'view_more': 'Переглянути ➤'
    },
    'en': {

        'all' : 'all' ,
        'Products for animals' : 'Products for animals' ,
        'For telephones' : 'For telephones' ,
         'Retro sweatshirt' : 'Retro sweatshirt' ,
        'Casual sweatshirt' : 'Casual sweatshirt' ,
        'printed sweatshirt' : 'printed sweatshirt' ,
        'Green flocking moss rabbit' : 'Green flocking moss rabbit' ,
        'Plush oval rug' : 'Plush oval rug' ,
        '1 pair of fashionable over-the-knee boots' : '1 pair of fashionable over-the-knee boots' ,
        'Solid color jacket' : 'Solid color jacket' ,
        'Case with black TPU pattern of mountains and water' : 'Case with black TPU pattern of mountains and water' ,
        'Automatic feeder' : 'Automatic feeder' ,
        'Plush bed' : 'Plush bed' ,
        'Large realistic leaf plant' : 'Large realistic leaf plant' ,
        'Floral blouse' : 'Floral blouse' ,
        '1 pair MAINALUN' : '1 pair MAINALUN' ,
        'Business shoes' : 'Business shoes' ,
        'Tea set' : 'Tea set' ,
        'Chinese trend' : 'Chinese trend' ,
        'Summer T-shirt' : 'Summer T-shirt' ,
        'Roman sandals' : 'Roman sandals' ,
        'Brush with steam' : 'Brush with steam' ,
        'Liquid silicone cable' : 'Liquid silicone cable' ,
        'Jug for lemonade' : 'Jug for lemonade' ,
        'Bath towel' : 'Bath towel' ,
        'Black capybara case' : 'Black capybara case' ,
        'Women`s skirt for spring' : 'Women`s skirt for spring' ,
        'Transparent bird bath' : 'Transparent bird bath' ,
        'Cable protection cover' : 'Cable protection cover' ,
        '3-tier cake stand' : '3-tier cake stand' ,
        'Beige high-waisted shorts' : 'Beige high-waisted shorts' ,
        'Thinking cat case' : 'Thinking cat case' ,
        'Women`s fluffy slippers' : 'Women`s fluffy slippers' ,
        'Mini dress with v-neck and floral lace' : 'Mini dress with v-neck and floral lace' ,
        'language':'language',
        'currency':'currency',
        'change':'change',
        'sales': 'Best Sellers',
        'new_arrivals': 'New Arrivals',
        'categories': 'Categories',
        'recommended': 'Recommended',
        'home_kitchen': 'Home & Kitchen',
        'women_clothing': 'Women\'s Clothing',
        'men_clothing': 'Men\'s Clothing',
        'footwear': 'Footwear',
        'accessories': 'Accessories',
        'search_placeholder': 'Search...',
        'login_text': 'Log In / Register',
        'account_orders': 'Orders & Account',
        'support': 'Support',
        'support_center': 'Support Center',
        'security_center': 'Security Center',
        'terms_conditions': 'Terms & Conditions',
        'why_Luiolunit': 'Why Choose Luiolunit?',
        'security': 'Security & Privacy',
        'secure_payments': 'Secure Payments',
        'delivery_guarantee': 'Delivery Guarantee',
        'security_reminder': 'Security Reminder: Beware of fraudulent messages and links. Luiolunit will never ask for additional fees via SMS or email.',
        'view_more': 'View More ➤'
    },


};
