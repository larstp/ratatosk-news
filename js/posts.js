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
const postsContainer = document.querySelector("#postsContainer");
const postsMessage = document.querySelector("#postsMessage");
let currentUser = null;

initFeedPage();

if (!postForm) {
  throw new Error("Post form was not found on the page.");
}

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

  if (!fieldset) {
    displayMessage("#errorMessage", "error", "Form fieldset was not found.");
    return;
  }

  displayMessage("#errorMessage", "error", "");
  displayMessage("#successMessage", "success", "");

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
    console.error(error);
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
  if (!postsContainer) {
    return;
  }

  displayMessage(postsMessage, "info", "");
  postsContainer.innerHTML = "";
  displayMessage("#postsContainer", "info", "Loading posts...");

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
      postsContainer.innerHTML = "";
      displayMessage(
        "#postsContainer",
        "info",
        "No posts yet. Be the first to publish one.",
      );
      return;
    }

    postsContainer.innerHTML = "";

    posts.forEach((post) => {
      const postElement = createPostElement(post);
      postsContainer.appendChild(postElement);
    });
  } catch (error) {
    console.error(error);
    displayMessage("#errorMessage", "error", error.toString());
  }
}

function createPostElement(post) {
  const article = document.createElement("article");
  article.className = "rounded-lg border border-white/15 bg-black/20 p-4";

  const headerRow = document.createElement("div");
  headerRow.className = "mb-2 flex items-center justify-between gap-3";

  const heading = document.createElement("h3");
  heading.className = "text-lg font-semibold";
  heading.textContent = post.title || "Untitled post";
  headerRow.append(heading);

  const content = document.createElement("p");
  content.className = "whitespace-pre-wrap text-sm text-slate-200";
  content.textContent = post.content || "";

  article.append(headerRow, content);

  const postId = post?.id;
  if (postId && isPostOwner(post)) {
    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className =
      "rounded-full bg-red-700 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
      handleDeletePost(postId, deleteButton);
    });

    headerRow.append(deleteButton);
  }

  return article;
}

function isPostOwner(post) {
  if (!currentUser?.id) {
    return false;
  }

  const ownerId = post?.user_id ?? post?.author_id ?? post?.owner_id ?? null;
  return ownerId === currentUser.id;
}

async function handleDeletePost(postId, button) {
  if (!currentUser) {
    displayMessage(postsMessage, "warning", "Please log in to manage posts.");
    return;
  }

  if (button) {
    button.disabled = true;
    button.textContent = "Deleting...";
  }

  try {
    const { error } = await supabase.from("posts").delete().eq("id", postId);

    if (error) {
      throw error;
    }

    displayMessage(postsMessage, "success", "Post deleted.");
    await loadPosts();
  } catch (error) {
    console.error(error);
    displayMessage(postsMessage, "error", error.message ?? error.toString());
  } finally {
    if (button) {
      button.disabled = false;
      button.textContent = "Delete";
    }
  }
}

async function initFeedPage() {
  await setupFeedHeaderAuth();
  currentUser = await getCurrentUser();

  if (currentUser && createPostSection) {
    createPostSection.classList.remove("hidden");
    setCreatePostCollapsed(true);
  } else if (createPostSection) {
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
    toggleCreatePostButton.textContent = "Open form";
    return;
  }

  createPostContent.classList.remove("hidden");
  toggleCreatePostButton.textContent = "Collapse";
}
