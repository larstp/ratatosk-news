import { getCurrentUser, logout } from "./auth.js";

export async function setupFeedHeaderAuth() {
  const user = await getCurrentUser();
  const guestActions = document.querySelector("#guestActions");
  const logoutButton = document.querySelector("#logoutButton");

  if (user) {
    if (guestActions) {
      guestActions.classList.add("hidden");
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

  if (guestActions) {
    guestActions.classList.remove("hidden");
  }

  if (logoutButton) {
    logoutButton.classList.add("hidden");
  }
}
