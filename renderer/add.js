// 向主进程发消息： 点击选择按钮后弹出对话框
const {ipcRenderer} = require('electron');
const {$} = require('./helper.js');
const path = require('path');
// 点击按钮,通知主进程创建添加音乐的窗口
 $('select-music').addEventListener("click",() =>{
     // 弹出对话框以便选择歌曲
    ipcRenderer.send('open-music-dialog');
})
// 展示音乐列表
ipcRenderer.on('show-list', (event, path)=>{
    // 这里的data就是传进来的文件路径数组。
    if(Array.isArray(path)) {
        renderList(path);
    }
})



// 生成列表的函数
const renderList = (pathes)=>{
    // 使用reduce函数来叠加
    const musicListHtml = pathes.reduce((pre, cur)=>{ 
        pre += `<li class="list-group-item">${path.basename(cur)}</li>`;
        return pre;
    }, '')// 初始值为''
    $('music-list').innerHTML = `<ul class="list-group">${musicListHtml}</ul>`;
}