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
    
    let profiles = {};
    
    const savedProfiles = localStorage.getItem('helltaker_profiles');
    if (savedProfiles) {
        profiles = JSON.parse(savedProfiles);
    }
    
    if (!profiles[currentUser]) {
        const now = new Date();
        const day = now.getDate();
        const month = now.getMonth() + 1;
        const year = now.getFullYear();
        
        let defaultAvatar = 'default-avatar.gif';
        if (currentUser === 'admin') {
            defaultAvatar = 'admin-avatar.gif';
        }
        
        profiles[currentUser] = {
            name: currentUser,
            email: '',
            bio: '',
            avatar: defaultAvatar,
            favoriteDemon: 'Люцифер',
            password: '',
            isAdmin: (currentUser === 'admin'),
            memberSince: day + '.' + month + '.' + year,
            lastLogin: day + '.' + month + '.' + year,
            visits: 1
        };
        
        for (let i = 0; i < users.length; i++) {
            if (users[i].login === currentUser) {
                profiles[currentUser].password = users[i].password;
                break;
            }
        }
        
        localStorage.setItem('helltaker_profiles', JSON.stringify(profiles));
    } else {
        const now = new Date();
        const day = now.getDate();
        const month = now.getMonth() + 1;
        const year = now.getFullYear();
        profiles[currentUser].lastLogin = day + '.' + month + '.' + year;
        profiles[currentUser].visits++;
        localStorage.setItem('helltaker_profiles', JSON.stringify(profiles));
    }
    
    const isAdmin = (currentUser === 'admin');
    
    document.getElementById('profileLogin').value = currentUser;
    document.getElementById('profileName').value = profiles[currentUser].name || '';
    document.getElementById('profileEmail').value = profiles[currentUser].email || '';
    document.getElementById('profileBio').value = profiles[currentUser].bio || '';
    document.getElementById('avatarSelect').value = profiles[currentUser].avatar || (isAdmin ? 'admin-avatar.gif' : 'default-avatar.gif');
    document.getElementById('favoriteDemon').value = profiles[currentUser].favoriteDemon || 'Люцифер';
    
    const avatarImg = document.getElementById('avatarPreview');
    let avatarPath = profiles[currentUser].avatar;
    
    if (isAdmin) {
        avatarPath = 'admin-avatar.gif';
    } else if (!avatarPath || avatarPath === '') {
        avatarPath = 'default-avatar.gif';
    }
    
    avatarImg.onerror = function() {
        this.style.display = 'none';
        this.insertAdjacentHTML('afterend', '<div class="avatar-placeholder">' + (isAdmin ? 'A' : currentUser.charAt(0).toUpperCase()) + '</div>');
    };
    avatarImg.src = avatarPath;
    
    const avatarSelect = document.getElementById('avatarSelect');
    if (isAdmin) {
        avatarSelect.innerHTML = '<option value="admin-avatar.gif">Админ аватар</option>';
        avatarSelect.disabled = false;
    }
    
    document.getElementById('statMemberSince').textContent = profiles[currentUser].memberSince || '-';
    document.getElementById('statLastLogin').textContent = profiles[currentUser].lastLogin || '-';
    document.getElementById('statVisits').textContent = profiles[currentUser].visits || 0;
    
    if (isAdmin) {
        const statsGrid = document.querySelector('.stats-grid');
        const adminCard = document.createElement('div');
        adminCard.className = 'stat-card';
        adminCard.innerHTML = '<div class="stat-value"></div><div class="stat-label">Администратор</div>';
        statsGrid.appendChild(adminCard);
    }
    
    document.getElementById('avatarSelect').addEventListener('change', function() {
        const selectedAvatar = this.value;
        const avatarImage = document.getElementById('avatarPreview');
        const placeholder = document.querySelector('.avatar-placeholder');
        
        if (placeholder) {
            placeholder.remove();
            avatarImage.style.display = 'block';
        }
        
        avatarImage.onerror = function() {
            this.style.display = 'none';
            this.insertAdjacentHTML('afterend', '<div class="avatar-placeholder">' + (isAdmin ? 'A' : currentUser.charAt(0).toUpperCase()) + '</div>');
        };
        avatarImage.src = selectedAvatar;
    });
    
    document.getElementById('saveProfileBtn').addEventListener('click', function() {
        const newName = document.getElementById('profileName').value.trim();
        const newEmail = document.getElementById('profileEmail').value.trim();
        const newBio = document.getElementById('profileBio').value.trim();
        const newFavorite = document.getElementById('favoriteDemon').value;
        const newPassword = document.getElementById('profilePassword').value;
        const newPasswordConfirm = document.getElementById('profilePasswordConfirm').value;
        const messageDiv = document.getElementById('profileMessage');
        
        if (newPassword !== newPasswordConfirm) {
            messageDiv.textContent = 'Пароли не совпадают';
            messageDiv.className = 'profile-message error';
            return;
        }
        
        let newAvatar = profiles[currentUser].avatar;
        if (!isAdmin) {
            newAvatar = document.getElementById('avatarSelect').value;
        }
        
        profiles[currentUser].name = newName || currentUser;
        profiles[currentUser].email = newEmail;
        profiles[currentUser].bio = newBio;
        profiles[currentUser].avatar = newAvatar;
        profiles[currentUser].favoriteDemon = newFavorite;
        
        if (newPassword && newPassword.length >= 3) {
            profiles[currentUser].password = newPassword;
            
            for (let i = 0; i < users.length; i++) {
                if (users[i].login === currentUser) {
                    users[i].password = newPassword;
                    break;
                }
            }
            saveUsers();
            
            if (isAdmin && newPassword !== 'admin') {
                messageDiv.textContent = 'Внимание! Пароль admin изменён. Теперь он: ' + newPassword;
                messageDiv.className = 'profile-message error';
                setTimeout(function() {
                    messageDiv.textContent = '';
                }, 5000);
            }
        }
        
        localStorage.setItem('helltaker_profiles', JSON.stringify(profiles));
        
        if (!isAdmin || (isAdmin && newPassword === '')) {
            messageDiv.textContent = 'Изменения сохранены успешно';
            messageDiv.className = 'profile-message success';
        }
        
        document.getElementById('profilePassword').value = '';
        document.getElementById('profilePasswordConfirm').value = '';
        
        if (!isAdmin) {
            const avatarImage = document.getElementById('avatarPreview');
            const placeholder = document.querySelector('.avatar-placeholder');
            if (placeholder) {
                placeholder.remove();
                avatarImage.style.display = 'block';
            }
            avatarImage.onerror = function() {
                this.style.display = 'none';
                this.insertAdjacentHTML('afterend', '<div class="avatar-placeholder">' + currentUser.charAt(0).toUpperCase() + '</div>');
            };
            avatarImage.src = newAvatar;
        }
        
        setTimeout(function() {
            if (messageDiv.textContent !== 'Внимание! Пароль admin изменён. Теперь он: ' + newPassword) {
                messageDiv.textContent = '';
                messageDiv.className = 'profile-message';
            }
        }, 3000);
    });
    
    document.getElementById('resetProfileBtn').addEventListener('click', function() {
        document.getElementById('profileName').value = profiles[currentUser].name || '';
        document.getElementById('profileEmail').value = profiles[currentUser].email || '';
        document.getElementById('profileBio').value = profiles[currentUser].bio || '';
        document.getElementById('favoriteDemon').value = profiles[currentUser].favoriteDemon || 'Люцифер';
        document.getElementById('profilePassword').value = '';
        document.getElementById('profilePasswordConfirm').value = '';
        
        if (!isAdmin) {
            document.getElementById('avatarSelect').value = profiles[currentUser].avatar || 'default-avatar.png';
            const avatarImage = document.getElementById('avatarPreview');
            const placeholder = document.querySelector('.avatar-placeholder');
            if (placeholder) {
                placeholder.remove();
                avatarImage.style.display = 'block';
            }
            avatarImage.onerror = function() {
                this.style.display = 'none';
                this.insertAdjacentHTML('afterend', '<div class="avatar-placeholder">' + currentUser.charAt(0).toUpperCase() + '</div>');
            };
            avatarImage.src = profiles[currentUser].avatar || 'default-avatar.png';
        }
        
        const messageDiv = document.getElementById('profileMessage');
        messageDiv.textContent = 'Изменения сброшены';
        messageDiv.className = 'profile-message success';
        
        setTimeout(function() {
            messageDiv.textContent = '';
            messageDiv.className = 'profile-message';
        }, 2000);
    });
})();