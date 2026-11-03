
// STARGRAM — APP.JS

const SUPABASE_URL = "https://mqklzkuuqytdcuwytuwt.supabase.co";
const SUPABASE_KEY = "sb_publishable_fIsRoO9o7UCNhBfH_rqS9Q_01hMbezY";

// Telegram
const tg = window.Telegram?.WebApp;
tg?.ready();
tg?.expand();

const $ = id => document.getElementById(id);

// Подключение Supabase
window.starGramDB = null;

if (
  SUPABASE_URL.startsWith("https://") &&
  SUPABASE_KEY &&
  !SUPABASE_KEY.startsWith("ВСТАВЬ_")
) {
  const script = document.createElement("script");

  script.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";

  script.onload = () => {
    window.starGramDB = window.supabase.createClient(
      SUPABASE_URL,
      SUPABASE_KEY
    );

    console.log("StarGram: Supabase подключён");
  };

  document.head.appendChild(script);
}

// Демо-чаты
const demoChats = [
  ["SG", "StarGram", "Добро пожаловать в StarGram!", "сейчас"],
  ["🎁", "Подарки", "Открой каталог подарков", "вчера"],
  ["⭐", "StarGram News", "Новости проекта", "пн"]
];

// Демо-подарки
const demoGifts = [
  ["🌹", "Роза", "Виртуальный подарок"],
  ["🎁", "Подарок", "Виртуальный подарок"],
  ["🚀", "Ракета", "Виртуальный подарок"],
  ["💎", "Кристалл", "Виртуальный подарок"],
  ["🏆", "Кубок", "Виртуальный подарок"],
  ["👑", "Корона", "Виртуальный подарок"]
];

// Баланс
let stars = Number(localStorage.getItem("sg_stars") || 0);
let claimedDate = localStorage.getItem("sg_daily_date") || "";

const today = new Date().toLocaleDateString("en-CA");

// Отображение чатов
function renderChats(filter = "") {
  const list = $("chatList");
  if (!list) return;

  list.innerHTML = demoChats
    .filter(chat =>
      chat[1].toLowerCase().includes(filter.toLowerCase())
    )
    .map(chat => `
      <div class="chat-row">
        <div class="chat-avatar">${chat[0]}</div>
        <div class="chat-info">
          <div class="chat-name">${chat[1]}</div>
          <div class="chat-preview">${chat[2]}</div>
        </div>
        <div class="chat-time">${chat[3]}</div>
      </div>
    `).join("");
}

// Отображение подарков
function renderGifts() {
  const grid = $("giftGrid");
  if (!grid) return;

  grid.innerHTML = demoGifts.map(gift => `
    <div class="gift-card">
      <div class="gift-art">${gift[0]}</div>
      <b>${gift[1]}</b>
      <small>${gift[2]}</small>
    </div>
  `).join("");
}

// Баланс звёзд
function renderBalance() {
  if ($("balance")) {
    $("balance").textContent = `⭐ ${stars}`;
  }

  if ($("starsTotal")) {
    $("starsTotal").textContent = stars.toLocaleString("ru-RU");
  }

  if ($("profileBalance")) {
    $("profileBalance").textContent = stars.toLocaleString("ru-RU");
  }

  if ($("claimBtn")) {
    $("claimBtn").disabled = claimedDate === today;

    $("claimBtn").textContent =
      claimedDate === today
        ? "Получено сегодня ✓"
        : "Получить 25 ⭐";
  }

  if ($("claimStatus")) {
    $("claimStatus").textContent =
      claimedDate === today
        ? "Следующая награда будет доступна завтра"
        : "Ежедневная награда — 25 ⭐";
  }
}

// Ежедневный бонус
$("claimBtn")?.addEventListener("click", () => {
  if (claimedDate === today) return;

  stars += 25;
  claimedDate = today;

  localStorage.setItem("sg_stars", String(stars));
  localStorage.setItem("sg_daily_date", claimedDate);

  renderBalance();
});

// Поиск чатов
$("chatSearch")?.addEventListener("input", event => {
  renderChats(event.target.value);
});

// Переключение разделов
document.querySelectorAll(".tab").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".tab")
      .forEach(item => item.classList.remove("active"));

    document.querySelectorAll(".page")
      .forEach(page => page.classList.remove("active"));

    button.classList.add("active");

    const page = $(button.dataset.page);
    page?.classList.add("active");
  });
});

// Новые чаты
$("newChatBtn")?.addEventListener("click", () => {
  alert("Поиск пользователей появится в следующем обновлении.");
});

// Настройки
$("settingsBtn")?.addEventListener("click", () => {
  alert("Настройки StarGram появятся позже.");
});

// Данные Telegram
if (tg?.initDataUnsafe?.user) {
  const user = tg.initDataUnsafe.user;

  if ($("displayName")) {
    $("displayName").textContent =
      [user.first_name, user.last_name]
        .filter(Boolean)
        .join(" ") || "Пользователь";
  }

  if ($("username")) {
    $("username").textContent =
      user.username ? "@" + user.username : "Telegram-пользователь";
  }

  if ($("avatar")) {
    $("avatar").textContent =
      (user.first_name || "S").slice(0, 1).toUpperCase();
  }
}

// Запуск
renderChats();
renderGifts();
renderBalance();
