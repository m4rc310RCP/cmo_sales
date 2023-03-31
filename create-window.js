const path = require('path');
const {ipcRenderer, BrowserWindow } = require('electron');

const makeWindow =  (componentDir, options = {}) => {
  return new Promise((resolve)=>{  
    const { width = 800, height = 600, title = 'My App' } = options;
      
    //const entryPath = path.join(__dirname, componentDir, 'index.js');
    const outputDir = path.join(__dirname, 'build', 'js', componentDir);
    const dirname_electron = path.join(__dirname, 'node_modules', '.bin', 'electron');

    const windowOptions = {
      width,
      height,
      title,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: true,
        preload: path.join(__dirname, 'src', 'electron','preload.js'),
      },
      show: false,
    };

    require('electron-reload')(__dirname, {
        electron: dirname_electron,
        hardResetMethod: 'exit'
    });


    let window = new BrowserWindow(windowOptions);
    window.loadFile(path.join(outputDir, 'index.html'));

    window.webContents.on('did-finish-load', async () => {
      await window.webContents.executeJavaScript('window.domReadyPromise');
      const rootDiv = await window.webContents.executeJavaScript(`
      new Promise((resolve, reject) => {
        try {
          const rootDiv = document.getElementById('root')
          const { width, height } = rootDiv.getBoundingClientRect()
          resolve({ width, height })
        } catch (error) {
          reject(error)
        }
      })
    `);

     // window.setSize(rootDiv.width, rootDiv.height);
      window.center();
      window.show();
    });
    
    resolve(window);

  });
}

const createWindow = async (componentDir, options = {}) => {
  makeWindow(componentDir, options).then(win=>{
    
  });
}


module.exports = {
    create:createWindow
}