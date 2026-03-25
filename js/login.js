import { supabase } from "./supabase.js";
import { displayMessage } from "./ui.js";

const loginForm = document.querySelector("form");

if (!loginForm) {
  throw new Error("Login form was not found on the page.");
}

loginForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const form = e.target;
  const email = form.email.value.trim();
  const password = form.password.value;
  const fieldset = form.querySelector("fieldset");

  if (!fieldset) {
    displayMessage("#errorMessage", "error", "Form fieldset was not found.");
    return;
  }

  displayMessage("#errorMessage", "error", "");
  displayMessage("#successMessage", "success", "");

  try {
    fieldset.disabled = true;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      displayMessage("#errorMessage", "error", error.message);
      return;
    }

    window.location.href = "feed.html";
  } catch (error) {
    console.error(error);
    displayMessage("#errorMessage", "error", error.toString());
  } finally {
    fieldset.disabled = false;
  }
});
