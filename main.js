const {app, BrowserWindow,ipcMain,dialog} = require('electron');
const musicStore = require('./renderer/musicStore.js');

const store = new musicStore();
 
// 程序存放的路径
// console.log(app.getPath('userData'));
 

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
    });
    ipcMain.on('open-music-dialog', (event)=>{
        dialog.showOpenDialog({
            // 允许选择文件、允许多选
            properties: ['openFile', 'multiSelections'],
            // 指定可选文类型的数组
            filters: [
                {name: 'Music', extensions:['mp3']}
            ]
        }).then((files) => {
            // 如果文件存在，传入文件路径，并通知add.js中展示音乐列表
             if(files) {
                event.sender.send('show-list',files.filePaths);
             }
        }).catch(() => {
            console.log('error');
        })
    });

    ipcMain.on('import-musicData', (event, data)=>{
       const updata = store.addData(data).getData();
        console.log(updata);
    });
    ipcMain.on('notData',()=>{
        dialog.showMessageBox({
            type: "info",
            title: '提示',
            message: '请选择要导出的音乐文件'
        })
    })
})