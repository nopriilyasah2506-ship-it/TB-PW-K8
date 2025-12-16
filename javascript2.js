/* =====================================================
   GLOBAL INIT
===================================================== */
document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    setActiveMenu();
    fadeIn();
    renderPage();
});

/* =====================================================
   DARK / LIGHT MODE (GLOBAL & PERSISTENT)
===================================================== */
function initTheme() {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
        document.body.classList.add("dark-mode");
        updateThemeIcon(true);
    }
}

function toggleDark() {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    updateThemeIcon(isDark);
}

function updateThemeIcon(isDark) {
    const btn = document.querySelector(".dark-toggle");
    if (btn) btn.innerHTML = isDark ? "☀️" : "🌙";
}

/* =====================================================
   ACTIVE MENU
===================================================== */
function setActiveMenu() {
    const page = location.pathname.split("/").pop();
    document.querySelectorAll(".sidebar a").forEach(link => {
        if (link.getAttribute("href") === page) {
            link.classList.add("active");
        }
    });
}

/* =====================================================
   PAGE TRANSITION
===================================================== */
function fadeIn() {
    document.body.style.opacity = 0;
    setTimeout(() => {
        document.body.style.transition = "opacity .3s";
        document.body.style.opacity = 1;
    }, 100);
}

/* =====================================================
   PAGE ROUTER (AUTO DETECT PAGE)
===================================================== */
function renderPage() {
    if (document.getElementById("feed")) renderFeed();
    if (document.getElementById("myGallery")) renderMyGallery();
    if (document.getElementById("commentList")) renderComments();
    if (document.getElementById("profilePage")) renderProfile();
}

/* =====================================================
   HOME / FEED
===================================================== */
function renderFeed() {
    const feed = document.getElementById("feed");
    let loading = false;

    feed.innerHTML = "";
    for (let i = 0; i < 6; i++) feed.innerHTML += postTemplate();

    window.addEventListener("scroll", () => {
        if (
            window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 &&
            !loading
        ) {
            loading = true;
            setTimeout(() => {
                for (let i = 0; i < 4; i++) feed.innerHTML += postTemplate();
                attachLike();
                loading = false;
            }, 800);
        }
    });

    attachLike();
}

function postTemplate() {
    return `
    <div class="gallery-card">
        <img src="https://picsum.photos/400?${Math.random()}" class="gallery-image">
        <p><b>User</b></p>
        <p>Berbagi momen hari ini ✨</p>
        <button class="btn-like">❤️ <span>0</span></button>
        <button class="btn-comment">💬</button>
    </div>`;
}

/* =====================================================
   LIKE
===================================================== */
function attachLike() {
    document.querySelectorAll(".btn-like").forEach(btn => {
        btn.onclick = () => {
            const span = btn.querySelector("span");
            let count = parseInt(span.innerText);
            btn.classList.toggle("active");
            span.innerText = btn.classList.contains("active") ? count + 1 : count - 1;
        };
    });
}

/* =====================================================
   GALERI SAYA
===================================================== */
function renderMyGallery() {
    const gallery = document.getElementById("myGallery");
    gallery.innerHTML = "";

    for (let i = 1; i <= 6; i++) {
        gallery.innerHTML += `
        <div class="gallery-card">
            <img src="https://picsum.photos/400?user${i}">
            <p>Postingan saya #${i}</p>
            <button class="btn-danger">Hapus</button>
        </div>`;
    }
}

/* =====================================================
   KOMENTAR USER
===================================================== */
function renderComments() {
    const list = document.getElementById("commentList");
    list.innerHTML = "";

    for (let i = 1; i <= 5; i++) {
        list.innerHTML += `
        <div class="review-card">
            <b>Komentar ke-${i}</b>
            <p>Ini adalah komentar user pada postingan.</p>
        </div>`;
    }
}

/* =====================================
   PROFILE USER (FINAL FIX)
===================================== */
document.addEventListener("DOMContentLoaded", () => {
    const profileContainer = document.getElementById("profileContainer");

    if (profileContainer) {
        profileContainer.innerHTML = `
            <div class="user-card">
                <img src="https://i.pravatar.cc/150" 
                     style="border-radius:50%; margin-bottom:15px;">
                <h3>Novri Ilyasah</h3>
                <p>Email: novri@email.com</p>
                <p>Bergabung sejak: Januari 2024</p>
                <button class="btn-upload">Edit Profil</button>
            </div>
        `;
    }
});


/* =====================================================
   COMMENT MODAL
===================================================== */
document.addEventListener("click", e => {
    if (e.target.classList.contains("btn-comment")) {
        document.getElementById("commentModal").style.display = "flex";
    }
});

function closeModal() {
    document.getElementById("commentModal").style.display = "none";
}
