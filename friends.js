(function () {
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
        logoutBtn.addEventListener('click', function () {
            sessionStorage.removeItem('helltaker_current_user');
            window.location.href = 'index.html';
        });
    }
})();

(function () {
    const friendsData = [
        { name: "Цербер", city: "Адский перекресток", avatar: "friend2.jpg" },
        { name: "Малина", city: "Варшава", avatar: "friend3.jpg" },
        { name: "Зрада", city: "Прага", avatar: "friend4.jpg" },
        { name: "Джастис", city: "Адская арена", avatar: "friend5.jpg" },
        { name: "Люцифер", city: "Тронный зал", avatar: "friend6.jpg" },
        { name: "Модеус", city: "Адская библиотека", avatar: "friend7.jpg" },
        { name: "Пандемоки", city: "Адский офис", avatar: "friend8.jpg" },
        { name: "Азазель", city: "Адская библиотека", avatar: "friend10.jpg" },
        { name: "Вельзивул", city: "Царство мух", avatar: "friend9.jpg" },
        { name: "Люся", city: "Царство мух", avatar: "friend11.jpg" }
    ];

    let currentNameSearch = '';
    let currentCitySearch = '';

    const friendsGrid = document.getElementById('friendsGrid');
    const searchNameInput = document.getElementById('searchName');
    const searchCityInput = document.getElementById('searchCity');

    function renderFriends() {
        let filteredFriends = [];

        for (let i = 0; i < friendsData.length; i++) {
            const friend = friendsData[i];
            const matchesName = currentNameSearch === '' || friend.name.toLowerCase().indexOf(currentNameSearch.toLowerCase()) !== -1;
            const matchesCity = currentCitySearch === '' || friend.city.toLowerCase().indexOf(currentCitySearch.toLowerCase()) !== -1;

            if (matchesName && matchesCity) {
                filteredFriends.push(friend);
            }
        }

        if (filteredFriends.length === 0) {
            friendsGrid.innerHTML = '<div class="no-results">Друзья не найдены</div>';
            return;
        }

        let html = '';
        for (let i = 0; i < filteredFriends.length; i++) {
            const friend = filteredFriends[i];
            html += `
                <div class="friend-card">
                    <img src="${friend.avatar}" alt="${friend.name}" class="friend-avatar" onerror="this.src='placeholder.jpg'">
                    <div class="friend-info">
                        <div class="friend-name">${friend.name}</div>
                        <div class="friend-city">${friend.city}</div>
                        <button class="friend-btn" disabled>Написать</button>
                    </div>
                </div>
            `;
        }

        friendsGrid.innerHTML = html;
    }

    searchNameInput.addEventListener('input', function (e) {
        currentNameSearch = e.target.value;
        renderFriends();
    });

    searchCityInput.addEventListener('input', function (e) {
        currentCitySearch = e.target.value;
        renderFriends();
    });

    renderFriends();
})();