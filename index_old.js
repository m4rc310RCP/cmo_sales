const { app, dialog } = require('electron');

const os = require('os')
const hostname = os.hostname


const { splash, main } = require('./src/electron/windows');

require('dotenv').config();

const path = require('path');
const fs = require('fs');

const showErro = (message) => {
    dialog.showMessageBox(null, {
        type: 'error',
        title: 'Título do diálogo',
        message: `${message}`,
        buttons: ['Ok']
    })
}

app.whenReady().then( async ()=>{    
    const dirname_electron = path.join(__dirname, 'node_modules', '.bin', 'electron');

    require('electron-reload')(__dirname, {
        electron: dirname_electron,
        hardResetMethod: 'exit'
    });

    let win = splash.create();
    win.then(async win => {
        await require('./src/api/server').start(win);
        win.close();
        main.create().then(w => {
            let name    = require('./package.json').description;
            let version = require('./package.json').version;
            w.setTitle(`${name} (Versão ${version}) - ${hostname}`);
        }); 
    });
});
