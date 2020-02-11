// 向主进程发消息： 点击添加音乐按钮后创建添加音乐窗口
const {ipcRenderer} = require('electron');

// 点击按钮,通知主进程创建添加音乐的窗口
document.getElementById("add-music").addEventListener("click",() =>{
    ipcRenderer.send('add-music');
})