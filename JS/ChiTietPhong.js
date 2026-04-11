document.addEventListener("DOMContentLoaded", function () {

    const data = JSON.parse(localStorage.getItem("selectedRoom"));
    if (data) {
        document.getElementById("display-name").innerText = data.name;
        document.getElementById("display-price").innerText = data.price;
        document.getElementById("display-rating").innerText = data.rating;
        document.getElementById("display-checkin").innerText = data.checkIn;
        document.getElementById("display-checkout").innerText = data.checkOut;
        document.getElementById("display-guests").innerText = data.guests;
    }

    const reviews = [
        { name: "Anh Hoàng", comment: "Không gian cực kỳ yên tĩnh, decor vintage rất hợp để chụp ảnh sống ảo. Nhân viên nhiệt tình hỗ trợ 24/7." },
        { name: "Chị Lan", comment: "Phòng tắm sạch sẽ, nước nóng ổn định. View ban công nhìn thẳng ra thành phố rất đẹp về đêm." },
        { name: "Minh Tú", comment: "Gần trung tâm nhưng không ồn ào. Nệm rất êm, ngủ cực ngon." },
        { name: "Khánh An", comment: "Đầy đủ tiện nghi, phục vụ chu đáo." },
        { name: "Thùy Dung", comment: "Giá hợp lý, sẽ quay lại." },
        { name: "Quốc Bảo", comment: "Wifi mạnh, làm việc ok." }
    ];

    const reviewContainer = document.getElementById("review-container");

    reviews.forEach(r => {
        reviewContainer.innerHTML += `
        <div class="review-item p-3 border rounded mb-3 bg-light">
            <b>${r.name}</b>
            <span class="text-warning ms-2">⭐⭐⭐⭐⭐</span>
            <p class="small text-muted mt-1 mb-0">"${r.comment}"</p>
        </div>`;
    });

    const amenityContainer = document.getElementById("amenity-container");

    if (typeof getFullTags === "function") {
        const tags = getFullTags();
        amenityContainer.innerHTML = tags.map(t =>
            `<span class="badge bg-light text-dark border">${t}</span>`
        ).join("");
    }

    if (document.getElementById("bottomList") && typeof createHorizontalCard === "function") {
        for (let i = 11; i <= 20; i++) {
            bottomList.innerHTML += createHorizontalCard(i);
        }
    }
});

function goBooking() {
    window.location.href = "../HTML/DatPhong.html";
}