
// ===== SUPABASE =====
const SUPABASE_URL = "https://mqklzkuuqytdcuwytuwt.supabase.co";
const SUPABASE_KEY = "sb_publishable_fIsRoO9o7UCNhBfH_rqS9Q_01hMbezY";

// ===== STARGRAM =====
document.addEventListener("DOMContentLoaded", () => {
  console.log("StarGram started");

  // Telegram
  const tg = window.Telegram?.WebApp;

  if (tg) {
    tg.ready();
    tg.expand();
  }

  // Supabase
  if (
    window.supabase &&
    SUPABASE_URL.startsWith("https://") &&
    SUPABASE_KEY.startsWith("sb_publishable_")
  ) {
    window.starGramDB = window.supabase.createClient(
      SUPABASE_URL,
      SUPABASE_KEY
    );
    console.log("Supabase connected");
  } else {
    console.warn("Check Supabase URL and Publishable Key");
  }

  // NAVIGATION
  const navItems = document.querySelectorAll(".nav-item");
  const pages = document.querySelectorAll(".page");
  const title = document.getElementById("pageTitle");

  function showPage(id, button) {
    const selected = document.getElementById(id);

    if (!selected) return;

    pages.forEach(page => {
      page.classList.remove("active");
      page.style.display = "none";
    });

    selected.classList.add("active");
    selected.style.display = "block";

    navItems.forEach(item => {
      item.classList.remove("active");
    });

    button.classList.add("active");

    if (title) {
      title.textContent = button.textContent.trim();
    }
  }

  navItems.forEach(button => {
    button.addEventListener("click", () => {
      showPage(button.dataset.target, button);
    });
  });

  // Initial page
  if (navItems.length > 0) {
    showPage(navItems[0].dataset.target, navItems[0]);
  }

  // SEARCH
  const searchBtn = document.getElementById("searchBtn");
  const searchWrap = document.getElementById("searchWrap");
  const chatSearch = document.getElementById("chatSearch");

  searchBtn?.addEventListener("click", () => {
    if (searchWrap) {
      searchWrap.hidden = !searchWrap.hidden;
      if (!searchWrap.hidden) chatSearch?.focus();
    }
  });

  chatSearch?.addEventListener("input", () => {
    const query = chatSearch.value.toLowerCase();

    document.querySelectorAll(".chat-row").forEach(chat => {
      chat.style.display = chat.textContent
        .toLowerCase()
        .includes(query) ? "" : "none";
    });
  });

  // PROFILE
  const user = tg?.initDataUnsafe?.user;

  if (user) {
    const name = document.getElementById("displayName");
    const username = document.getElementById("username");
    const avatar = document.getElementById("avatar");

    if (name) {
      name.textContent =
        [user.first_name, user.last_name].filter(Boolean).join(" ");
    }

    if (username) {
      username.textContent = user.username
        ? "@" + user.username
        : "Telegram пользователь";
    }

    if (avatar) {
      avatar.textContent = (user.first_name || "S").charAt(0);
    }
  }

  // DEMO BALANCE
  const balance = document.getElementById("balance");
  const claimBtn = document.getElementById("claimBtn");
  const claimStatus = document.getElementById("claimStatus");

  let currentBalance = Number(
    localStorage.getItem("stargram_balance") || 0
  );

  if (balance) {
    balance.textContent = currentBalance;
  }

  claimBtn?.addEventListener("click", () => {
    const today = new Date().toLocaleDateString();
    const lastClaim = localStorage.getItem("stargram_claim_date");

    if (lastClaim === today) {
      if (claimStatus) {
        claimStatus.textContent = "Награда уже получена сегодня.";
      }
      return;
    }

    currentBalance += 25;

    localStorage.setItem("stargram_balance", currentBalance);
    localStorage.setItem("stargram_claim_date", today);

    if (balance) balance.textContent = currentBalance;

    if (claimStatus) {
      claimStatus.textContent = "Получено 25 демонстрационных ⭐";
    }
  });

  // MENU
  document.getElementById("menuBtn")?.addEventListener("click", () => {
    alert("Меню StarGram");
  });

  console.log("All StarGram buttons initialized");
});
