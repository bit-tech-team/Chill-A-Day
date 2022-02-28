const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const ipc = ipcMain;
const isDev = require("electron-is-dev");
const createWindow = () => {
  const win = new BrowserWindow({
    width: 1200,
    height: 680,
    minWidth: 940,
    minHeight: 560,
    frame: false,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      devTools: true,
      preload: path.join(__dirname, "./preload.js"),
      /* icon:path.join(__dirname + './assets/img/icon/icon.png',) */
    },
  });

  win.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  win.setIcon(path.join(__dirname, "./img/logo/icon.png"));
  if (isDev) {
    win.webContents.openDevTools();
  }

  ipc.on("closeApp", () => {
    win.close();
  });

  ipc.on("minimizeApp", () => {
    win.minimize();
  });

  ipc.on("maximizeRestoreApp", () => {
    if (win.isMaximized()) {
      win.restore();
    } else {
      win.maximize();
    }
  });

  win.on("maximize", () => {
    win.webContents.send("isMaximized");
  });

  win.on("unmaximize", () => {
    win.webContents.send("isRestored");
  });

  var handleRedirect = (e, url) => {
    if(url !== win.webContents.getURL()) {
      e.preventDefault()
      require('electron').shell.openExternal(url)
    }
  }
  
  win.webContents.on('will-navigate', handleRedirect)
  win.webContents.on('new-window', handleRedirect)
};

ipcMain.on("hotspot-event", (event, arg) => {
  event.returnValue = "Message received!";
  console.log(event);
  require("electron").shell.openExternal(
    `https://shakarr.github.io`
  );
});


app.whenReady().then(() => {
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
