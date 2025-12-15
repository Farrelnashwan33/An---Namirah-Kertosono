// ============================================
// AN NAMIROH Travel - Main JavaScript
// ============================================

// Data Paket Umroh
const paketData = [
    {
        id: 1,
        nama: "Paket Umroh Reguler",
        gambar: "dokum/manazil wisam.jpg",
        durasi: "9 Hari",
        harga: "Rp 32.2 Jt",
        rating: 5,
        deskripsi: "Paket umroh reguler dengan akomodasi nyaman dan fasilitas lengkap."
    },
    {
        id: 2,
        nama: "Paket Umroh Plus",
        gambar: "dokum/pic-amjad-al-deafah-hotel-mecca-26.jpg",
        durasi: "12 Hari",
        harga: "Rp 34.45 Jt",
        rating: 5,
        deskripsi: "Paket umroh plus dengan hotel bintang 4 dan makan buffet."
    },
    {
        id: 3,
        nama: "Paket Umroh VIP",
        gambar: "dokum/pic-amjad-al-deafah-hotel-mecca-26.jpg",
        durasi: "16 Hari",
        harga: "Rp 38.3 Jt",
        rating: 5,
        deskripsi: "Paket umroh VIP dengan hotel bintang 5 dan pelayanan premium."
    }
];

// Data Galeri Foto
const galeriData = [
    "dokum/dokum.jpg",
    "dokum/dokum2.jpg",
    "dokum/dokum 3.jpg",
    "dokum/IMG-20251211-WA0038.jpg",
    "dokum/IMG-20251211-WA0039.jpg",
    "dokum/IMG-20251211-WA0040.jpg",
    "dokum/IMG-20251211-WA0041.jpg",
    "dokum/IMG-20251211-WA0042.jpg",
    "dokum/IMG-20251211-WA0043.jpg",
    "dokum/IMG-20251211-WA0044.jpg",
    "dokum/IMG-20251211-WA0045.jpg",
    "dokum/IMG-20251211-WA0046.jpg",
    "dokum/IMG-20251211-WA0047.jpg",
    "dokum/IMG-20251211-WA0048.jpg",
    "dokum/IMG-20251211-WA0049.jpg",
    "dokum/IMG-20251211-WA0050.jpg",
    "dokum/IMG-20251211-WA0051.jpg",
    "dokum/IMG-20251211-WA0052.jpg",
    "dokum/IMG-20251211-WA0053.jpg",
    "dokum/IMG-20251211-WA0054.jpg",
    "dokum/IMG-20251211-WA0055.jpg",
    "dokum/IMG-20251211-WA0056.jpg",
    "dokum/IMG-20251211-WA0057.jpg",
    "dokum/IMG-20251211-WA0058.jpg",
    "dokum/IMG-20251211-WA0059.jpg",
    "dokum/IMG-20251211-WA0060.jpg",
    "dokum/IMG-20251211-WA0061.jpg",
    "dokum/IMG-20251211-WA0062.jpg",
    "dokum/IMG-20251211-WA0063.jpg",
    "dokum/IMG-20251211-WA0064.jpg",
    "dokum/IMG-20251211-WA0065.jpg",
    "dokum/IMG-20251211-WA0066.jpg",
    "dokum/IMG-20251211-WA0067.jpg",
    "dokum/IMG-20251211-WA0068.jpg",
    "dokum/IMG-20251211-WA0069.jpg",
    "dokum/manazil wisam.jpg",
    "dokum/namiorh.jpg",
    "dokum/namiroh bannerjpg.jpg",
    "dokum/pic-amjad-al-deafah-hotel-mecca-26.jpg"
];

