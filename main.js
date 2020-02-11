const {app, BrowserWindow} = require('electron');
app.on('ready', () => {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences:{
            nodeIntegration: true
        }
    });
    mainWindow.loadFile('./renderer/index.html');
})