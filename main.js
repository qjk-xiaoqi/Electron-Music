const {app, BrowserWindow,ipcMain} = require('electron');

// 封装一个创建窗口的类（代码复用）
class AddWindow extends BrowserWindow {
    constructor(config, url){
        const baseConfig = {
            width: 800,
            height: 600,
            webPreferences:{
            nodeIntegration: true
            }
        }
         // 最终的Config  
        const finallConfig = Object.assign(baseConfig, config)
        // 也可以这样写： const finallConfig = {...baseConfig, ...config}
        // 调用父类的方法，即创建一个窗口
        super(finallConfig);
        // 加载相应的HTML文件
        this.loadFile(url);
        // 优雅地显示窗口
        this.once('ready-to-show', () => {
            this.show();
        })
    }  
}
app.on('ready', () => {
    const mainWindow = new AddWindow({}, './renderer/index.html');
    ipcMain.on('add-music',()=>{
        const addWindow = new AddWindow({
            width: 600,
            height: 400, 
            parent:mainWindow
        },'./renderer/add.html' );
    })
})