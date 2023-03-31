const { app, BrowserWindow, Menu, Notification } = require('electron')
const path = require('path');

let win;

const createWindow = () => {
    return new Promise((resolve, reject)=>{

        win = new BrowserWindow({
            width: 800,
            height: 600,
            webPreferences:{
                contextIsolation: true,
                nodeIntegration:true,
            }
        });

        win.webContents.on('did-finish-load', ()=>{
            resolve(win);
            // let name = require('./package.json').description;
            // let version = require('./package.json').version;
            // win.setTitle(`${name} (Versão ${version}) - ${hostname}`)
        });
    
         win.loadFile( path.join('src', 'react', 'main','index.html'));

         
    });
}

module.exports = {
    create:createWindow
}