window.addEventListener("DOMContentLoaded", () => {
  const minimizeButton = document.getElementById("minimizeBtn");
  const closeButton = document.getElementById("closeBtn");
  const messageElement = document.getElementById("message");
  const notificationElement = document.getElementById("notification");
  const closeButtonUpdate = document.getElementById("close-button");
  const restartButtonUpdate = document.getElementById("restart-button");

  window.electronAPI.getAppVersion((version) => {
    document.getElementById("app-version").innerText = `${version}`;
  });

  window.electronAPI.onUpdateAvailable(() => {
    messageElement.innerText = "A new update is available. Downloading now...";
    notificationElement.classList.remove("hidden");
  });

  window.electronAPI.onUpdateDownloaded(() => {
    messageElement.innerText =
      "Update Downloaded. It will be installed on restart. Restart now?";
    restartButtonUpdate.classList.remove("hidden");
    notificationElement.classList.remove("hidden");
  });

  minimizeButton.addEventListener("click", () => {
    window.electronAPI.minimizeApp();
  });

  closeButton.addEventListener("click", () => {
    window.electronAPI.closeApp();
  });

  restartButtonUpdate.addEventListener("click", () => {
    window.electronAPI.restartApp();
  });

  closeButtonUpdate.addEventListener("click", () => {
    notificationElement.classList.add("hidden");
  });
});
