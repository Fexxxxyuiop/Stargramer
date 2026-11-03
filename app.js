
// STARGRAM APP.JS

// Данные Supabase — оставь свои значения
const SUPABASE_URL = "https://mqklzkuuqytdcuwytuwt.supabase.co";
const SUPABASE_KEY = "sb_publishable_fIsRoO9o7UCNhBfH_rqS9Q_01hMbezY";

// Telegram WebApp
const tg = window.Telegram?.WebApp;
tg?.ready();
tg?.expand();

const $ = id => document.getElementById(id);

// Подключение Supabase
window.starGramDB = null;

const supabaseScript = document.createElement("script");
supabaseScript.src =
  "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";

supabaseScript.onload = () => {
  if (
    SUPABASE_URL.startsWith("https://") &&
    SUPABASE_KEY.startsWith("sb_publishable_")
  ) {
    window.starGramDB = window.supabase.createClient(
      SUPABASE_URL,
      SUPABASE_KEY
    );
    console.log("StarGram: Supabase initialized");
  }
};

document.head.appendChild(supabaseScript);

// Переключение страниц
const pages = {
  chatsPage: "Чаты",
  contactsPage: "Контакты",
  giftsPage: "Подарки",
  profilePage: "Профиль"
};

document.querySelectorAll(".nav-item").forEach(button => {
  button.addEventListener("click", () => {
    const target = button.dataset.target;

    document.querySelectorAll(".nav-item").forEach(item => {
      item.classList.remove("active");
    });

    document.querySelectorAll(".page").forEach(page => {
      page.classList.remove("active");
    });

    button.classList.add("active");
    $(target)?.classList.add("active");

    $("pageTitle").textContent = pages[target] || "StarGram";
    $("searchWrap").hidden = target !== "chatsPage";
  });
});

// Поиск
$("searchBtn")?.addEventListener("click", () => {
  $("searchWrap").hidden = !$("searchWrap").hidden;

  if (!$("searchWrap").hidden) {
    $("chatSearch")?.focus();
  }
});

$("chatSearch")?.addEventListener("input", event => {
  const query = event.target.value.toLowerCase();

  document.querySelectorAll(".chat-row").forEach(chat => {
    chat.hidden = !chat.textContent.toLowerCase().includes(query);
  });
});

// Меню
$("menuBtn")?.addEventListener("click", () => {
  alert("Меню StarGram появится в следующем обновлении.");
});

// Данные пользователя Telegram
if (tg?.initDataUnsafe?.user) {
  const user = tg.initDataUnsafe.user;

  $("displayName").textContent =
    [user.first_name, user.last_name].filter(Boolean).join(" ") ||
    "Пользователь";

  $("username").textContent = user.username
    ? "@" + user.username
    : "Telegram-пользователь";

  $("avatar").textContent =
    (user.first_name || "S").charAt(0).toUpperCase();
}

// Демо-баланс
let stars = Number(localStorage.getItem("sg_stars") || 0);
let claimedDate = localStorage.getItem("sg_daily_date") || "";

function getToday() {
  const date = new Date();
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0")
  ].join("-");
}

function updateBalance() {
  $("balance").textContent = stars;

  const alreadyClaimed = claimedDate === getToday();

  $("claimBtn").disabled = alreadyClaimed;
  $("claimBtn").textContent = alreadyClaimed
    ? "Получено сегодня ✓"
    : "Получить 25 ⭐";

  $("claimStatus").textContent = alreadyClaimed
    ? "Возвращайся завтра за новой наградой"
    : "Тебе доступна ежедневная награда";
}

// Ежедневная награда
$("claimBtn")?.addEventListener("click", () => {
  if (claimedDate === getToday()) return;

  stars += 25;
  claimedDate = getToday();

  localStorage.setItem("sg_stars", String(stars));
  localStorage.setItem("sg_daily_date", claimedDate);

  updateBalance();
});

// Запуск
updateBalance();

console.log("StarGram запущен!");
