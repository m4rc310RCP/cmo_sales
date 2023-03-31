
const { app } = require('electron');
const { create } = require('./create-window');




app.whenReady().then(() => {
    create('app', ).then(win => {
    });
});