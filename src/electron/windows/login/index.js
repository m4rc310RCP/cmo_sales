const { app, BrowserWindow, Menu, Notification } = require('electron')
const path = require('path');

let win;

const createWindow = () => {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences:{
            contextIsolation: true,
            nodeIntegration:true,
        }
    });

    win.loadFile( path.join('src', 'react', 'login','index.html'));
}

module.exports = {
    create:createWindow
}