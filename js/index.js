













const user = document.querySelector(".user");
const email = document.querySelector(".email");
const emailSign = document.querySelector(".email-sgin");
const passSign = document.querySelector(".pass-sgin");
const pass = document.querySelector(".pass");
const submit = document.querySelector(".submit");
const login = document.querySelector(".login");
const par = document.querySelector(".par");
const username = document.getElementById("username");
const logout = document.getElementById("logout");

let allArray = JSON.parse(localStorage.getItem("allArray")) || [];

if (logout) {
    logout.addEventListener("click", () => {
        localStorage.removeItem("name");
        location.href = "sgin.html";
    });
}

function saveData() {
    if (!user.value || !email.value || !pass.value) {
        displayMessage("ALL inputs required", "red");
    } else if (isValidEmail(email.value)) {
        if (isEmailExists(email.value)) {
            displayMessage("Email already exists", "red");
        } else {
            const newUser = {
                user: user.value,
                email: email.value,
                pass: pass.value,
            };
            allArray.push(newUser);
            localStorage.setItem("allArray", JSON.stringify(allArray));
            displayMessage("Success", "green");
            window.location.href = "sgin.html";
        }
    } else {
        displayMessage("Incorrect email format", "red");
    }
}

function checkPerson() {
    if (emailSign.value && passSign.value) {
        const user = allArray.find(
            (u) =>
                u.email.toLowerCase() === emailSign.value.toLowerCase() &&
                u.pass === passSign.value
        );
        if (user) {
            localStorage.setItem("name", JSON.stringify(user.user));
            location.href = "home.html";
        } else {
            displayMessage("Incorrect email or password", "red");
        }
    } else {
        displayMessage("ALL inputs required", "red");
    }
}

function displayMessage(message, colorClass) {
    par.innerText = message;
    par.className = `par ${colorClass}`;
}

function isValidEmail(email) {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi;
    return emailRegex.test(email);
}

function isEmailExists(email) {
    return allArray.some(
        (u) => u.email.toLowerCase() === email.toLowerCase()
    );
}

function addName() {
    const usernameValue = JSON.parse(localStorage.getItem("name"));
    if (usernameValue) {
        username.innerHTML = `Welcome ${usernameValue}`;
    }
}

async function fetchWeather() {
    const url = 'https://api.weatherapi.com/v1/current.json?key=3b4dfcf6e8d44f3f879125222230108&q=egypt';
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data.current);
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

if (submit) {
    submit.addEventListener("click", saveData);
}

if (login) {
    login.addEventListener("click", checkPerson);
}

fetchWeather();
addName();






















