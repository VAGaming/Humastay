document.addEventListener("DOMContentLoaded", function () {

    const btn = document.getElementById("btn-register");

    btn.addEventListener("click", function (e) {
        e.preventDefault();

        const name = document.getElementById("hoten").value.trim();
        const email = document.getElementById("email").value.trim();
        const sdt = document.getElementById("sdt").value.trim();
        const password = document.getElementById("password").value.trim();
        const terms = document.getElementById("terms").checked;

        const nameRegex = /^[A-ZÀ-Ỹ][a-zà-ỹ]+(\s[A-ZÀ-Ỹ][a-zà-ỹ]+)+$/;

        const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,15}$/;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const phoneRegex = /^(0|\+84)[0-9]{9}$/;

        if (!name || !email || !sdt || !password) {
            alert("Vui lòng nhập đầy đủ thông tin");
            return;
        }

        if (!terms) {
            alert("Bạn cần đồng ý điều khoản");
            return;
        }

        if (!nameRegex.test(name)) {
            alert("Họ tên phải bắt đầu bằng chữ hoa và có ít nhất 2 ký tự");
            return;
        }

        if (!emailRegex.test(email)) {
            alert("Email không hợp lệ");
            return;
        }

        if (!phoneRegex.test(sdt)) {
            alert("Số điện thoại không hợp lệ");
            return;
        }

        if (!passRegex.test(password)) {
            alert("Mật khẩu 6-15 ký tự, gồm chữ hoa, chữ thường, số và ký tự đặc biệt");
            return;
        }

        if (!terms) {
            alert("Bạn cần đồng ý điều khoản");
            return;
        }

        alert("Đăng ký thành công! Bạn cần đăng nhập lại.");

        setTimeout(() => {
            window.location.href = "../HTML/login.html";
        }, 2000);
    });

});