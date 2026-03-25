import { supabase } from "./supabase.js";
import { getCurrentUser } from "./auth.js";
import { setupFeedHeaderAuth } from "./header.js";
import { displayMessage } from "./ui.js";

const createPostSection = document.querySelector("#createPostSection");
const createPostContent = document.querySelector("#createPostContent");
const toggleCreatePostButton = document.querySelector(
  "#toggleCreatePostButton",
);
const postForm = document.querySelector("form");
let currentUser = null;

initFeedPage();

postForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  if (!currentUser) {
    displayMessage(
      "#errorMessage",
      "warning",
      "Please log in to create posts.",
    );
    return;
  }

  const form = e.target;
  const title = form.title.value.trim();
  const content = form.content.value.trim();
  const fieldset = form.querySelector("fieldset");

  try {
    fieldset.disabled = true;

    const { error } = await supabase.from("posts").insert([{ title, content }]);

    if (error) {
      displayMessage("#errorMessage", "error", error.message);
      return;
    }

    displayMessage("#successMessage", "success", "Post published.");
    loadPosts();

    form.reset();
  } catch (error) {
    console.log(error);
    displayMessage("#errorMessage", "error", error.toString());
  } finally {
    fieldset.disabled = false;
  }
});

toggleCreatePostButton?.addEventListener("click", function () {
  // just because i had time c:
  const isCollapsed =
    !createPostContent || createPostContent.classList.contains("hidden");
  setCreatePostCollapsed(!isCollapsed);
});

async function loadPosts() {
  const postsContainer = document.querySelector("#postsContainer");
  postsContainer.innerHTML = "";

  try {
    const { data: posts, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      displayMessage("#errorMessage", "error", error.message);
      return;
    }

    if (!posts || posts.length === 0) {
      displayMessage(
        "#postsContainer",
        "info",
        "No posts yet. Be the first to publish one.",
      );
      return;
    }

    posts.forEach((post) => {
      const postElement = createPostElement(post);
      postsContainer.appendChild(postElement);
    });
  } catch (error) {
    displayMessage("#errorMessage", "error", error.toString());
  }
}

function createPostElement(post) {
  const article = document.createElement("article");
  article.className = "rounded-lg border border-white/15 bg-black/20 p-4";

  const heading = document.createElement("h3");
  heading.className = "mb-2 text-lg font-semibold";
  heading.textContent = post.title || "Untitled post";

  const content = document.createElement("p");
  content.className = "whitespace-pre-wrap text-sm text-slate-200";
  content.textContent = post.content || "";

  article.append(heading, content);
  return article;
}

async function initFeedPage() {
  await setupFeedHeaderAuth();
  currentUser = await getCurrentUser();

  if (currentUser) {
    createPostSection.classList.remove("hidden");
    setCreatePostCollapsed(true);
  } else {
    createPostSection.classList.add("hidden");
  }

  await loadPosts();
}

function setCreatePostCollapsed(isCollapsed) {
  if (!createPostContent || !toggleCreatePostButton) {
    return;
  }

  if (isCollapsed) {
    createPostContent.classList.add("hidden");
    toggleCreatePostButton.textContent = "Expand";
    return;
  }

  createPostContent.classList.remove("hidden");
  toggleCreatePostButton.textContent = "Collapse";
}
