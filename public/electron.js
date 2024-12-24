const { app, BrowserWindow, ipcMain } = require("electron");
const { autoUpdater } = require("electron-updater");
const path = require("path");
const axios = require("axios");
const fs = require("fs");
const isDev = require("electron-is-dev");

const ipc = ipcMain;

let win;

const createWindow = () => {
  win = new BrowserWindow({
    width: 1200,
    height: 680,
    minWidth: 940,
    minHeight: 560,
    frame: false,
    show: false,
    resizable: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      devTools: true,
      preload: path.join(__dirname, "./preload.js"),
    },
  });

  const splash = new BrowserWindow({
    width: 700,
    height: 500,
    transparent: true,
    frame: false,
    resizable: false,
    alwaysOnTop: true,
  });

  win.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  splash.loadFile(path.join(__dirname, "./splash-screen.html"));
  splash.center();
  setTimeout(function () {
    splash.close();
    win.center();
    win.show();
  }, 6300);

  win.setIcon(path.join(__dirname, "./img/logo/icon.png"));

  if (isDev) {
    win.webContents.openDevTools();
  }

  ipc.on("purchase-app", async (event, { productId, userId, userEmail }) => {
    try {
      const response = await axios.post(
        `https://api.shakarzr.com/api/payments/create-checkout-session`,
        { productId, userId, email: userEmail }
      );
      const { url } = response.data;

      require("electron").shell.openExternal(url);
    } catch (error) {
      console.error("Error creating checkout session:", error);
    }
  });

  ipc.on("closeApp", () => {
    win.close();
  });

  ipc.on("minimizeApp", () => {
    win.minimize();
  });

  var handleRedirect = (e, url) => {
    if (url !== win.webContents.getURL()) {
      e.preventDefault();
      require("electron").shell.openExternal(url);
    }
  };

  win.webContents.on("will-navigate", handleRedirect);
  win.webContents.on("new-window", handleRedirect);
};

autoUpdater.on("update-available", () => {
  win.webContents.send("update_available");
});

autoUpdater.on("update-downloaded", () => {
  win.webContents.send("update_downloaded");
});

ipc.on("app_version", (event) => {
  event.sender.send("app_version", { version: app.getVersion() });
});

ipc.on("restart_app", () => {
  autoUpdater.quitAndInstall();
});

autoUpdater.on("error", (message) => {
  console.error("There was a problem updating the application");
  console.error(message);
});

app.whenReady().then(() => {
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
