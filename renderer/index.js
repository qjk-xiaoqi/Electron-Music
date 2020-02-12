// 向主进程发消息： 点击添加音乐按钮后创建添加音乐窗口
const {ipcRenderer} = require('electron');
const {$} = require('./helper.js');
// 点击添加按钮,通知主进程创建添加音乐的窗口
 $('add-music').addEventListener("click",() =>{
    ipcRenderer.send('add-music');
})
// 监听渲染事件
ipcRenderer.on('renderList', (event, data) =>{
    renderList(data);
});


// 渲染列表函数
const renderList = (musicData) => {
    let renderHtml = musicData.reduce((pre, cur)=>{
        pre += `<li class="row musicLi list-group-item  d-flex justify-content-between align-items-center"> 
            <div class="rol-9">
                <i class="fas fa-music mr-4"></i>
                ${cur.filename}
            </div>
            <div class="rol-3">
                <i class="fas fa-play mr-4"></i>
                <i class="fas fa-trash"></i>
            </div>   
        </li>`;
        return pre;
    },'')
    const emptyHtml = `<div class="empty">当前没有任何歌曲</div>`;
    $('musicList').innerHTML = musicData.length === 0 ? emptyHtml :`<ul class="list-group"> ${renderHtml}</ul>`;
}