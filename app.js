(function () {
  const DEFAULT_PASSWORD = "ncfrobotics1947";
  const CUSTOM_ACCOUNTS_KEY = "custom_accounts";
  const DISABLED_ACCOUNTS_KEY = "disabled_accounts";
  const PASSWORD_OVERRIDES_KEY = "password_overrides";
  const PROFILE_OVERRIDES_KEY = "profile_overrides";
  const ACCOUNTS = [
    {
      username: "jssucao",
      password: DEFAULT_PASSWORD,
      displayName: "Julianne Savannah Sucao",
      birthday: "April 11, 2011",
      committee: "Technichal And Engeeneering",
      position: "Secretary(JHS)",
      role: "student",
      photoDataUrl: "",
      achievements: [
        "FLL PARTICIPANT 2026",
        "FLL SUMMIT 2025 PARTICIPANT",
        "Perfect Attendance",
        "Perfect Attendance For Meetings",
        "Secretary of JHS Robotics Club 2026",
        "Treasurer Of JHS Robotics Club 2025",
        "Christmas Party 2025 Attendance",
      ],
      forcePasswordChange: false,
    },
    {
      username: "admin",
      password: "admin",
      displayName: "Admin",
      birthday: "",
      committee: "",
      position: "",
      role: "admin",
      photoDataUrl: "",
      achievements: [],
      forcePasswordChange: false,
    },
  ];
  const SESSION_KEY = "login_session";

  const form = document.getElementById("login-form");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const errorEl = document.getElementById("form-error");
  const submitBtn = document.getElementById("submit-btn");
  const pageEl = document.getElementById("app-page");

  function getSession() {
    try {
      const raw = sessionStorage.getItem(SESSION_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  if (getSession()) {
    window.location.replace("dashboard.html");
    return;
  }

  function showError(message) {
    errorEl.textContent = message;
    errorEl.hidden = false;
  }

  function clearError() {
    errorEl.textContent = "";
    errorEl.hidden = true;
  }

  function getCustomAccounts() {
    try {
      const raw = localStorage.getItem(CUSTOM_ACCOUNTS_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  function getAllAccounts() {
    let disabled = [];
    let overrides = {};
    let profileOverrides = {};
    try {
      const raw = localStorage.getItem(DISABLED_ACCOUNTS_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      disabled = Array.isArray(parsed) ? parsed : [];
    } catch {
      disabled = [];
    }
    try {
      const raw = localStorage.getItem(PASSWORD_OVERRIDES_KEY);
      const parsed = raw ? JSON.parse(raw) : {};
      overrides = parsed && typeof parsed === "object" ? parsed : {};
    } catch {
      overrides = {};
    }
    try {
      const raw = localStorage.getItem(PROFILE_OVERRIDES_KEY);
      const parsed = raw ? JSON.parse(raw) : {};
      profileOverrides = parsed && typeof parsed === "object" ? parsed : {};
    } catch {
      profileOverrides = {};
    }
    return ACCOUNTS.concat(getCustomAccounts())
      .filter(function (account) {
        return disabled.indexOf(account.username) === -1;
      })
      .map(function (account) {
        const copy = Object.assign({}, account);
        if (overrides[copy.username]) {
          copy.password = overrides[copy.username];
          copy.forcePasswordChange = false;
        }
        if (profileOverrides[copy.username]) {
          copy.displayName = profileOverrides[copy.username].displayName || copy.displayName;
          copy.birthday = profileOverrides[copy.username].birthday || "";
          copy.committee = profileOverrides[copy.username].committee || "";
          copy.position = profileOverrides[copy.username].position || "";
          copy.achievements = Array.isArray(profileOverrides[copy.username].achievements)
            ? profileOverrides[copy.username].achievements
            : copy.achievements;
        }
        return copy;
      });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    clearError();

    const username = usernameInput.value.trim();
    const password = passwordInput.value;

    if (!username || !password) {
      showError("Please enter both username and password.");
      return;
    }

    submitBtn.disabled = true;

    const account = getAllAccounts().find(function (item) {
      return item.username === username && item.password === password;
    });

    if (!account) {
      showError("Invalid username or password.");
      submitBtn.disabled = false;
      return;
    }

    function go() {
      sessionStorage.setItem(
        SESSION_KEY,
        JSON.stringify({
          username: account.username,
          displayName: account.displayName,
          birthday: account.birthday,
          committee: account.committee,
          position: account.position || "",
          role: account.role,
          photoDataUrl: account.photoDataUrl || "",
          achievements: Array.isArray(account.achievements) ? account.achievements : [],
          forcePasswordChange: !!account.forcePasswordChange,
          loggedInAt: Date.now(),
        })
      );
      window.location.href = "dashboard.html";
    }

    if (!pageEl) {
      go();
      return;
    }

    pageEl.classList.add("page--leaving");
    pageEl.addEventListener(
      "animationend",
      function onExit(e) {
        if (e.target !== pageEl) {
          return;
        }
        if (e.animationName !== "pageLeave" && e.animationName !== "pageLeaveReduced") {
          return;
        }
        pageEl.removeEventListener("animationend", onExit);
        go();
      }
    );
  });

  [usernameInput, passwordInput].forEach(function (el) {
    el.addEventListener("input", clearError);
  });
})();
