document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector('form');
    const nameInput = document.getElementById("hoten");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("sdt");
    const passwordInput = document.getElementById("password");
    const termsInput = document.getElementById("terms");

    const nameRegex = /^[A-ZÀ-Ỹ][a-zà-ỹ]+(\s[A-ZÀ-Ỹ][a-zà-ỹ]+)+$/;
    const emailRegex = /^[a-z0-9]([a-z0-9]){5,}@gmail\.com$/;
    const phoneRegex = /^0[0-9]{9}$/;
    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;

    nameInput.addEventListener('blur', function () {
        if (this.value && !nameRegex.test(this.value.trim())) {
            this.classList.add('is-invalid');
        } else {
            this.classList.remove('is-invalid');
        }
    });

    emailInput.addEventListener('blur', function () {
        if (this.value && !emailRegex.test(this.value.trim())) {
            this.classList.add('is-invalid');
        } else {
            this.classList.remove('is-invalid');
        }
    });

    phoneInput.addEventListener('blur', function () {
        if (this.value && !phoneRegex.test(this.value)) {
            this.classList.add('is-invalid');
        } else {
            this.classList.remove('is-invalid');
        }
    });

    passwordInput.addEventListener('blur', function () {
        if (this.value && !passRegex.test(this.value)) {
            this.classList.add('is-invalid');
        } else {
            this.classList.remove('is-invalid');
        }
    });

    termsInput.addEventListener('change', function () {
        if (!this.checked) {
            this.classList.add('is-invalid');
        } else {
            this.classList.remove('is-invalid');
        }
    });

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const sdt = phoneInput.value.trim();
        const password = passwordInput.value;
        const termsCheck = termsInput.checked;

        if (!name) {
            nameInput.classList.add('is-invalid');
            alert('Vui lòng nhập họ và tên!');
            return;
        }

        if (!nameRegex.test(name)) {
            nameInput.classList.add('is-invalid');
            alert('Họ tên phải bắt đầu bằng chữ hoa');
            return;
        }

        if (name.split(' ').length < 2) {
            nameInput.classList.add('is-invalid');
            alert('Vui lòng nhập đầy đủ họ và tên!');
            return;
        }


        if (!email) {
            emailInput.classList.add('is-invalid');
            alert('Vui lòng nhập email!');
            return;
        }


        if (!emailRegex.test(email)) {
            emailInput.classList.add('is-invalid');
            alert('Email phải có định dạng: example@gmail.com');
            return;
        }

        if (!sdt) {
            phoneInput.classList.add('is-invalid');
            alert('Vui lòng nhập số điện thoại!');
            return;
        }

        if (!phoneRegex.test(sdt)) {
            phoneInput.classList.add('is-invalid');
            alert('Số điện thoại phải có 10 chữ số');
            return;
        }

        if (!password) {
            passwordInput.classList.add('is-invalid');
            alert('Vui lòng nhập mật khẩu!');
            return;
        }

        if (password.length < 6) {
            passwordInput.classList.add('is-invalid');
            alert('Mật khẩu phải có ít nhất 6 ký tự');
            return;
        }

        if (!passRegex.test(password)) {
            passwordInput.classList.add('is-invalid');
            alert('Mật khẩu bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt!');
            return;
        }

        if (!termsCheck) {
            alert('Bạn chưa đồng ý với điều khoản dịch vụ!');
            return;
        }

        alert('Đăng ký thành công! Bạn cần đăng nhập lại.');
        setTimeout(() => {
            window.location.href = "../HTML/login.html";
        }, 1000);

    });
});




