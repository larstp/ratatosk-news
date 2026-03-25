import { supabase } from "./supabase.js";
import { displayMessage } from "./ui.js";

const registerForm = document.querySelector("form");

registerForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const form = e.target;
  const email = form.email.value.trim();
  const password = form.password.value;
  const fieldset = form.querySelector("fieldset");

  displayMessage("#errorMessage", "error", "");
  displayMessage("#successMessage", "success", "");

  try {
    fieldset.disabled = true;

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      displayMessage("#errorMessage", "error", error.message);
      return;
    }

    if (data.user) {
      const identities = data.user.identities || [];
      if (identities.length === 0) {
        displayMessage(
          "#successMessage",
          "info",
          "This email is already registered. Try logging in or check your inbox for a confirmation email.",
        );
        return;
      }

      displayMessage(
        "#successMessage",
        "success",
        "Registration successful! Please check your email to confirm your account.",
      );
      form.reset();
      window.location.href = "login.html";
    }
  } catch (error) {
    console.log(error);
    displayMessage("#errorMessage", "error", error.toString());
  } finally {
    fieldset.disabled = false;
  }
});
