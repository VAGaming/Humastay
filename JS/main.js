const emailInput = document.getElementById('email');
const emailRegex = /^[^\s@]+@gmail\.com$/;
const passwordInput = document.getElementById('password');
const loginForm = document.querySelector('form');

emailInput.addEventListener('blur', function () {
    if (this.value && !emailRegex.test(this.value)) {
        this.classList.add('is-invalid');
    } else {
        this.classList.remove('is-invalid');
    }
});

emailInput.addEventListener('input', function () {
    if (emailRegex.test(this.value)) {
        this.classList.remove('is-invalid');
    }
});

passwordInput.addEventListener('blur', function () {
    if (this.value && this.value.length < 6) {
        this.classList.add('is-invalid');
    } else {
        this.classList.remove('is-invalid');
    }
});

passwordInput.addEventListener('input', function () {
    if (this.value.length >= 6) {
        this.classList.remove('is-invalid');
    }
});

function togglePassword() {
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
    } else {
        passwordInput.type = 'password';
    }
}

loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (!email) {
        emailInput.classList.add('is-invalid');
        alert('Vui lòng nhập email!');
        return;
    }

    if (!emailRegex.test(email)) {
        emailInput.classList.add('is-invalid');
        alert('Email phải đúng định dạng: example@gmail.com');
        return;
    }

    if (!password) {
        passwordInput.classList.add('is-invalid');
        alert('Vui lòng nhập mật khẩu');
        return;
    }

    if (password.length < 6) {
        passwordInput.classList.add('is-invalid');
        alert('Mật khẩu phải có ít nhất 6 ký tự');
        return;
    }

    window.location.href = "../H"; 
});