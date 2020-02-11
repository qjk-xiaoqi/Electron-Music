// 向主进程发消息： 点击选择按钮后弹出对话框
const {ipcRenderer} = require('electron');
const {$} = require('./helper.js');
// 点击按钮,通知主进程创建添加音乐的窗口
 $('select-music').addEventListener("click",() =>{
     // 弹出对话框以便选择歌曲
    ipcRenderer.send('open-music-dialog');
})