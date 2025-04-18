document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];

    const validUser = users.find(user => user.email === email && user.password === password);

    if (validUser) {
        // alert("Login successful!");
        localStorage.setItem("loggedInUser", JSON.stringify(validUser));
        window.location.href = "./index.html";

    } else {
        alert("Invalid email or password.");
    }
});
