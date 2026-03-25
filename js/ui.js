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
