document.addEventListener("DOMContentLoaded", function () {
    const roomData = JSON.parse(localStorage.getItem("selectedRoom"));

    if (roomData) {
        document.getElementById("room-name").innerText = roomData.name;
        document.getElementById("checkin-date").innerText = roomData.checkIn;
        document.getElementById("checkout-date").innerText = roomData.checkOut;
        document.getElementById("guest-info").innerText = roomData.guests;

        let price = parseInt(roomData.price.replace(/\D/g, "")) || 0;

        function calcDays(checkIn, checkOut) {
            const d1 = new Date(checkIn);
            const d2 = new Date(checkOut);
            let diff = (d2 - d1) / (1000 * 60 * 60 * 24);
            return diff > 0 ? Math.ceil(diff) : 1;
        }

        let days = calcDays(roomData.checkIn, roomData.checkOut);
        let tax = 50000;
        let total = price * days + tax;

        document.getElementById("price-night").innerText =
            price.toLocaleString("vi-VN") + "đ x " + days + " đêm";

        const finalPriceElem = document.getElementById("final-price");
        if (finalPriceElem) {
            finalPriceElem.innerText = total.toLocaleString("vi-VN") + "đ";
        }
    }

    const confirmBtn = document.querySelector(".confirm-btn");

    const fields = {
        hoTen: {
            regex: /^[A-ZÀ-Ỹ][a-zà-ỹ]+(\s[A-ZÀ-Ỹ][a-zà-ỹ]+)+$/,
            formatMsg: "Nhập dữ liệu chưa đúng"
        },
        sdt: {
            regex: /^(0[3|5|7|8|9])([0-9]{8})$/,
            formatMsg: "Số điện thoại phải đủ 10 chữ số"
        },
        email: {
            regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            formatMsg: "Email chưa đúng định dạng"
        },
        cccd: {
            regex: /^[0-9]{12}$/,
            formatMsg: "CCCD phải đủ 12 số"
        },
        ngaySinh: {
            regex: /.+/,
            formatMsg: "Vui lòng chọn ngày sinh"
        }
    };

    function validate(id) {
        const input = document.getElementById(id);
        const errorLabel = input.parentElement.querySelector(".error-text");
        const value = input.value.trim();
        const config = fields[id];

        if (value === "") {
            input.classList.add("is-invalid");
            errorLabel.innerText = "Chưa nhập dữ liệu";
            return false;
        }

        if (!config.regex.test(value)) {
            input.classList.add("is-invalid");
            errorLabel.innerText = config.formatMsg;
            return false;
        }

        input.classList.remove("is-invalid");
        return true;
    }

    Object.keys(fields).forEach(id => {
        const input = document.getElementById(id);

        input.addEventListener("blur", () => validate(id));

        input.addEventListener("input", () => {
            if (input.classList.contains("is-invalid")) {
                validate(id);
            }
        });
    });

    confirmBtn.addEventListener("click", function (e) {

        let isValid = true;
        Object.keys(fields).forEach(id => {
            if (!validate(id)) isValid = false;
        });

        if (!isValid) {
            e.preventDefault();
            const firstError = document.querySelector(".is-invalid");
            if (firstError) firstError.focus();
            return;
        }

        e.preventDefault();

        const selectedRequests = [];
        document.querySelectorAll('.form-check-input:checked').forEach(cb => {
            selectedRequests.push(cb.parentElement.innerText.trim());
        });

        const noteValue = document.querySelector('textarea.form-control').value.trim();

        document.getElementById("res-name").innerText = document.getElementById("hoTen").value;
        document.getElementById("res-sdt").innerText = document.getElementById("sdt").value;
        document.getElementById("res-email").innerText = document.getElementById("email").value;
        document.getElementById("res-cccd").innerText = document.getElementById("cccd").value;
        document.getElementById("res-dob").innerText = document.getElementById("ngaySinh").value;
        document.getElementById("res-room").innerText = document.getElementById("room-name").innerText;
        document.getElementById("res-date").innerText =
            document.getElementById("checkin-date").innerText + " - " +
            document.getElementById("checkout-date").innerText;

        document.getElementById("res-total").innerText = document.getElementById("final-price").innerText;

        document.getElementById("res-requests").innerText = selectedRequests.length ? selectedRequests.join(", ") : "Không có";

        document.getElementById("res-note").innerText = noteValue || "Không có";
        document.getElementById("successModal").style.display = "flex";
    });

    document.getElementById("xn").addEventListener("click", function () {

        document.getElementById("successModal").style.display = "none";
        document.getElementById("pay-name").innerText = document.getElementById("res-name").innerText;
        document.getElementById("pay-sdt").innerText = document.getElementById("res-sdt").innerText;
        document.getElementById("pay-email").innerText = document.getElementById("res-email").innerText;
        document.getElementById("pay-dob").innerText = document.getElementById("res-dob").innerText;
        document.getElementById("pay-room").innerText = document.getElementById("res-room").innerText;
        document.getElementById("pay-date").innerText = document.getElementById("res-date").innerText;
        document.getElementById("pay-total-final").innerText = document.getElementById("res-total").innerText;

        const sdt = document.getElementById("res-sdt").innerText;
        document.getElementById("pay-code-msg").innerText = "HMS" + sdt.slice(-4);

        const modal = new bootstrap.Modal(document.getElementById('paymentModal'));
        modal.show();
    });
});

function changePayMethod(el) {
    document.querySelectorAll('.pay-option').forEach(e => {
        e.classList.remove('active');
    });
    el.classList.add('active');
    const type = el.dataset.type;
    const qrArea = document.getElementById("qr-display-area");
    const qrImg = document.getElementById("qr-img");
    if (type === "qr") {
        qrImg.src = "https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=VietQR_HUMASTAY";
        qrArea.style.display = "block";
    }
    else if (type === "momo") {
        qrImg.src = "https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=MoMo_HUMASTAY";
        qrArea.style.display = "block";
    }
    else {
        qrArea.style.display = "none";
    }
}

function completeBooking() {
    alert("Cảm ơn bạn! Đơn đặt phòng đã hoàn tất.");
    window.location.href = "../index.html";
}