const { BrowserWindow, Menu, ipcRenderer, ipcMain } = require('electron')
const path = require('path');
const { emptyMenu } = require('../menu');
const fs = require('fs');
const { eventNames } = require('process');


let win;

const APP_STATUS = '@app:status';

const sendStatus = (wc, message) => {
    wc.send(APP_STATUS, message);
}

const createWindow = () => {
    return new Promise((resolve, reject)=>{
        win = new BrowserWindow({
            width: 550,
            height: 350,
            frame: false,
            webPreferences:{
                contextIsolation: true,
                nodeIntegration:  true,
                preload : path.join(__dirname,'..', 'preload.js')
            }
        });
        
        win.loadURL('about:blank');

        // const outDir = path.join(__dirname, '..', '..', '..', '..', 'build', 'js');
        
        // fs.watch(outDir, (eventType, fileName)=>{
        //     console.log(fileName);
        // });

        win.loadFile( path.join(__dirname, '..', '..', '..', 'react', 'splash', 'index.html'));
        
        Menu.setApplicationMenu(emptyMenu);
        
        win.webContents.on('did-finish-load', ()=>{
            const status = sendStatus.bind(null, win.webContents);
            status('Iniciando aplicação...');
            resolve(win);
        });
    });
}

module.exports = {
    create:createWindow,
}