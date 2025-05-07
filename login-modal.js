
let selectedRole = ""; 

document.addEventListener('DOMContentLoaded', function () {
    const roleModal = document.getElementById('roleModal');
    const loginModal = document.getElementById('loginModal');

    const userBtn = document.getElementById('userRoleButton');
    const adminBtn = document.getElementById('adminRoleButton');

    userBtn.addEventListener('click', () => {
        selectedRole = "userRoleButton";
        roleModal.style.display = 'none';
        loginModal.style.display = 'block';
    });

    adminBtn.addEventListener('click', () => {
        selectedRole = "adminRoleButton";
        roleModal.style.display = 'none';
        loginModal.style.display = 'block';
    });

    document.getElementById('closeModalButton').addEventListener('click', () => {
        loginModal.style.display = 'none';
    });

  
    document.getElementById('loginFormElement').addEventListener('submit', function (e) {
        e.preventDefault();
    
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;
    
        loginModal.style.display = 'none';
    
        const loginData = {
            username: username,
            password: password,
            role: selectedRole 
        };
    
        
        fetch(apiUrl, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${jwtToken}`
            }
          })
            .then(response => {
              if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }
              return response.json();
            })
            .then(data => {
              console.log("Data received:", data);
            })
            .catch(error => {
              console.error("Error fetching data:", error);
            });
    });
    
});


const modal = document.getElementById("loginModal");
const openModalButton = document.getElementById("openModalButton");
const closeModalButton = document.getElementById("closeModalButton");

const loginTab = document.getElementById("loginTab");
const registerTab = document.getElementById("registerTab");

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

const loginFormElement = document.getElementById("loginFormElement");
const registerFormElement = document.getElementById("registerFormElement");

// Відкриваємо модальне вікно
openModalButton.addEventListener("click", function () {
    modal.style.display = "block";
});

// Закриваємо модальне вікно
closeModalButton.addEventListener("click", function () {
    modal.style.display = "none";
});

// Закриваємо модальне вікно при кліку поза його межами
window.addEventListener("click", function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

// Функція для перемикання між вкладками з анімацією
function switchTab(activeTab, inactiveTab, showForm, hideForm) {
    // Додаємо ефект зникнення для поточної форми
    hideForm.classList.add("exit-left");

    // Через 300 мс (час анімації) змінюємо форму
    setTimeout(() => {
        hideForm.classList.remove("active", "exit-left");
        showForm.classList.add("enter-right", "active");
        activeTab.classList.add("active");
        inactiveTab.classList.remove("active");

        // Через ще 100 мс прибираємо клас появи для плавності
        setTimeout(() => {
            showForm.classList.remove("enter-right");
        }, 200);
    }, 400);
}

// Обробники подій для вкладок
loginTab.addEventListener("click", function () {
    if (!loginForm.classList.contains("active")) {
        switchTab(loginTab, registerTab, loginForm, registerForm);
    }
});

registerTab.addEventListener("click", function () {
    if (!registerForm.classList.contains("active")) {
        switchTab(registerTab, loginTab, registerForm, loginForm);
    }
});

// Функція для збереження даних користувачів в localStorage
function saveUsersToLocalStorage(users) {
    localStorage.setItem('registeredUsers', JSON.stringify(users));
}

// Функція для отримання даних користувачів з localStorage
function getUsersFromLocalStorage() {
    const users = localStorage.getItem('registeredUsers');
    return users ? JSON.parse(users) : [];
}

// Функція для закриття модального вікна
function closeModal() {
    const modal = document.getElementById("loginModal");
    modal.style.display = "none";
}

// Функція для видалення помилок з поля
function clearError(input) {
    input.classList.remove("error");
    const errorMessage = input.closest(".input-group").querySelector(".error-message");
    if (errorMessage) {
        errorMessage.remove(); // Прибираємо повідомлення про помилку
    }
}

// Обробка форми входу
loginFormElement.addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("loginUsername");
    const password = document.getElementById("loginPassword");

    let isValid = true;

    // Очищуємо попередні помилки
    clearError(username);
    clearError(password);

    // Перевіряємо, чи заповнені поля
    if (!username.value.trim()) {
        username.classList.add("error");
        const errorMessage = document.createElement("span");
        errorMessage.classList.add("error-message");
        errorMessage.textContent = "Це поле обов'язкове!";
        username.closest(".input-group").appendChild(errorMessage); // Додаємо помилку під полем
        isValid = false;
    }

    if (!password.value.trim()) {
        password.classList.add("error");
        const errorMessage = document.createElement("span");
        errorMessage.classList.add("error-message");
        errorMessage.textContent = "Це поле обов'язкове!";
        password.closest(".input-group").appendChild(errorMessage); // Додаємо помилку під полем
        isValid = false;
    }

    if (isValid) {
        const registeredUsers = getUsersFromLocalStorage();

        // Перевірка, чи існує користувач
        const user = registeredUsers.find(user => user.username === username.value.trim() && user.password === password.value.trim());

        if (user) {
            console.log("Вхід успішний:", { username: user.username });
            alert(`Вітаємо, ${user.username}! Вхід виконано.`);
            closeModal();
        } else {
            alert("Невірний логін або пароль!");
        }
    }
});



function getRandomColor() {
    const colors = ['#ff6b6b', '#6bc5ff', '#6bff95', '#ffdf6b', '#a86bff'];
    return colors[Math.floor(Math.random() * colors.length)];
}


document.getElementById('registerFormElement').addEventListener('submit', function(event) {
    event.preventDefault();

    const usernameField = document.getElementById('registerUsername');
    const emailField = document.getElementById('registerEmail');
    const passwordField = document.getElementById('registerPassword');
    const countryField = document.getElementById('country');
    const avatarInput = document.getElementById('avatarInput');
    const loginButton = document.getElementById('openModalButton');

    const username = usernameField.value.trim();
    const email = emailField.value.trim();
    const password = passwordField.value.trim();
    const country = countryField.value;

 
    let allFilled = true;
    const fields = [usernameField, emailField, passwordField, countryField];
    fields.forEach(field => {
        if (!field.value.trim()) {
            field.style.border = '2px solid red';
            allFilled = false;
        } else {
            field.style.border = '';
        }
    });

    if (!allFilled) {
        alert("Будь ласка, заповніть усі поля");
        return;
    }

   
    let users = JSON.parse(localStorage.getItem('users')) || [];
    const duplicate = users.find(user => user.username === username);
    if (duplicate) {
        alert("Такий користувач вже зареєстрований");
        usernameField.style.border = '2px solid red';
        return;
    }


    const newUser = {
        username: username,
        email: email,
        password: password,
        country: country
    };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

   
    if (avatarInput.files && avatarInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            let userAvatars = JSON.parse(localStorage.getItem('userAvatars')) || {};
            userAvatars[username] = e.target.result;
            localStorage.setItem('userAvatars', JSON.stringify(userAvatars));

            loginButton.innerHTML = `
                <div style="width: 30px; height: 30px; border-radius: 50%; background-image: url('${e.target.result}'); background-size: cover; margin-right: 10px;"></div>
                ${username}
            `;
            document.getElementById('loginModal').style.display = 'none';
        };
        reader.readAsDataURL(avatarInput.files[0]);
    } else {
        const bgColor = getRandomColor();
        loginButton.innerHTML = `
            <div style="width: 30px; height: 30px; border-radius: 50%; background-color: ${bgColor}; color: white; display: flex; justify-content: center; align-items: center; font-size: 16px; margin-right: 10px;">
                ${username.charAt(0).toUpperCase()}
            </div>
            ${username}
        `;
        document.getElementById('loginModal').style.display = 'none';
        showProfile(username); 
    }
});


['registerUsername', 'registerEmail', 'registerPassword', 'country'].forEach(id => {
    const field = document.getElementById(id);
    field.addEventListener('input', () => {
        field.style.border = '';
    });
});


document.getElementById('loginFormElement').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value.trim();
    const loginButton = document.getElementById('openModalButton');

    if (!username || !password) {
        alert("Будь ласка, заповніть усі поля для входу");
        return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];
    let foundUser = users.find(user => user.username === username && user.password === password);

    if (!foundUser) {
        alert("Невірний логін або пароль");
        return;
    }

    
    let userAvatars = JSON.parse(localStorage.getItem('userAvatars')) || {};
    let avatar = userAvatars[username];
    if (avatar) {
        loginButton.innerHTML = `
            <div style="width: 30px; height: 30px; border-radius: 50%; background-image: url('${avatar}'); background-size: cover; margin-right: 10px;"></div>
            ${username}
        `;
    } else {
        const bgColor = getRandomColor();
        loginButton.innerHTML = `
            <div style="width: 30px; height: 30px; border-radius: 50%; background-color: ${bgColor}; color: white; display: flex; justify-content: center; align-items: center; font-size: 16px; margin-right: 10px;">
                ${username.charAt(0).toUpperCase()}
            </div>
            ${username}
        `;
    }

    document.getElementById('loginModal').style.display = 'none';
    localStorage.setItem('currentUser', username);
    showProfile(username);
});

function showProfile(username) {
    localStorage.setItem('currentUser', username); // Зберігаємо логін

    const profileModal = document.getElementById("profileModal");
    const profileUsername = document.getElementById("profileUsername");
    const profileAvatar = document.getElementById("profileAvatar");

    profileUsername.textContent = "Логін: " + username;

    let userAvatars = JSON.parse(localStorage.getItem('userAvatars')) || {};
    let avatar = userAvatars[username];

    if (avatar) {
        profileAvatar.innerHTML = `
            <div style="width: 80px; height: 80px; border-radius: 50%; background-image: url('${avatar}'); background-size: cover; margin: 0 auto;"></div>
        `;
    } else {
        const bgColor = getRandomColor();
        profileAvatar.innerHTML = `
            <div style="width: 80px; height: 80px; border-radius: 50%; background-color: ${bgColor}; color: white; display: flex; justify-content: center; align-items: center; font-size: 36px; margin: 0 auto;">
                ${username.charAt(0).toUpperCase()}
            </div>
        `;
    }

    profileModal.style.display = 'block';
    document.getElementById('loginModal').style.display = 'none';
    document.getElementById('registerModal').style.display = 'none';
}


function closeProfileModal() {
    document.getElementById('profileModal').style.display = 'none';
}


function logout() {
    localStorage.removeItem('currentUser'); 
    closeProfileModal();
    alert("Ви вийшли з профілю");
}





