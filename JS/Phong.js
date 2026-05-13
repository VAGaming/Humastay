document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".cho").forEach(group => {
        const tabs = group.querySelectorAll("a");

        tabs.forEach(tab => {
            tab.addEventListener("click", function (e) {
                e.preventDefault();

                tabs.forEach(t => t.classList.remove("active"));
                this.classList.add("active");
            });
        });
    });

    const minInput = document.getElementById("minInput");
    const maxInput = document.getElementById("maxInput");
    const minPrice = document.getElementById("minPrice");
    const maxPrice = document.getElementById("maxPrice");

    function formatVND(value) {
        if (!value) return "0đ";
        return Number(value).toLocaleString("vi-VN") + "đ";
    }

    function updatePrice() {
        let min = parseInt(minInput.value) || 0;
        let max = parseInt(maxInput.value) || 10000000;

        if (min > max && max !== 0) {
            [min, max] = [max, min];
            minInput.value = min;
            maxInput.value = max;
        }

        minPrice.innerText = formatVND(min);
        maxPrice.innerText = formatVND(max);
    }

    if (minInput && maxInput && minPrice && maxPrice) {
        minInput.addEventListener("input", updatePrice);
        maxInput.addEventListener("input", updatePrice);
        updatePrice();
    }

    document.querySelectorAll(".filter-sub").forEach(group => {

        const list = group.querySelector(".filter-list");
        const btn = group.querySelector(".toggle");

        if (!list || !btn) return;

        if (list.children.length <= 3) {
            btn.style.display = "none";
            return;
        }

        btn.addEventListener("click", function () {

            const isLimited = list.classList.contains("limited");

            if (isLimited) {
                list.classList.remove("limited");
                btn.innerText = "Thu gọn";
            } else {
                list.classList.add("limited");
                btn.innerText = "Xem thêm";
            }

        });

    });

    const checkInInput = document.getElementById("checkin-input");
    const checkOutInput = document.getElementById("checkout-input");

    if (checkInInput) checkInInput.value = "";
    if (checkOutInput) checkOutInput.value = "";

    const searchBtn = document.getElementById("search-btn");

    if (searchBtn) {
        searchBtn.addEventListener("click", function () {
            const btn = this;
            const checkIn = document.getElementById("checkin-input")?.value;
            const checkOut = document.getElementById("checkout-input")?.value;

            if (!checkIn || !checkOut) {
                alert("Vui lòng chọn ngày đi và ngày về");
                return;
            }

            const start = new Date(checkIn);
            const end = new Date(checkOut);
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (start < new Date(today.setDate(today.getDate() + 1))) {
                alert("Ngày đi phải sau ngày hôm nay");
                return;
            }
            if (end <= start) {
                alert("Ngày về phải sau ngày đi");
                return;
            }

            let guestsText = document.getElementById("guest-text")?.innerText || "1 phòng, 2 người lớn, 0 trẻ em";

            const searchData = {
                checkIn: checkIn,
                checkOut: checkOut,
                guests: guestsText
            };
            sessionStorage.setItem("currentSearch", JSON.stringify(searchData));

            btn.classList.add("loading");
            btn.innerText = "Đang tìm...";

            setTimeout(() => {
                btn.classList.remove("loading");
                btn.innerText = "Tìm";
                const target = document.querySelector(".main");

                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 100,
                        behavior: "smooth"
                    });
                }

            }, 1500);
        });
    }

    document.addEventListener("click", function (e) {
        const btn = e.target.closest(".view-btn");
        if (!btn) return;
        const savedSearch = JSON.parse(sessionStorage.getItem("currentSearch"));
        if (!savedSearch) {
            alert("Vui lòng nhập thông tin và nhấn nút Tìm kiếm trước");
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
            return;
        }
        const card = btn.closest(".card");
        const tags = JSON.parse(card.getAttribute("data-tags"));
        const roomData = {
            name: card.querySelector("h4, h5, h6").innerText,
            price: card.querySelector(".text-danger").innerText,
            rating: (card.querySelector(".text-primary") || card.querySelector(".position-absolute")).innerText,
            checkIn: savedSearch.checkIn,
            checkOut: savedSearch.checkOut,
            guests: savedSearch.guests,
            tags: tags
        };
        sessionStorage.setItem("selectedRoom",JSON.stringify(roomData));
        window.location.href = "../HTML/ChiTietPhong.html";
    });

    document.getElementById("applyFilterBtn").addEventListener("click", function () {
        const offcanvas = bootstrap.Offcanvas.getInstance(document.getElementById('filterSidebar'));
        if (offcanvas) {
            offcanvas.hide();
        }
    });

    const topList = document.getElementById("topList");
    const middleList = document.getElementById("middleList");
    const bottomList = document.getElementById("bottomList");

    for (let i = 1; i <= 3; i++) {
        topList.innerHTML += createHorizontalCard(i);
    }

    for (let i = 4; i <= 10; i++) {
        middleList.innerHTML += createVerticalCard(i);
    }

    for (let i = 11; i <= 20; i++) {
        bottomList.innerHTML += createHorizontalCard(i);
    }

    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    menuToggle.addEventListener('click', function (e) {
        e.stopPropagation();
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function () {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    document.addEventListener('click', function (e) {
        if (!e.target.closest('.nav-container')) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    window.addEventListener('scroll', function () {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

let room = 1;
let adult = 2;
let child = 0;

function toggleGuest() {
    const box = document.getElementById("guest-dropdown");
    if (!box) return;

    box.classList.toggle("d-none");
}

function change(type, value) {
    if (type === "room") room = Math.max(1, room + value);
    if (type === "adult") adult = Math.max(1, adult + value);
    if (type === "child") child = Math.max(0, child + value);

    document.getElementById("room").innerText = room;
    document.getElementById("adult").innerText = adult;
    document.getElementById("child").innerText = child;

    document.getElementById("guest-text").innerText =
        `${room} phòng, ${adult} người lớn, ${child} trẻ em`;
}

document.addEventListener("click", function (e) {
    const dropdown = document.getElementById("guest-dropdown");
    const box = document.querySelector(".position-relative");

    if (!dropdown || !box) return;

    if (!box.contains(e.target)) {
        dropdown.classList.add("d-none");
    }
});

const roomNames = [
    "Deluxe View Núi", "Standard Tiết Kiệm", "Suite Cao Cấp",
    "Family 4 Người", "Superior View Vườn", "Phòng Dorm",
    "Luxury King Bed", "Studio Hiện Đại", "Phòng Gác Mái",
    "Phòng Vintage", "Phòng View Hồ", "Phòng Minimalist",
    "Phòng Chill Ban Công", "Phòng Romantic", "Phòng Sunset",
    "Phòng Sunrise", "Phòng Business", "Phòng Nghỉ Dưỡng",
    "Phòng Thiên Nhiên", "Phòng Rooftop"
];

const tagPool = {
    loaiPhong: [
        "Phòng Standard", "Phòng Superior", "Phòng Deluxe", "Phòng Suite",
        "Phòng Twin", "Phòng Double", "Phòng Triple", "Phòng Family", "Phòng Dorm"
    ],
    dangPhong: [
        "Phòng thường", "Phòng VIP"
    ],
    tienNghiPhong: [
        "Giường", "Nệm", "Chăn", "Gối",
        "Điều hòa", "Quạt", "Tủ quần áo",
        "Bàn làm việc", "Két an toàn", "Mini bar",
        "Ấm đun nước", "Máy sấy tóc",
        "Gương trang điểm", "Rèm cửa chống sáng",
        "Ban công riêng", "Cách âm"
    ],
    phongTam: [
        "Phòng tắm riêng", "Nước nóng lạnh",
        "Khăn tắm", "Đồ vệ sinh cá nhân"
    ],
    nhaBep: [
        "Bếp nấu ăn", "Tủ lạnh", "Lò vi sóng", "Dụng cụ nấu ăn"
    ],
    congNghe: [
        "WiFi", "TV", "Truyền hình cáp", "Netflix"
    ],
    tienIch: [
        "Máy giặt", "Dọn phòng", "Chỗ đậu xe",
        "Máy pha cà phê"
    ],
    giaiTri: [
        "Hồ bơi", "BBQ", "Karaoke", "Boardgame"
    ],
    khongGianTrong: [
        "Phòng ngủ riêng", "Phòng khách",
        "Khu bếp chung", "Phòng ăn",
        "Không gian làm việc", "Phòng sinh hoạt chung"
    ],
    khongGianNgoai: [
        "Ban công", "Sân vườn", "Sân thượng",
        "Khu BBQ ngoài trời", "Hồ bơi",
        "Khu vực ngồi ngoài trời"
    ],
    canhQuan: [
        "View biển", "View núi", "View thành phố",
        "View vườn", "Gần thiên nhiên"
    ],
    traiNghiem: [
        "Góc sống ảo",
        "Decor hiện đại", "Decor vintage",
        "Không gian yên tĩnh", "Không gian thư giãn",
        "Phù hợp làm việc"
    ],
    chinhSach: [
        "Hủy miễn phí", "Không cần thẻ",
        "Thanh toán tại nơi ở", "Đặt trước trả sau",
        "Xuất hóa đơn điện tử"
    ]
};

function getRandomFromArray(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function getAllTags() {
    let result = [];

    Object.values(tagPool).forEach(group => {
        result = result.concat(group);
    });

    return result.sort(() => 0.5 - Math.random());
}

function getFullTags() {
    return Object.values(tagPool).map(group => getRandomFromArray(group));
}

function getTagsVertical() {
    let groups = Object.keys(tagPool)
        .sort(() => 0.5 - Math.random())
        .slice(0, Math.floor(Math.random() * 2) + 5);

    let result = [];

    groups.forEach(g => {
        result.push(getRandomFromArray(tagPool[g]));
    });

    return result;
}

function getTagsHorizontal() {
    return getAllTags();
}

function getPrice(base) {
    let price = base + Math.floor(Math.random() * 90000);
    return price.toLocaleString();
}

function renderTags(tags) {
    return tags.map(t =>
        `<span class="badge bg-secondary me-1 mb-1">${t}</span>`
    ).join("");
}

function createHorizontalCard(i) {
    let tagArr = getFullTags();
    let tags = renderTags(tagArr);

    return `
    <div class="card shadow-sm mb-3" data-tags='${JSON.stringify(tagArr)}'>
        <div class="row g-0">

            <div class="col-md-4 col-12">
                <img src="../IMG/${i}.webp" 
                     class="img-fluid w-100 h-100 object-fit-cover rounded-start">
            </div>

            <div class="col-md-5 col-12 p-3 d-flex flex-column">
                <h5 class="fw-bold mb-2">${roomNames[i - 1]}</h5>

                <div class="tags mb-2">
                    ${tags}
                </div>
            </div>

            <div class="col-md-3 col-12 p-3 d-flex flex-column justify-content-between text-md-end text-start">

                <div class="text-primary fw-bold">
                    <i class="bi bi-star-fill text-warning"></i>
                    ${(3 + Math.random() * 2).toFixed(1)}
                </div>

                <div class="text-danger fw-bold fs-5">
                    ${(400000 + i * 50000).toLocaleString()} VND
                </div>

                <button class="btn btn-warning btn-sm fw-bold px-4 view-btn">
                    Xem phòng
                </button>
            </div>

        </div>
    </div>
    `;
}

function createVerticalCard(i) {
    let tagArr = getTagsVertical();
    let tags = renderTags(tagArr);

    return `
    <div class="col-lg-4 col-md-6 col-12">
        <div class="card shadow-sm h-100" data-tags='${JSON.stringify(tagArr)}'>

            <div class="position-relative">
                <img src="../IMG/${i}.webp" class="card-img-top object-fit-cover">

                <div class="position-absolute top-0 end-0 bg-primary text-white px-2 py-1 small rounded m-2">
                    <i class="bi bi-star-fill text-warning"></i>
                    ${(3 + Math.random() * 2).toFixed(1)}
                </div>
            </div>

            <div class="card-body d-flex flex-column">

                <h6 class="fw-bold">${roomNames[i - 1]}</h6>

                <div class="tags mb-2">
                    ${tags}
                </div>

                <div class="text-danger fw-bold mb-2">
                    ${(300000 + i * 40000).toLocaleString()} VND
                </div>

                <button class="btn btn-warning btn-sm fw-bold px-4 view-btn">
                    Xem phòng
                </button>

            </div>

        </div>
    </div>
    `;
}