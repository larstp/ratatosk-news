import { supabase } from "./supabase.js";

export async function getCurrentUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ?? null;
}

export async function checkAuth() {
  const user = await getCurrentUser();

  if (!user) {
    window.location.href = "login.html";
    return null;
  }

  return user;
}

export async function requireAuth() {
  return checkAuth();
}

export async function hideIndexAuthActionsIfLoggedIn(
  selector = "#authActions",
  logoutSelector = "#logoutButton",
) {
  const user = await getCurrentUser();
  const container = document.querySelector(selector);
  const logoutButton = document.querySelector(logoutSelector);

  if (user) {
    if (container) {
      container.classList.add("hidden");
    }

    if (logoutButton) {
      logoutButton.classList.remove("hidden");
      logoutButton.addEventListener("click", (event) => {
        event.preventDefault();
        logout();
      });
    }
    return;
  }

  if (container) {
    container.classList.remove("hidden");
  }

  if (logoutButton) {
    logoutButton.classList.add("hidden");
  }
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Error logging out:", error);
  }

  window.location.href = "index.html";
}
