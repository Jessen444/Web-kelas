// --- THEME TOGGLE (DARK / LIGHT MODE) ---
const themeToggleBtn = document.getElementById('themeToggle');
const themeToggleMobileBtn = document.getElementById('themeToggleMobile');
const htmlElement = document.documentElement;

// Cek preferensi tersimpan
if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    htmlElement.classList.add('dark');
} else {
    htmlElement.classList.remove('dark');
}

function toggleTheme() {
    if (htmlElement.classList.contains('dark')) {
        htmlElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    } else {
        htmlElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    }
}

themeToggleBtn.addEventListener('click', toggleTheme);
themeToggleMobileBtn.addEventListener('click', toggleTheme);


// --- MOBILE MENU TOGGLE ---
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});


// --- LIGHTBOX GALLERY ---
function openLightbox(imgSrc, title, desc) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxDesc = document.getElementById('lightboxDesc');

    lightboxImg.src = imgSrc;
    lightboxTitle.textContent = title;
    lightboxDesc.textContent = desc;

    lightbox.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// Tutup lightbox saat klik di luar modal
document.getElementById('lightbox').addEventListener('click', (e) => {
    if (e.target.id === 'lightbox') {
        closeLightbox();
    }
});


// --- FILTER GALERI FOTO KEBERSAMAAN ---
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Atur tombol aktif
        filterButtons.forEach(b => {
            b.classList.remove('bg-indigo-600', 'text-white', 'shadow-sm');
            b.classList.add('bg-slate-100', 'dark:bg-slate-800', 'text-slate-600', 'dark:text-slate-300');
        });
        btn.classList.add('bg-indigo-600', 'text-white', 'shadow-sm');
        btn.classList.remove('bg-slate-100', 'dark:bg-slate-800', 'text-slate-600', 'dark:text-slate-300');

        const filterValue = btn.getAttribute('data-filter');

        galleryItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});


// --- FILTER & PENCARIAN ANGGOTA KELAS ---
const searchMemberInput = document.getElementById('searchMember');
const memberRoleButtons = document.querySelectorAll('.member-filter-btn');
const memberCards = document.querySelectorAll('.member-card');

let currentRoleFilter = 'all';
let searchQuery = '';

function filterMembers() {
    memberCards.forEach(card => {
        const name = card.getAttribute('data-name').toLowerCase();
        const role = card.getAttribute('data-role');

        const matchesSearch = name.includes(searchQuery);
        const matchesRole = currentRoleFilter === 'all' || role === currentRoleFilter;

        if (matchesSearch && matchesRole) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

searchMemberInput.addEventListener('input', (e) => {
    searchQuery = e.target.value.toLowerCase();
    filterMembers();
});

memberRoleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        memberRoleButtons.forEach(b => {
            b.classList.remove('bg-indigo-600', 'text-white');
            b.classList.add('bg-slate-100', 'dark:bg-slate-800', 'text-slate-600', 'dark:text-slate-300');
        });
        btn.classList.add('bg-indigo-600', 'text-white');
        btn.classList.remove('bg-slate-100', 'dark:bg-slate-800', 'text-slate-600', 'dark:text-slate-300');

        currentRoleFilter = btn.getAttribute('data-role');
        filterMembers();
    });
});


// --- BUKU TAMU / GUESTBOOK INTERACTIVE ---
const guestbookForm = document.getElementById('guestbookForm');
const messagesContainer = document.getElementById('messagesContainer');

guestbookForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('guestName').value;
    const role = document.getElementById('guestRole').value;
    const message = document.getElementById('guestMessage').value;

    const newMsgCard = document.createElement('div');
    newMsgCard.className = 'bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200/60 dark:border-slate-700 shadow-sm animate-pulse';
    newMsgCard.innerHTML = `
        <div class="flex justify-between items-start mb-2">
            <div>
                <h4 class="font-bold">${escapeHTML(name)}</h4>
                <span class="text-xs text-indigo-600 dark:text-indigo-400 font-medium">${escapeHTML(role)}</span>
            </div>
            <span class="text-xs text-slate-400">Baru saja</span>
        </div>
        <p class="text-sm text-slate-600 dark:text-slate-300">${escapeHTML(message)}</p>
    `;

    messagesContainer.prepend(newMsgCard);
    
    // Hilangkan efek animasi
    setTimeout(() => newMsgCard.classList.remove('animate-pulse'), 1000);

    guestbookForm.reset();
});

// Fungsi keamanan mencegah XSS sederhana
function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
}