const tg = window.Telegram?.WebApp;
tg?.ready();
tg?.expand();
const $ = id => document.getElementById(id);
const demoChats = [
  ["SG","StarGram","Добро пожаловать! Здесь появятся ваши чаты.","сейчас"],
  ["🎁","Подарки","Исследуйте каталог подарков.","вчера"],
  ["⭐","StarGram News","Новости и обновления проекта.","пн"]
];
const demoGifts = [["🌹","Роза","Демонстрационный предмет"],["🎁","Подарок","Демонстрационный предмет"],["🚀","Ракета","Демонстрационный предмет"],["💎","Кристалл","Демонстрационный предмет"]];
let stars = Number(localStorage.getItem("sg_stars") ?? 0);
let claimedDate = localStorage.getItem("sg_daily_date") || "";
const today = new Date().toLocaleDateString("en-CA");

function renderChats(filter=""){
  $("chatList").innerHTML = demoChats.filter(c=>c[1].toLowerCase().includes(filter.toLowerCase())).map(c=>`
    <div class="chat-row"><div class="chat-avatar">${c[0]}</div><div class="chat-info"><div class="chat-name">${c[1]}</div><div class="chat-preview">${c[2]}</div></div><div class="chat-time">${c[3]}</div></div>`).join("") || '<p class="hint">Ничего не найдено</p>';
}
function renderGifts(){
  $("giftGrid").innerHTML=demoGifts.map(g=>`<div class="gift-card"><div class="gift-art">${g[0]}</div><b>${g[1]}</b><small>${g[2]}</small></div>`).join("");
}
function renderBalance(){
  $("balance").textContent=`⭐ ${stars}`;
  $("starsTotal").textContent=stars.toLocaleString("ru-RU");
  $("profileBalance").textContent=stars.toLocaleString("ru-RU");
  $("claimBtn").disabled=claimedDate===today;
  $("claimBtn").textContent=claimedDate===today?"Получено сегодня ✓":"Получить 25 ⭐";
  $("claimStatus").textContent=claimedDate===today?"Следующая награда будет доступна завтра":"Одна награда в день";
}
$("claimBtn").addEventListener("click",()=>{
  if(claimedDate===today)return;
  stars+=25; claimedDate=today;
  localStorage.setItem("sg_stars",String(stars));
  localStorage.setItem("sg_daily_date",claimedDate);
  renderBalance();
});
$("chatSearch").addEventListener("input",e=>renderChats(e.target.value));
document.querySelectorAll(".tab").forEach(btn=>btn.addEventListener("click",()=>{
  document.querySelectorAll(".tab").forEach(x=>x.classList.remove("active"));
  document.querySelectorAll(".page").forEach(x=>x.classList.remove("active"));
  btn.classList.add("active"); $(btn.dataset.page).classList.add("active");
}));
$("newChatBtn").addEventListener("click",()=>alert("Поиск пользователей подключим после настройки серверной базы данных."));
$("settingsBtn").addEventListener("click",()=>alert("Настройки аккаунта появятся после подключения авторизации."));
if(tg?.initDataUnsafe?.user){
  const u=tg.initDataUnsafe.user;
  $("displayName").textContent=[u.first_name,u.last_name].filter(Boolean).join(" ")||"Пользователь";
  $("username").textContent=u.username?"@"+u.username:"Telegram-пользователь";
  $("avatar").textContent=(u.first_name||"S").slice(0,1).toUpperCase();
}
renderChats();renderGifts();renderBalance();
