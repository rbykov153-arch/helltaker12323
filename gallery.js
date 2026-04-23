(function() {
    const currentUser = sessionStorage.getItem('helltaker_current_user');
    
    if (!currentUser) {
        window.location.href = 'index.html';
        return;
    }
    
    const userDisplay = document.getElementById('currentUserDisplay');
    if (userDisplay) {
        userDisplay.textContent = currentUser;
    }
    
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            sessionStorage.removeItem('helltaker_current_user');
            window.location.href = 'index.html';
        });
    }
    
    const galleryData = [
        { name: "Пандемоника", status: "Уставший Демон / Жестокий Демон", category: "pandemonica", image: "pandemonica1.jpg" },
        { name: "Пандемоника", status: "Уставший Демон / Жестокий Демон", category: "pandemonica", image: "pandemonica2.jpg" },
        { name: "Пандемоника", status: "Уставший Демон / Жестокий Демон", category: "pandemonica", image: "pandemonica3.jpg" },
        { name: "Пандемоника", status: "Уставший Демон / Жестокий Демон", category: "pandemonica", image: "pandemonica4.jpg" },
        { name: "Модеус", status: "Похотливый Демон", category: "modeus", image: "modeus1.jpg" },
        { name: "Модеус", status: "Похотливый Демон", category: "modeus", image: "modeus2.jpg" },
        { name: "Модеус", status: "Похотливый Демон", category: "modeus", image: "modeus3.jpg" },
        { name: "Цербер", status: "Тройной Демон", category: "cerberus", image: "cerberus1.jpg" },
        { name: "Цербер", status: "Тройной Демон", category: "cerberus", image: "cerberus2.jpg" },
        { name: "Цербер", status: "Тройной Демон", category: "cerberus", image: "cerberus3.jpg" },
        { name: "Цербер", status: "Тройной Демон", category: "cerberus", image: "cerberus4.jpg" },
        { name: "Малина", status: "Угрюмый Демон", category: "malina", image: "malina1.jpg" },
        { name: "Малина", status: "Угрюмый Демон", category: "malina", image: "malina2.jpg" },
        { name: "Малина", status: "Угрюмый Демон", category: "malina", image: "malina3.jpg" },
        { name: "Малина", status: "Угрюмый Демон", category: "malina", image: "malina4.jpg" },
        { name: "Здрада", status: "Демон Басдард", category: "zdrada", image: "zdrada1.jpg" },
        { name: "Здрада", status: "Демон Басдард", category: "zdrada", image: "zdrada2.jpg" },
        { name: "Здрада", status: "Демон Басдард", category: "zdrada", image: "zdrada3.jpg" },
        { name: "Здрада", status: "Демон Басдард", category: "zdrada", image: "zdrada4.jpg" },
        { name: "Джастис", status: "Потрясающий Демон", category: "justice", image: "justice1.jpg" },
        { name: "Джастис", status: "Потрясающий Демон", category: "justice", image: "justice2.jpg" },
        { name: "Джастис", status: "Потрясающий Демон", category: "justice", image: "justice3.jpg" },
        { name: "Люцифер", status: "Директор Ада", category: "lucifer", image: "lucifer1.jpg" },
        { name: "Люцифер", status: "Директор Ада", category: "lucifer", image: "lucifer2.jpg" },
        { name: "Люцифер", status: "Директор Ада", category: "lucifer", image: "lucifer3.jpg" },
        { name: "Люцифер", status: "Директор Ада", category: "lucifer", image: "lucifer4.jpg" },
        { name: "Вельзевул", status: "Повелительница Мух", category: "beelzebub", image: "beelzebub1.jpg" },
        { name: "Вельзевул", status: "Повелительница Мух", category: "beelzebub", image: "beelzebub2.jpg" },
        { name: "Вельзевул", status: "Повелительница Мух", category: "beelzebub", image: "beelzebub3.jpg" },
        { name: "Вельзевул", status: "Повелительница Мух", category: "beelzebub", image: "beelzebub4.jpg" },
                { name: "Вельзевул", status: "Повелительница Мух", category: "beelzebub", image: "beelzebub5.jpg" },
        { name: "Джаджмент", status: "Высший Прокурор", category: "judgement", image: "judgement1.jpg" },
        { name: "Джаджмент", status: "Высший Прокурор", category: "judgement", image: "judgement2.jpg" },
        { name: "Джаджмент", status: "Высший Прокурор", category: "judgement", image: "judgement3.jpg" },
        { name: "Азазель", status: "Любопытный Ангел", category: "azazel", image: "azazel1.jpg" },
        { name: "Азазель", status: "Любопытный Ангел", category: "azazel", image: "azazel2.jpg" },
        { name: "Азазель", status: "Любопытный Ангел", category: "azazel", image: "azazel3.jpg" },
        { name: "Азазель", status: "Любопытный Ангел", category: "azazel", image: "azazel4.jpg" }
    ];
    
    const categories = [
        { id: "all", name: "Все демоны" },
        { id: "pandemonica", name: "Пандемоника" },
        { id: "modeus", name: "Модеус" },
        { id: "cerberus", name: "Цербер" },
        { id: "malina", name: "Малина" },
        { id: "zdrada", name: "Здрада" },
        { id: "justice", name: "Джастис" },
        { id: "lucifer", name: "Люцифер" },
        { id: "beelzebub", name: "Вельзевул" },
        { id: "judgement", name: "Джаджмент" },
        { id: "azazel", name: "Азазель" }
    ];
    
    let currentFilter = 'all';
    const galleryGrid = document.getElementById('galleryGrid');
    const filterSection = document.getElementById('filterSection');
    
    function renderFilterButtons() {
        let buttonsHtml = '<button class="filter-btn active" data-category="all">Все демоны</button>';
        
        for (let i = 0; i < categories.length; i++) {
            if (categories[i].id !== 'all') {
                buttonsHtml += '<button class="filter-btn" data-category="' + categories[i].id + '">' + categories[i].name + '</button>';
            }
        }
        
        filterSection.innerHTML = buttonsHtml;
        
        const filterBtns = document.querySelectorAll('.filter-btn');
        for (let i = 0; i < filterBtns.length; i++) {
            filterBtns[i].addEventListener('click', function() {
                for (let j = 0; j < filterBtns.length; j++) {
                    filterBtns[j].classList.remove('active');
                }
                this.classList.add('active');
                currentFilter = this.getAttribute('data-category');
                renderGallery();
            });
        }
    }
    
    function getCategoryName(categoryId) {
        for (let i = 0; i < categories.length; i++) {
            if (categories[i].id === categoryId) {
                return categories[i].name;
            }
        }
        return categoryId;
    }
    
    function renderGallery() {
        let filteredItems = [];
        
        if (currentFilter === 'all') {
            filteredItems = galleryData;
        } else {
            for (let i = 0; i < galleryData.length; i++) {
                if (galleryData[i].category === currentFilter) {
                    filteredItems.push(galleryData[i]);
                }
            }
        }
        
        if (filteredItems.length === 0) {
            galleryGrid.innerHTML = '<div class="no-results">Нет фотографий в этой категории</div>';
            return;
        }
        
        let html = '';
        for (let i = 0; i < filteredItems.length; i++) {
            const item = filteredItems[i];
            html += '<div class="gallery-card" data-category="' + item.category + '">';
            html += '<img src="' + item.image + '" alt="' + item.name + '" onerror="this.src=\'placeholder.jpg\'">';
            html += '<div class="card-info">';
            html += '<div class="card-title">' + item.name + '</div>';
            html += '<div class="card-status">' + item.status + '</div>';
            html += '<div class="card-category">' + getCategoryName(item.category) + '</div>';
            html += '</div>';
            html += '</div>';
        }
        
        galleryGrid.innerHTML = html;
    }
    
    renderFilterButtons();
    renderGallery();
})();