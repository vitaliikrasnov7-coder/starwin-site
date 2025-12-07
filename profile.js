// Получаем ID Telegram из URL
function getParam(name){
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}
const telegramId = getParam("id");
if(!telegramId){
    alert("Не найден ID пользователя!");
}

// Мокаем API профиля (можно заменить fetch к боту)
async function fetchUserProfile(id){
    return {
        id: id,
        first_name: "Виталий",
        last_name: "Ура",
        avatar: "https://t.me/i/userpic/320/username.jpg"
    };
}

// Рендер профиля
let USER_PROFILE = {};
fetchUserProfile(telegramId).then(user=>{
    USER_PROFILE = user;
    document.getElementById("profileAvatar").src = USER_PROFILE.avatar;
    document.getElementById("profileName").textContent = USER_PROFILE.first_name + " " + USER_PROFILE.last_name;
});