// Data Video Dokumentasi
const videoData = [
    {
        type: "mp4",
        url: "dokum/VID-20251211-WA0009.mp4",
        title: "Dokumentasi Umroh - Video 1"
    },
    {
        type: "mp4",
        url: "dokum/VID-20251211-WA0010.mp4",
        title: "Dokumentasi Umroh - Video 2"
    },
    {
        type: "mp4",
        url: "dokum/VID-20251211-WA0011.mp4",
        title: "Dokumentasi Umroh - Video 3"
    },
    {
        type: "mp4",
        url: "dokum/VID-20251211-WA0012.mp4",
        title: "Dokumentasi Umroh - Video 4"
    },
    {
        type: "mp4",
        url: "dokum/VID-20251211-WA0013.mp4",
        title: "Dokumentasi Umroh - Video 5"
    },
    {
        type: "mp4",
        url: "dokum/VID-20251211-WA0014.mp4",
        title: "Dokumentasi Umroh - Video 6"
    },
    {
        type: "mp4",
        url: "dokum/VID-20251211-WA0015.mp4",
        title: "Dokumentasi Umroh - Video 7"
    },
    {
        type: "mp4",
        url: "dokum/VID-20251211-WA0016.mp4",
        title: "Dokumentasi Umroh - Video 8"
    },
    {
        type: "mp4",
        url: "dokum/VID-20251211-WA0017.mp4",
        title: "Dokumentasi Umroh - Video 9"
    },
    {
        type: "mp4",
        url: "dokum/VID-20251214-WA0004.mp4",
        title: "Dokumentasi Umroh - Video 10"
    },
    {
        type: "mp4",
        url: "dokum/VID-20251214-WA0005.mp4",
        title: "Dokumentasi Umroh - Video 11"
    },
    {
        type: "mp4",
        url: "dokum/VID-20251214-WA0006.mp4",
        title: "Dokumentasi Umroh - Video 12"
    },
    {
        type: "mp4",
        url: "dokum/VID-20251214-WA0007.mp4",
        title: "Dokumentasi Umroh - Video 13"
    },
    {
        type: "mp4",
        url: "dokum/VID-20251214-WA0008.mp4",
        title: "Dokumentasi Umroh - Video 14"
    },
    {
        type: "mp4",
        url: "dokum/VID-20251214-WA0009.mp4",
        title: "Dokumentasi Umroh - Video 15"
    },
    {
        type: "mp4",
        url: "dokum/VID-20251214-WA0010.mp4",
        title: "Dokumentasi Umroh - Video 16"
    },
    {
        type: "mp4",
        url: "dokum/VID-20251214-WA0011.mp4",
        title: "Dokumentasi Umroh - Video 17"
    },
    {
        type: "mp4",
        url: "dokum/VID-20251214-WA0012.mp4",
        title: "Dokumentasi Umroh - Video 18"
    },
    {
        type: "mp4",
        url: "dokum/VID-20251214-WA0013.mp4",
        title: "Dokumentasi Umroh - Video 19"
    },
    {
        type: "mp4",
        url: "dokum/VID-20251214-WA0014.mp4",
        title: "Dokumentasi Umroh - Video 20"
    }
];

// Data Testimoni
const testimoniData = [
    {
        nama: "Ahmad Hidayat",
        foto: "https://i.pravatar.cc/150?img=1",
        rating: 5,
        komentar: "Pelayanan sangat memuaskan, akomodasi nyaman, dan tim sangat profesional. Alhamdulillah perjalanan umroh kami berjalan lancar."
    },
    {
        nama: "Siti Nurhaliza",
        foto: "https://i.pravatar.cc/150?img=5",
        rating: 5,
        komentar: "Terima kasih AN NAMIROH, perjalanan haji kami sangat berkesan. Semua fasilitas sesuai dengan yang dijanjikan."
    },
    {
        nama: "Budi Santoso",
        foto: "https://i.pravatar.cc/150?img=12",
        rating: 5,
        komentar: "Paket lengkap, harga terjangkau, dan pelayanan ramah. Recommended untuk yang ingin umroh atau haji."
    }
];

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', function() {
    initNavbar();
    loadPaket();
    loadGaleri();
    loadVideo();
    loadTestimoni();
    initLazyLoading();
    initSmoothScroll();
});

