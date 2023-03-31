const { Menu } = require('electron');


const template = [{
    label: 'File',
    submenu: [
        {role: 'toggledevtools'},
        {role: 'close'}
    ],
}];

const emptyMenu = Menu.buildFromTemplate(template);


module.exports = {
    emptyMenu  : emptyMenu,
}