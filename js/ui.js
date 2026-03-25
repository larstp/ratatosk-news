export function displayMessage(container, messageType, message) {
  let parent = container;

  if (typeof container === "string") {
    parent = document.querySelector(container);
  }

  if (!parent) {
    return;
  }

  if (!message) {
    parent.classList.add("hidden");
    parent.textContent = "";
    return;
  }

  const messageClasses = {
    error: "bg-red-950/30 text-red-200 border border-red-400/30",
    success: "bg-emerald-950/30 text-emerald-200 border border-emerald-400/30",
    warning: "bg-amber-950/30 text-amber-200 border border-amber-400/30",
    info: "bg-sky-950/30 text-sky-200 border border-sky-400/30",
  };

  const classes = messageClasses[messageType] || messageClasses.info;

  parent.classList.remove("hidden");
  parent.textContent = "";

  const messageElement = document.createElement("div");
  messageElement.className = `${classes} p-4 rounded`;
  messageElement.textContent = message;

  parent.append(messageElement);
}

export function setElementVisibility(target, isVisible) {
  let element = target;

  if (typeof target === "string") {
    element = document.querySelector(target);
  }

  if (!element) {
    return;
  }

  if (isVisible) {
    element.classList.remove("hidden");
    return;
  }

  element.classList.add("hidden");
}

export function renderPostList(container, posts) {
  let parent = container;

  if (typeof container === "string") {
    parent = document.querySelector(container);
  }

  if (!parent) {
    return;
  }

  parent.textContent = "";

  if (!posts.length) {
    const emptyState = document.createElement("p");
    emptyState.className = "text-sm text-slate-200/90";
    emptyState.textContent = "No posts yet. Be the first to publish one.";
    parent.append(emptyState);
    return;
  }

  for (const post of posts) {
    const article = document.createElement("article");
    article.className = "rounded-lg border border-white/15 bg-black/20 p-4";

    const title = document.createElement("h3");
    title.className = "mb-2 text-lg font-semibold";
    title.textContent = post.title || "Untitled post";

    const content = document.createElement("p");
    content.className = "whitespace-pre-wrap text-sm text-slate-200";
    content.textContent = post.content || "";

    article.append(title, content);
    parent.append(article);
  }
}
