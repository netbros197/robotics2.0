(function () {
  const SESSION_KEY = "login_session";
  const CUSTOM_ACCOUNTS_KEY = "custom_accounts";
  const DISABLED_ACCOUNTS_KEY = "disabled_accounts";
  const PASSWORD_OVERRIDES_KEY = "password_overrides";
  const PROFILE_OVERRIDES_KEY = "profile_overrides";
  const ATTENDANCE_KEY = "attendance_records";
  const DEFAULT_PASSWORD = "ncfrobotics1947";
  const SYSTEM_USERNAMES = ["jssucao", "admin"];
  const BASE_ACCOUNTS = [
    {
      username: "admin",
      password: "admin",
      displayName: "Admin",
      role: "admin",
    },
  ];

  const welcomeEl = document.getElementById("welcome");
  const roleEl = document.getElementById("dash-role");
  const profileInfoEl = document.getElementById("dash-profile-info");
  const profileBirthdayEl = document.getElementById("profile-birthday");
  const profileCommitteeEl = document.getElementById("profile-committee");
  const profilePositionEl = document.getElementById("profile-position");
  const profileImageEl = document.querySelector(".logo-img");
  const logoWrapEl = document.querySelector(".logo");
  const logoutBtn = document.getElementById("logout-btn");
  const attendanceBtn = document.getElementById("attendance-btn");
  const adminAttendanceBtn = document.getElementById("admin-attendance-btn");
  const attendanceModal = document.getElementById("attendance-modal");
  const attendanceClose = document.getElementById("attendance-close");
  const attendanceForm = document.getElementById("attendance-form");
  const attendanceGrid = document.getElementById("attendance-grid");
  const attendanceUsernameInput = document.getElementById("attendance-username");
  const attendanceDateInput = document.getElementById("attendance-date");
  const attendanceError = document.getElementById("attendance-error");
  const attendanceSuccess = document.getElementById("attendance-success");
  const attendanceLog = document.getElementById("attendance-log");
  const achievementsBtn = document.getElementById("achievements-btn");
  const achievementsModal = document.getElementById("achievements-modal");
  const achievementsClose = document.getElementById("achievements-close");
  const achievementListEl = document.getElementById("achievement-list");
  const accountsBtn = document.getElementById("accounts-btn");
  const accountsModal = document.getElementById("accounts-modal");
  const accountsClose = document.getElementById("accounts-close");
  const addAccountBtn = document.getElementById("add-account-btn");
  const deleteAccountBtn = document.getElementById("delete-account-btn");
  const accountsListBtn = document.getElementById("accounts-list-btn");
  const passwordsBtn = document.getElementById("passwords-btn");
  const accountManagementBtn = document.getElementById("account-management-btn");
  const extensionsBtn = document.getElementById("extensions-btn");
  const changePasswordBtn = document.getElementById("change-password-btn");
  const resetPasswordBtn = document.getElementById("reset-password-btn");
  const addAccountModal = document.getElementById("add-account-modal");
  const deleteAccountModal = document.getElementById("delete-account-modal");
  const accountsListModal = document.getElementById("accounts-list-modal");
  const passwordsModal = document.getElementById("passwords-modal");
  const changePasswordModal = document.getElementById("change-password-modal");
  const resetPasswordModal = document.getElementById("reset-password-modal");
  const accountManagementModal = document.getElementById("account-management-modal");
  const editAccountModal = document.getElementById("edit-account-modal");
  const extensionsModal = document.getElementById("extensions-modal");
  const addAccountClose = document.getElementById("add-account-close");
  const deleteAccountClose = document.getElementById("delete-account-close");
  const accountsListClose = document.getElementById("accounts-list-close");
  const passwordsClose = document.getElementById("passwords-close");
  const changePasswordClose = document.getElementById("change-password-close");
  const resetPasswordClose = document.getElementById("reset-password-close");
  const accountManagementClose = document.getElementById("account-management-close");
  const editAccountClose = document.getElementById("edit-account-close");
  const extensionsClose = document.getElementById("extensions-close");
  const accountsListBox = document.getElementById("accounts-list-box");
  const addAccountForm = document.getElementById("add-account-form");
  const deleteAccountForm = document.getElementById("delete-account-form");
  const changePasswordForm = document.getElementById("change-password-form");
  const resetPasswordForm = document.getElementById("reset-password-form");
  const accountManagementForm = document.getElementById("account-management-form");
  const editAccountForm = document.getElementById("edit-account-form");
  const newAccountNameInput = document.getElementById("new-account-name");
  const newAccountUsernameInput = document.getElementById("new-account-username");
  const newAccountRoleInput = document.getElementById("new-account-role");
  const newAccountBirthdayInput = document.getElementById("new-account-birthday");
  const newAccountCommitteeInput = document.getElementById("new-account-committee");
  const newAccountPositionInput = document.getElementById("new-account-position");
  const newAccountPhotoInput = document.getElementById("new-account-photo");
  const addAchievementInputsEl = document.getElementById("add-achievement-inputs");
  const addAchievementInputBtn = document.getElementById("add-achievement-input-btn");
  const addAccountError = document.getElementById("add-account-error");
  const addAccountSuccess = document.getElementById("add-account-success");
  const deleteAccountUsernameInput = document.getElementById("delete-account-username");
  const deleteAccountError = document.getElementById("delete-account-error");
  const deleteAccountSuccess = document.getElementById("delete-account-success");
  const changePasswordUsernameInput = document.getElementById("change-password-username");
  const changePasswordNewInput = document.getElementById("change-password-new");
  const changePasswordError = document.getElementById("change-password-error");
  const changePasswordSuccess = document.getElementById("change-password-success");
  const resetPasswordUsernameInput = document.getElementById("reset-password-username");
  const resetPasswordError = document.getElementById("reset-password-error");
  const resetPasswordSuccess = document.getElementById("reset-password-success");
  const manageAccountUsernameInput = document.getElementById("manage-account-username");
  const accountManagementError = document.getElementById("account-management-error");
  const editAccountNameInput = document.getElementById("edit-account-name");
  const editAccountBirthdayInput = document.getElementById("edit-account-birthday");
  const editAccountCommitteeInput = document.getElementById("edit-account-committee");
  const editAccountPositionInput = document.getElementById("edit-account-position");
  const editAccountAchievementsInput = document.getElementById("edit-account-achievements");
  const editAccountError = document.getElementById("edit-account-error");
  const editAccountSuccess = document.getElementById("edit-account-success");

  let managedUsername = "";

  function getSession() {
    try {
      const raw = sessionStorage.getItem(SESSION_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  const session = getSession();
  if (!session || !session.username) {
    window.location.replace("index.html");
    return;
  }

  const isAdmin = session.role === "admin";
  welcomeEl.textContent = session.displayName || session.username;
  if (roleEl) roleEl.textContent = (session.role || "student").toUpperCase();
  if (profileBirthdayEl) profileBirthdayEl.textContent = session.birthday || "-";
  if (profileCommitteeEl) profileCommitteeEl.textContent = session.committee || "-";
  if (profilePositionEl) profilePositionEl.textContent = session.position || "-";
  if (profileImageEl && session.photoDataUrl) {
    profileImageEl.src = session.photoDataUrl;
  }

  const hasProfileInfo = !!(session.birthday || session.committee || session.position);
  if (profileInfoEl && !hasProfileInfo) {
    profileInfoEl.classList.add("hidden");
  }
  if (logoWrapEl && !session.photoDataUrl && isAdmin) {
    // Admin account can keep logo frame without uploaded picture.
    profileImageEl.src = "logo.jpg";
  }

  const achievements = Array.isArray(session.achievements) ? session.achievements : [];
  if (achievementListEl) {
    achievementListEl.innerHTML = "";
    if (achievements.length === 0) {
      const emptyItem = document.createElement("li");
      emptyItem.className = "achievement-item";
      emptyItem.textContent = "No achievements added yet.";
      achievementListEl.appendChild(emptyItem);
    } else {
      achievements.forEach(function (item) {
        const li = document.createElement("li");
        li.className = "achievement-item";
        li.textContent = item;
        achievementListEl.appendChild(li);
      });
    }
  }

  if (isAdmin) {
    document.body.classList.add("is-admin");
  }
  if (session.forcePasswordChange) {
    window.setTimeout(function () {
      window.alert("For security reasons, please change your password from the default value.");
    }, 120);
  }

  const pageEl = document.getElementById("app-page");

  function openAttendance() {
    if (!attendanceModal) return;
    attendanceModal.classList.add("is-open");
    attendanceModal.setAttribute("aria-hidden", "false");
  }

  function closeAttendance() {
    if (!attendanceModal) return;
    attendanceModal.classList.remove("is-open");
    attendanceModal.setAttribute("aria-hidden", "true");
  }

  function openAchievements() {
    if (!achievementsModal) return;
    achievementsModal.classList.add("is-open");
    achievementsModal.setAttribute("aria-hidden", "false");
  }

  function closeAchievements() {
    if (!achievementsModal) return;
    achievementsModal.classList.remove("is-open");
    achievementsModal.setAttribute("aria-hidden", "true");
  }

  function openAccounts() {
    if (!accountsModal) return;
    accountsModal.classList.add("is-open");
    accountsModal.setAttribute("aria-hidden", "false");
  }

  function closeAccounts() {
    if (!accountsModal) return;
    accountsModal.classList.remove("is-open");
    accountsModal.setAttribute("aria-hidden", "true");
  }

  function openModal(modalEl) {
    if (!modalEl) return;
    modalEl.classList.add("is-open");
    modalEl.setAttribute("aria-hidden", "false");
  }

  function closeModal(modalEl) {
    if (!modalEl) return;
    modalEl.classList.remove("is-open");
    modalEl.setAttribute("aria-hidden", "true");
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

  function saveCustomAccounts(accounts) {
    localStorage.setItem(CUSTOM_ACCOUNTS_KEY, JSON.stringify(accounts));
  }

  function getDisabledAccounts() {
    try {
      const raw = localStorage.getItem(DISABLED_ACCOUNTS_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  function saveDisabledAccounts(usernames) {
    localStorage.setItem(DISABLED_ACCOUNTS_KEY, JSON.stringify(usernames));
  }

  function getPasswordOverrides() {
    try {
      const raw = localStorage.getItem(PASSWORD_OVERRIDES_KEY);
      const parsed = raw ? JSON.parse(raw) : {};
      return parsed && typeof parsed === "object" ? parsed : {};
    } catch {
      return {};
    }
  }

  function savePasswordOverrides(overrides) {
    localStorage.setItem(PASSWORD_OVERRIDES_KEY, JSON.stringify(overrides));
  }

  function getProfileOverrides() {
    try {
      const raw = localStorage.getItem(PROFILE_OVERRIDES_KEY);
      const parsed = raw ? JSON.parse(raw) : {};
      return parsed && typeof parsed === "object" ? parsed : {};
    } catch {
      return {};
    }
  }

  function saveProfileOverrides(overrides) {
    localStorage.setItem(PROFILE_OVERRIDES_KEY, JSON.stringify(overrides));
  }

  function getAttendanceRecords() {
    try {
      const raw = localStorage.getItem(ATTENDANCE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  function saveAttendanceRecords(records) {
    localStorage.setItem(ATTENDANCE_KEY, JSON.stringify(records));
  }

  function getActiveAccounts() {
    const disabled = getDisabledAccounts();
    const overrides = getPasswordOverrides();
    const profileOverrides = getProfileOverrides();
    return BASE_ACCOUNTS.concat(getCustomAccounts())
      .filter(function (account) {
        return disabled.indexOf(account.username) === -1;
      })
      .map(function (account) {
        const copy = Object.assign({}, account);
        if (overrides[copy.username]) {
          copy.password = overrides[copy.username];
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

  function renderAccountsList() {
    if (!accountsListBox) return;
    const accounts = getActiveAccounts();
    accountsListBox.innerHTML = "";
    accounts.forEach(function (account) {
      const item = document.createElement("div");
      item.className = "account-list-item";
      item.innerHTML =
        '<p class="account-list-line"><strong>Name:</strong> ' +
        (account.displayName || "") +
        "</p>" +
        '<p class="account-list-line"><strong>Username:</strong> ' +
        (account.username || "") +
        "</p>" +
        '<p class="account-list-line"><strong>Password:</strong> ' +
        (account.password || "") +
        "</p>" +
        '<p class="account-list-line"><strong>Role:</strong> ' +
        (account.role || "student") +
        "</p>";
      accountsListBox.appendChild(item);
    });
  }

  function setAddAccountMessage(errorMessage, successMessage) {
    if (addAccountError) addAccountError.textContent = errorMessage || "";
    if (addAccountSuccess) addAccountSuccess.textContent = successMessage || "";
  }

  function setDeleteAccountMessage(errorMessage, successMessage) {
    if (deleteAccountError) deleteAccountError.textContent = errorMessage || "";
    if (deleteAccountSuccess) deleteAccountSuccess.textContent = successMessage || "";
  }

  function setChangePasswordMessage(errorMessage, successMessage) {
    if (changePasswordError) changePasswordError.textContent = errorMessage || "";
    if (changePasswordSuccess) changePasswordSuccess.textContent = successMessage || "";
  }

  function setResetPasswordMessage(errorMessage, successMessage) {
    if (resetPasswordError) resetPasswordError.textContent = errorMessage || "";
    if (resetPasswordSuccess) resetPasswordSuccess.textContent = successMessage || "";
  }

  function setAccountManagementMessage(errorMessage) {
    if (accountManagementError) accountManagementError.textContent = errorMessage || "";
  }

  function setEditAccountMessage(errorMessage, successMessage) {
    if (editAccountError) editAccountError.textContent = errorMessage || "";
    if (editAccountSuccess) editAccountSuccess.textContent = successMessage || "";
  }

  function setAttendanceMessage(errorMessage, successMessage) {
    if (attendanceError) attendanceError.textContent = errorMessage || "";
    if (attendanceSuccess) attendanceSuccess.textContent = successMessage || "";
  }

  function renderAttendanceLog() {
    if (!attendanceLog) return;
    const records = getAttendanceRecords();
    let visible = records;
    if (!isAdmin) {
      visible = records.filter(function (item) {
        return item.username === session.username;
      });
    }

    attendanceLog.innerHTML = "";
    if (visible.length === 0) {
      const empty = document.createElement("p");
      empty.className = "attendance-line";
      empty.textContent = "No attendance records yet.";
      attendanceLog.appendChild(empty);
      return;
    }

    visible
      .slice()
      .reverse()
      .forEach(function (item) {
        const line = document.createElement("p");
        line.className = "attendance-line";
        line.textContent = item.name + " is " + item.status + " on " + item.date;
        attendanceLog.appendChild(line);
      });
  }

  function clearAddAccountForm() {
    if (newAccountNameInput) newAccountNameInput.value = "";
    if (newAccountUsernameInput) newAccountUsernameInput.value = "";
    if (newAccountRoleInput) newAccountRoleInput.value = "student";
    if (newAccountBirthdayInput) newAccountBirthdayInput.value = "";
    if (newAccountCommitteeInput) newAccountCommitteeInput.value = "";
    if (newAccountPositionInput) newAccountPositionInput.value = "";
    if (newAccountPhotoInput) newAccountPhotoInput.value = "";
    if (addAchievementInputsEl) {
      addAchievementInputsEl.innerHTML =
        '<input type="text" class="achievement-input" placeholder="Achievement 1" />';
    }
  }

  function setAttendanceFormState() {
    if (!attendanceForm) return;
    if (!isAdmin) {
      if (attendanceGrid) attendanceGrid.classList.add("attendance-grid--student");
      if (attendanceUsernameInput) attendanceUsernameInput.value = session.username || "";
      if (attendanceUsernameInput) attendanceUsernameInput.disabled = true;
      if (attendanceDateInput) attendanceDateInput.disabled = true;
      const buttons = attendanceForm.querySelectorAll("[data-status-btn]");
      Array.prototype.forEach.call(buttons, function (btn) {
        btn.disabled = true;
      });
    } else {
      if (attendanceGrid) attendanceGrid.classList.remove("attendance-grid--student");
      if (attendanceUsernameInput) attendanceUsernameInput.disabled = false;
      if (attendanceDateInput) attendanceDateInput.disabled = false;
      const buttons = attendanceForm.querySelectorAll("[data-status-btn]");
      Array.prototype.forEach.call(buttons, function (btn) {
        btn.disabled = false;
      });
    }
  }

  function readFileAsDataUrl(file) {
    return new Promise(function (resolve) {
      if (!file) {
        resolve("");
        return;
      }
      const reader = new FileReader();
      reader.onload = function () {
        resolve(typeof reader.result === "string" ? reader.result : "");
      };
      reader.onerror = function () {
        resolve("");
      };
      reader.readAsDataURL(file);
    });
  }

  if (attendanceBtn) {
    attendanceBtn.addEventListener("click", function () {
      setAttendanceMessage("", "");
      renderAttendanceLog();
      openAttendance();
    });
  }
  if (adminAttendanceBtn) {
    adminAttendanceBtn.addEventListener("click", function () {
      setAttendanceMessage("", "");
      renderAttendanceLog();
      openAttendance();
    });
  }
  if (attendanceClose) {
    attendanceClose.addEventListener("click", closeAttendance);
  }
  if (attendanceModal) {
    attendanceModal.addEventListener("click", function (e) {
      if (e.target === attendanceModal) {
        closeAttendance();
      }
    });
  }
  if (attendanceForm) {
    const statusButtons = attendanceForm.querySelectorAll("[data-status-btn]");
    Array.prototype.forEach.call(statusButtons, function (button) {
      button.addEventListener("click", function () {
        setAttendanceMessage("", "");
        if (!isAdmin) {
          setAttendanceMessage("Only admin can set attendance.", "");
          return;
        }
        const username = attendanceUsernameInput ? attendanceUsernameInput.value.trim().toLowerCase() : "";
        const date = attendanceDateInput ? attendanceDateInput.value : "";
        if (!username || !date) {
          setAttendanceMessage("Please enter Username and Date.", "");
          return;
        }
        const account = getActiveAccounts().find(function (item) {
          return item.username === username;
        });
        if (!account) {
          setAttendanceMessage("Invalid Account", "");
          return;
        }

        const records = getAttendanceRecords();
        records.push({
          username: account.username,
          name: account.displayName || account.username,
          status: button.getAttribute("data-status-btn") || "Present",
          date: date,
        });
        saveAttendanceRecords(records);
        renderAttendanceLog();
        setAttendanceMessage("", "Attendance saved.");
      });
    });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeAttendance();
      closeAchievements();
      closeAccounts();
      closeModal(addAccountModal);
      closeModal(deleteAccountModal);
      closeModal(accountsListModal);
      closeModal(passwordsModal);
      closeModal(changePasswordModal);
      closeModal(resetPasswordModal);
      closeModal(accountManagementModal);
      closeModal(editAccountModal);
      closeModal(extensionsModal);
    }
  });

  if (achievementsBtn) {
    achievementsBtn.addEventListener("click", openAchievements);
  }
  if (achievementsClose) {
    achievementsClose.addEventListener("click", closeAchievements);
  }
  if (achievementsModal) {
    achievementsModal.addEventListener("click", function (e) {
      if (e.target === achievementsModal) {
        closeAchievements();
      }
    });
  }
  if (accountsBtn) {
    accountsBtn.addEventListener("click", openAccounts);
  }
  if (accountsClose) {
    accountsClose.addEventListener("click", closeAccounts);
  }
  if (accountsModal) {
    accountsModal.addEventListener("click", function (e) {
      if (e.target === accountsModal) {
        closeAccounts();
      }
    });
  }
  if (addAccountBtn) {
    addAccountBtn.addEventListener("click", function () {
      setAddAccountMessage("", "");
      clearAddAccountForm();
      openModal(addAccountModal);
    });
  }
  if (deleteAccountBtn) {
    deleteAccountBtn.addEventListener("click", function () {
      setDeleteAccountMessage("", "");
      if (deleteAccountUsernameInput) deleteAccountUsernameInput.value = "";
      openModal(deleteAccountModal);
    });
  }
  if (accountsListBtn) {
    accountsListBtn.addEventListener("click", function () {
      renderAccountsList();
      openModal(accountsListModal);
    });
  }
  if (passwordsBtn) {
    passwordsBtn.addEventListener("click", function () {
      openModal(passwordsModal);
    });
  }
  if (changePasswordBtn) {
    changePasswordBtn.addEventListener("click", function () {
      setChangePasswordMessage("", "");
      if (changePasswordUsernameInput) changePasswordUsernameInput.value = "";
      if (changePasswordNewInput) changePasswordNewInput.value = "";
      openModal(changePasswordModal);
    });
  }
  if (resetPasswordBtn) {
    resetPasswordBtn.addEventListener("click", function () {
      setResetPasswordMessage("", "");
      if (resetPasswordUsernameInput) resetPasswordUsernameInput.value = "";
      openModal(resetPasswordModal);
    });
  }
  if (accountManagementBtn) {
    accountManagementBtn.addEventListener("click", function () {
      setAccountManagementMessage("");
      if (manageAccountUsernameInput) manageAccountUsernameInput.value = "";
      openModal(accountManagementModal);
    });
  }
  if (extensionsBtn) {
    extensionsBtn.addEventListener("click", function () {
      openModal(extensionsModal);
    });
  }
  if (addAccountClose) {
    addAccountClose.addEventListener("click", function () {
      closeModal(addAccountModal);
    });
  }
  if (deleteAccountClose) {
    deleteAccountClose.addEventListener("click", function () {
      closeModal(deleteAccountModal);
    });
  }
  if (accountsListClose) {
    accountsListClose.addEventListener("click", function () {
      closeModal(accountsListModal);
    });
  }
  if (passwordsClose) {
    passwordsClose.addEventListener("click", function () {
      closeModal(passwordsModal);
    });
  }
  if (changePasswordClose) {
    changePasswordClose.addEventListener("click", function () {
      closeModal(changePasswordModal);
    });
  }
  if (resetPasswordClose) {
    resetPasswordClose.addEventListener("click", function () {
      closeModal(resetPasswordModal);
    });
  }
  if (accountManagementClose) {
    accountManagementClose.addEventListener("click", function () {
      closeModal(accountManagementModal);
    });
  }
  if (editAccountClose) {
    editAccountClose.addEventListener("click", function () {
      closeModal(editAccountModal);
    });
  }
  if (extensionsClose) {
    extensionsClose.addEventListener("click", function () {
      closeModal(extensionsModal);
    });
  }
  if (addAccountModal) {
    addAccountModal.addEventListener("click", function (e) {
      if (e.target === addAccountModal) {
        closeModal(addAccountModal);
      }
    });
  }
  if (deleteAccountModal) {
    deleteAccountModal.addEventListener("click", function (e) {
      if (e.target === deleteAccountModal) {
        closeModal(deleteAccountModal);
      }
    });
  }
  if (accountsListModal) {
    accountsListModal.addEventListener("click", function (e) {
      if (e.target === accountsListModal) {
        closeModal(accountsListModal);
      }
    });
  }
  if (passwordsModal) {
    passwordsModal.addEventListener("click", function (e) {
      if (e.target === passwordsModal) {
        closeModal(passwordsModal);
      }
    });
  }
  if (changePasswordModal) {
    changePasswordModal.addEventListener("click", function (e) {
      if (e.target === changePasswordModal) {
        closeModal(changePasswordModal);
      }
    });
  }
  if (resetPasswordModal) {
    resetPasswordModal.addEventListener("click", function (e) {
      if (e.target === resetPasswordModal) {
        closeModal(resetPasswordModal);
      }
    });
  }
  if (accountManagementModal) {
    accountManagementModal.addEventListener("click", function (e) {
      if (e.target === accountManagementModal) {
        closeModal(accountManagementModal);
      }
    });
  }
  if (editAccountModal) {
    editAccountModal.addEventListener("click", function (e) {
      if (e.target === editAccountModal) {
        closeModal(editAccountModal);
      }
    });
  }
  if (extensionsModal) {
    extensionsModal.addEventListener("click", function (e) {
      if (e.target === extensionsModal) {
        closeModal(extensionsModal);
      }
    });
  }
  if (addAccountForm) {
    addAccountForm.addEventListener("submit", async function (e) {
      e.preventDefault();
      setAddAccountMessage("", "");

      const displayName = newAccountNameInput ? newAccountNameInput.value.trim() : "";
      const username = newAccountUsernameInput ? newAccountUsernameInput.value.trim().toLowerCase() : "";
      const role = newAccountRoleInput ? newAccountRoleInput.value : "student";
      const birthday = newAccountBirthdayInput ? newAccountBirthdayInput.value.trim() : "";
      const committee = newAccountCommitteeInput ? newAccountCommitteeInput.value.trim() : "";
      const position = newAccountPositionInput ? newAccountPositionInput.value.trim() : "";
      const photoFile = newAccountPhotoInput && newAccountPhotoInput.files ? newAccountPhotoInput.files[0] : null;
      const achievementInputs = addAchievementInputsEl
        ? Array.prototype.slice.call(addAchievementInputsEl.querySelectorAll(".achievement-input"))
        : [];
      const achievements = achievementInputs
        .map(function (inputEl) {
          return inputEl.value.trim();
        })
        .filter(function (text) {
          return text.length > 0;
        });

      if (!displayName || !username) {
        setAddAccountMessage("Please enter both Name and Username.", "");
        return;
      }

      const reservedExists = SYSTEM_USERNAMES.indexOf(username) !== -1;
      const customAccounts = getCustomAccounts();
      const duplicateCustom = customAccounts.some(function (item) {
        return item.username === username;
      });

      if (reservedExists || duplicateCustom) {
        setAddAccountMessage("Username already exists. Please choose another one.", "");
        return;
      }

      const photoDataUrl = await readFileAsDataUrl(photoFile);

      customAccounts.push({
        username: username,
        password: DEFAULT_PASSWORD,
        displayName: displayName,
        birthday: birthday,
        committee: committee,
        position: position,
        role: role,
        photoDataUrl: photoDataUrl,
        achievements: achievements,
        forcePasswordChange: true,
      });
      saveCustomAccounts(customAccounts);
      renderAccountsList();

      clearAddAccountForm();
      setAddAccountMessage("", "Account created successfully.");
    });
  }
  if (addAchievementInputBtn) {
    addAchievementInputBtn.addEventListener("click", function () {
      if (!addAchievementInputsEl) return;
      const index = addAchievementInputsEl.querySelectorAll(".achievement-input").length + 1;
      const input = document.createElement("input");
      input.type = "text";
      input.className = "achievement-input";
      input.placeholder = "Achievement " + index;
      addAchievementInputsEl.appendChild(input);
    });
  }
  if (deleteAccountForm) {
    deleteAccountForm.addEventListener("submit", function (e) {
      e.preventDefault();
      setDeleteAccountMessage("", "");

      const username = deleteAccountUsernameInput ? deleteAccountUsernameInput.value.trim().toLowerCase() : "";
      if (!username) {
        setDeleteAccountMessage("Invalid Account", "");
        return;
      }

      const customAccounts = getCustomAccounts();
      const nextAccounts = customAccounts.filter(function (item) {
        return item.username !== username;
      });
      const baseMatch = BASE_ACCOUNTS.some(function (item) {
        return item.username === username;
      });

      if (nextAccounts.length === customAccounts.length && !baseMatch) {
        setDeleteAccountMessage("Invalid Account", "");
        return;
      }

      saveCustomAccounts(nextAccounts);
      if (baseMatch) {
        const disabled = getDisabledAccounts();
        if (disabled.indexOf(username) === -1) {
          disabled.push(username);
          saveDisabledAccounts(disabled);
        }
      }
      renderAccountsList();
      if (deleteAccountUsernameInput) deleteAccountUsernameInput.value = "";
      setDeleteAccountMessage("", "Account Deleted");
    });
  }
  if (changePasswordForm) {
    changePasswordForm.addEventListener("submit", function (e) {
      e.preventDefault();
      setChangePasswordMessage("", "");

      const username = changePasswordUsernameInput ? changePasswordUsernameInput.value.trim().toLowerCase() : "";
      const newPassword = changePasswordNewInput ? changePasswordNewInput.value : "";
      if (!username || !newPassword) {
        setChangePasswordMessage("Please enter Username and New Password.", "");
        return;
      }

      const customAccounts = getCustomAccounts();
      const customIndex = customAccounts.findIndex(function (item) {
        return item.username === username;
      });
      const baseMatch = BASE_ACCOUNTS.some(function (item) {
        return item.username === username;
      });

      if (customIndex === -1 && !baseMatch) {
        setChangePasswordMessage("Invalid Account", "");
        return;
      }

      if (customIndex !== -1) {
        customAccounts[customIndex].password = newPassword;
        customAccounts[customIndex].forcePasswordChange = false;
        saveCustomAccounts(customAccounts);
      } else if (baseMatch) {
        const overrides = getPasswordOverrides();
        overrides[username] = newPassword;
        savePasswordOverrides(overrides);
      }

      renderAccountsList();
      setChangePasswordMessage("", "Password Changed");
      if (changePasswordUsernameInput) changePasswordUsernameInput.value = "";
      if (changePasswordNewInput) changePasswordNewInput.value = "";
    });
  }
  if (resetPasswordForm) {
    resetPasswordForm.addEventListener("submit", function (e) {
      e.preventDefault();
      setResetPasswordMessage("", "");

      const username = resetPasswordUsernameInput ? resetPasswordUsernameInput.value.trim().toLowerCase() : "";
      if (!username) {
        setResetPasswordMessage("Invalid Account", "");
        return;
      }

      const customAccounts = getCustomAccounts();
      const customIndex = customAccounts.findIndex(function (item) {
        return item.username === username;
      });
      const baseMatch = BASE_ACCOUNTS.some(function (item) {
        return item.username === username;
      });

      if (customIndex === -1 && !baseMatch) {
        setResetPasswordMessage("Invalid Account", "");
        return;
      }

      if (customIndex !== -1) {
        customAccounts[customIndex].password = DEFAULT_PASSWORD;
        customAccounts[customIndex].forcePasswordChange = true;
        saveCustomAccounts(customAccounts);
      }

      const overrides = getPasswordOverrides();
      if (overrides[username]) {
        delete overrides[username];
        savePasswordOverrides(overrides);
      }

      renderAccountsList();
      setResetPasswordMessage("", "Password Reset");
      if (resetPasswordUsernameInput) resetPasswordUsernameInput.value = "";
    });
  }
  if (accountManagementForm) {
    accountManagementForm.addEventListener("submit", function (e) {
      e.preventDefault();
      setAccountManagementMessage("");
      setEditAccountMessage("", "");

      const username = manageAccountUsernameInput ? manageAccountUsernameInput.value.trim().toLowerCase() : "";
      const account = getActiveAccounts().find(function (item) {
        return item.username === username;
      });
      if (!account) {
        setAccountManagementMessage("Invalid Account");
        return;
      }

      managedUsername = account.username;
      if (editAccountNameInput) editAccountNameInput.value = account.displayName || "";
      if (editAccountBirthdayInput) editAccountBirthdayInput.value = account.birthday || "";
      if (editAccountCommitteeInput) editAccountCommitteeInput.value = account.committee || "";
      if (editAccountPositionInput) editAccountPositionInput.value = account.position || "";
      if (editAccountAchievementsInput) {
        const achievements = Array.isArray(account.achievements) ? account.achievements : [];
        editAccountAchievementsInput.value = achievements.join("\n");
      }
      openModal(editAccountModal);
    });
  }
  if (editAccountForm) {
    editAccountForm.addEventListener("submit", function (e) {
      e.preventDefault();
      setEditAccountMessage("", "");

      const name = editAccountNameInput ? editAccountNameInput.value.trim() : "";
      const birthday = editAccountBirthdayInput ? editAccountBirthdayInput.value.trim() : "";
      const committee = editAccountCommitteeInput ? editAccountCommitteeInput.value.trim() : "";
      const position = editAccountPositionInput ? editAccountPositionInput.value.trim() : "";
      const achievements = editAccountAchievementsInput
        ? editAccountAchievementsInput.value
            .split("\n")
            .map(function (line) {
              return line.trim();
            })
            .filter(function (line) {
              return line.length > 0;
            })
        : [];

      if (!managedUsername) {
        setEditAccountMessage("No account selected.", "");
        return;
      }
      if (!name) {
        setEditAccountMessage("Name is required.", "");
        return;
      }

      const customAccounts = getCustomAccounts();
      const customIndex = customAccounts.findIndex(function (item) {
        return item.username === managedUsername;
      });
      if (customIndex !== -1) {
        customAccounts[customIndex].displayName = name;
        customAccounts[customIndex].birthday = birthday;
        customAccounts[customIndex].committee = committee;
        customAccounts[customIndex].position = position;
        customAccounts[customIndex].achievements = achievements;
        saveCustomAccounts(customAccounts);
      } else {
        const overrides = getProfileOverrides();
        overrides[managedUsername] = {
          displayName: name,
          birthday: birthday,
          committee: committee,
          position: position,
          achievements: achievements,
        };
        saveProfileOverrides(overrides);
      }

      renderAccountsList();
      setEditAccountMessage("", "Account updated successfully.");
    });
  }

  setAttendanceFormState();

  logoutBtn.addEventListener("click", function () {
    function go() {
      sessionStorage.removeItem(SESSION_KEY);
      window.location.href = "index.html";
    }

    if (!pageEl) {
      go();
      return;
    }

    logoutBtn.disabled = true;
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
})();
