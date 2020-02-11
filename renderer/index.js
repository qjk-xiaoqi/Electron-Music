// 向主进程发消息： 点击添加音乐按钮后创建添加音乐窗口
const {ipcRenderer} = require('electron');
const {$} = require('./helper.js');
// 点击按钮,通知主进程创建添加音乐的窗口
 $('add-music').addEventListener("click",() =>{
    ipcRenderer.send('add-music');
})