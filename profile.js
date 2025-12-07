// Проверка, что Telegram Web App доступен
const tg = window.Telegram.WebApp;

if(!tg) {
    console.error("Telegram WebApp не найден!");
}

// Получаем профиль пользователя из ТГ
const USER_PROFILE = {
    id: tg.initDataUnsafe.user.id,
    first_name: tg.initDataUnsafe.user.first_name,
    last_name: tg.initDataUnsafe.user.last_name || "",
    avatar: tg.initDataUnsafe.user.photo_url || "https://via.placeholder.com/80"
};

// Функция для отображения профиля на сайте
function renderProfile(containerId){
    const container = document.getElementById(containerId);
    if(!container) return;

    container.innerHTML = `
        <div style="display:flex;align-items:center;gap:10px;color:#fff;">
            <img src="${USER_PROFILE.avatar}" alt="avatar" style="width:50px;height:50px;border-radius:50%;">
            <div>
                <div>${USER_PROFILE.first_name} ${USER_PROFILE.last_name}</div>
                <div style="font-size:12px;color:#aaa">ID: ${USER_PROFILE.id}</div>
            </div>
        </div>
    `;
}

// Пример использования
renderProfile("profileContainer");