// Navbar Scroll Effect
function initNavbar() {
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Load Paket Cards
function loadPaket() {
    const container = document.getElementById('paketContainer');
    
    paketData.forEach(paket => {
        const card = document.createElement('div');
        card.className = 'col-md-4';
        card.innerHTML = `
            <div class="card paket-card shadow-sm h-100">
                <div class="position-relative">
                    <img src="${paket.gambar}" 
                         class="card-img-top" 
                         alt="${paket.nama}"
                         loading="lazy">
                    <span class="badge bg-warning position-absolute top-0 end-0 m-2">${paket.durasi}</span>
                </div>
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${paket.nama}</h5>
                    <p class="card-text text-muted small">${paket.deskripsi}</p>
                    <div class="rating mb-2">
                        ${'<i class="bi bi-star-fill"></i>'.repeat(paket.rating)}
                    </div>
                    <div class="mt-auto">
                        <p class="fw-bold text-primary mb-2">${paket.harga}</p>
                        <button class="btn btn-primary w-100" 
                                data-bs-toggle="modal" 
                                data-bs-target="#paketModal${paket.id}">
                            <i class="bi bi-info-circle"></i> Detail
                        </button>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(card);
        
        // Create Modal for each paket
        createPaketModal(paket);
    });
}

// Create Paket Modal
function createPaketModal(paket) {
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.id = `paketModal${paket.id}`;
    modal.innerHTML = `
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">${paket.nama}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <img src="${paket.gambar}" class="img-fluid rounded mb-3" alt="${paket.nama}">
                    <p><strong>Durasi:</strong> ${paket.durasi}</p>
                    <p><strong>Harga:</strong> ${paket.harga}</p>
                    <p>${paket.deskripsi}</p>
                    <hr>
                    <h6>Fasilitas:</h6>
                    <ul>
                        <li>Tiket pesawat pulang pergi</li>
                        <li>Visa Umroh</li>
                        <li>Hotel bintang 3-4</li>
                        <li>Makan 3x sehari</li>
                        <li>Transportasi AC</li>
                        <li>Guide berpengalaman</li>
                    </ul>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Tutup</button>
                    <a href="https://wa.me/6281259673929?text=Halo,%20saya%20tertarik%20dengan%20${encodeURIComponent(paket.nama)}" 
                       class="btn btn-success" 
                       target="_blank">
                        <i class="bi bi-whatsapp"></i> Hubungi via WhatsApp
                    </a>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

// Load Galeri
function loadGaleri() {
    const container = document.getElementById('galeriContainer');
    
    galeriData.forEach((url, index) => {
        const col = document.createElement('div');
        col.className = 'col-md-4 col-sm-6';
        col.innerHTML = `
            <div class="galeri-item" data-bs-toggle="modal" data-bs-target="#galeriModal" data-image="${url}">
                <img src="${url}" 
                     alt="Galeri ${index + 1}" 
                     class="img-fluid"
                     loading="lazy">
            </div>
        `;
        container.appendChild(col);
    });
    
    // Create Galeri Modal
    createGaleriModal();
}

// Create Galeri Modal
function createGaleriModal() {
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.id = 'galeriModal';
    modal.innerHTML = `
        <div class="modal-dialog modal-xl modal-dialog-centered">
            <div class="modal-content bg-dark">
                <div class="modal-header border-0">
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body text-center p-0">
                    <img id="galeriModalImage" src="" class="img-fluid" alt="Galeri">
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    
    // Event listener for galeri items
    document.querySelectorAll('.galeri-item').forEach(item => {
        item.addEventListener('click', function() {
            const imageUrl = this.getAttribute('data-image');
            document.getElementById('galeriModalImage').src = imageUrl;
        });
    });
}

// Load Video
function loadVideo() {
    const container = document.getElementById('videoContainer');
    
    videoData.forEach((video, index) => {
        const col = document.createElement('div');
        col.className = 'col-md-4';
        
        let videoHtml = '';
        if (video.type === 'youtube') {
            videoHtml = `
                <div class="video-wrapper">
                    <iframe src="https://www.youtube.com/embed/${video.id}" 
                            frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowfullscreen>
                    </iframe>
                </div>
                <h6 class="mt-2">${video.title}</h6>
            `;
        } else if (video.type === 'mp4') {
            videoHtml = `
                <div class="video-wrapper">
                    <video controls class="w-100 h-100">
                        <source src="${video.url}" type="video/mp4">
                        Browser Anda tidak mendukung video.
                    </video>
                </div>
                <h6 class="mt-2">${video.title}</h6>
            `;
        }
        
        col.innerHTML = videoHtml;
        container.appendChild(col);
    });
}

// Load Testimoni
function loadTestimoni() {
    const container = document.getElementById('testimoniContainer');
    
    testimoniData.forEach(testimoni => {
        const col = document.createElement('div');
        col.className = 'col-md-4';
        col.innerHTML = `
            <div class="card testimoni-card shadow-sm h-100">
                <div class="card-body">
                    <div class="d-flex align-items-center mb-3">
                        <img src="${testimoni.foto}" 
                             alt="${testimoni.nama}" 
                             class="testimoni-avatar me-3"
                             loading="lazy">
                        <div>
                            <h6 class="mb-0">${testimoni.nama}</h6>
                            <div class="text-warning">
                                ${'<i class="bi bi-star-fill"></i>'.repeat(testimoni.rating)}
                            </div>
                        </div>
                    </div>
                    <p class="card-text">"${testimoni.komentar}"</p>
                </div>
            </div>
        `;
        container.appendChild(col);
    });
}

// Lazy Loading Images
function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        images.forEach(img => img.classList.add('loaded'));
    }
}

// Smooth Scroll
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Show Toast Notification
function showToast(message, type = 'info') {
    const toastContainer = document.querySelector('.toast-container');
    const toast = document.createElement('div');
    toast.className = `toast align-items-center text-white bg-${type} border-0`;
    toast.setAttribute('role', 'alert');
    toast.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">${message}</div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
    `;
    toastContainer.appendChild(toast);
    
    const bsToast = new bootstrap.Toast(toast);
    bsToast.show();
    
    toast.addEventListener('hidden.bs.toast', () => {
        toast.remove();
    });
}

// Export functions for chatbot
window.showToast = showToast;

