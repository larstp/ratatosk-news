import { supabase } from "./supabase.js";

export async function getCurrentUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ?? null;
}

export async function checkAuth(options = {}) {
  const { redirectIfMissing = true } = options;
  const user = await getCurrentUser();

  if (!user && redirectIfMissing) {
    window.location.href = "login.html";
  }

  console.log("user", user);
  return user;
}

export async function requireAuth() {
  return checkAuth({ redirectIfMissing: true });
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Error logging out:", error);
  }

  window.location.href = "login.html";
}
