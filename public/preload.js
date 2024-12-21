const { ipcRenderer, contextBridge } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  purchaseApp: (productId, userId, userEmail) => ipcRenderer.send("purchase-app", { productId, userId, userEmail }),

  closeApp: () => ipcRenderer.send("closeApp"),

  minimizeApp: () => ipcRenderer.send("minimizeApp"),

  maximizeRestoreApp: () => ipcRenderer.send("maximizeRestoreApp"),

  restartApp: () => ipcRenderer.send("restart_app"),

  onWindowStateChange: (callback) => {
    ipcRenderer.on("isMaximized", () => callback("maximized"));
    ipcRenderer.on("isRestored", () => callback("restored"));
  },

  getAppVersion: (callback) => {
    ipcRenderer.send("app_version");
    ipcRenderer.on("app_version", (event, data) => {
      callback(data.version);
    });
  },

  onUpdateAvailable: (callback) => {
    ipcRenderer.on("update_available", () => {
      ipcRenderer.removeAllListeners("update_available");
      callback();
    });
  },
  onUpdateDownloaded: (callback) => {
    ipcRenderer.on("update_downloaded", () => {
      ipcRenderer.removeAllListeners("update_downloaded");
      callback();
    });
  },
});
