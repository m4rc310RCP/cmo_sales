const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld('app',{
    // status : async () => await ipcRenderer.invoke('app:status'),
    receive : (channel, callback) => {
        ipcRenderer.on(channel, (_, ...args)=> callback(...args));
    },

    resizeWindow: (width, height) => {
        console.log(width)
    },

    domReadyPromise: () => domReadyPromise(),
});

//contextBridge.exposeInMainWorld('domReadyPromise', /)


const domReadyPromise = new Promise(resolve => {
    document.addEventListener('DOMContentLoaded', () => {
      console.log('DOMContentLoaded')
      resolve()
    })
})