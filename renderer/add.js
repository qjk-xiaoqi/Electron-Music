// 向主进程发消息： 点击选择按钮后弹出对话框
const {ipcRenderer} = require('electron');
const {$} = require('./helper.js');
const path = require('path');
let musicFiles ;
// 点击按钮,通知主进程弹出系统对话框
 $('select-music').addEventListener("click",() =>{
     // 弹出对话框以便选择歌曲
    ipcRenderer.send('open-music-dialog');
})
// 展示音乐列表
ipcRenderer.on('show-list', (event, Files)=>{
    // 这里的data就是传进来的文件路径数组。
    if(Array.isArray(Files)) {
        renderList(Files);
        musicFiles = Files;
    }
})

// 点击导入按钮，将选择的音乐文件传给主进程
$('import-music').addEventListener("click",() =>{
    if(!musicFiles) {
        ipcRenderer.send('notData');
    }else{
        ipcRenderer.send('import-musicData',musicFiles);
    }
})




// 生成列表的函数
const renderList = (Files)=>{
    // 使用reduce函数来叠加
    const musicListHtml = Files.reduce((pre, cur)=>{ 
        pre += `<li class="list-group-item">
        <i class="fas fa-music mr-4"></i>
            ${path.basename(cur)}</li>`;
        return pre;
    }, '')  // 初始值为''
    $('music-list').innerHTML = `<ul class="list-group">${musicListHtml}</ul>`;
}