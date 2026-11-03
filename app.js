
// ===== SUPABASE =====
const SUPABASE_URL = "https://mqklzkuuqytdcuwytuwt.supabase.co";
const SUPABASE_KEY = "sb_publishable_fIsRoO9o7UCNhBfH_rqS9Q_01hMbezY";

// ===== STARGRAM =====
document.addEventListener("DOMContentLoaded", () => {
  console.log("StarGram started");

  // Telegram WebApp
  const tg = window.Telegram?.WebApp;
  if (tg) {
    tg.ready();
    tg.expand();
  }

  // Supabase connection
  if (
    window.supabase &&
    SUPABASE_URL.startsWith("https://") &&
    SUPABASE_KEY.startsWith("sb_publishable_")
  ) {
    window.starGramDB = window.supabase.createClient(
      SUPABASE_URL,
      SUPABASE_KEY
    );
    console.log("Supabase initialized");
  } else {
    console.warn("Supabase not initialized. Check URL and key.");
  }

  // ===== PAGE NAVIGATION =====
  const navItems = document.querySelectorAll(".nav-item");
  const pages = document.querySelectorAll(".page");

  function openPage(pageId, button) {
    const page = document.getElementById(pageId);
    if (!page) {
      console.warn("Page not found:", pageId);
      return;
    }

    pages.forEach((item) => {
      item.style.display = "none";
    });

    page.style.display = "block";

    navItems.forEach((item) => {
      item.classList.remove("active");
    });

    if (button) button.classList.add("active");

    const title = document.getElementById("pageTitle");
    if (title && button) {
      title.textContent = button.textContent.trim();
    }
  }

  navItems.forEach((button) => {
    button.addEventListener("click", () => {
      openPage(button.dataset.target, button);
    });
  });

  // Show first page
  const firstButton = navItems[0];
  if (firstButton) {
    openPage(firstButton.dataset.target, firstButton);
  }

  // ===== SEARCH =====
  const searchBtn = document.getElementById("searchBtn");
  const searchWrap = document.getElementById("searchWrap");
  const chatSearch = document.getElementById("chatSearch");

  searchBtn?.addEventListener("click", () => {
    if (!searchWrap) return;
    searchWrap.style.display =
      getComputedStyle(searchWrap).display === "none"
        ? "block"
        : "none";
  });

  chatSearch?.addEventListener("input", () => {
    const query = chatSearch.value.toLowerCase();

    document.querySelectorAll(".chat-row").forEach((chat) => {
      chat.style.display = chat.textContent.toLowerCase().includes(query)
        ? ""
        : "none";
    });
  });

  // ===== PROFILE =====
  const user = tg?.initDataUnsafe?.user;

  if (user) {
    const displayName = document.getElementById("displayName");
    const username = document.getElementById("username");

    if (displayName) {
      displayName.textContent =
        [user.first_name, user.last_name].filter(Boolean).join(" ");
    }

    if (username) {
      username.textContent = user.username
        ? "@" + user.username
        : "Telegram пользователь";
    }
  }

  // ===== DEMO STARS =====
  const balance = document.getElementById("balance");
  const claimBtn = document.getElementById("claimBtn");
  const claimStatus = document.getElementById("claimStatus");

  let currentBalance = Number(
    localStorage.getItem("stargram_balance") || 0
  );

  if (balance) balance.textContent = currentBalance + " ⭐";

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

    if (balance) balance.textContent = currentBalance + " ⭐";
    if (claimStatus) {
      claimStatus.textContent = "Получено 25 демонстрационных ⭐";
    }
  });

  // ===== MENU =====
  document.getElementById("menuBtn")?.addEventListener("click", () => {
    alert("Меню StarGram");
  });

  console.log("StarGram buttons initialized");
});
