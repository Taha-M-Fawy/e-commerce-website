
document.getElementById('signup-form').addEventListener('submit', function (e) {
    e.preventDefault();
    // يمنع الفورم من الإرسال

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    if (!name || !email || !password) {
        alert("Please fill all fields.");
        return;
    }

    // نجيب الحسابات القديمة
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // نتاكد مفيش ايميل مكرر
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        alert("This email is already registered.");
        return;
    }

    // نضيف الحساب الجديد
    users.push({ name, email, password });

    // نخزنهم في localStorage
    localStorage.setItem('users', JSON.stringify(users));

    window.location.href = "../index.html";


});

