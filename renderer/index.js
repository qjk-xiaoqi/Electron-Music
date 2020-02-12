// 向主进程发消息： 点击添加音乐按钮后创建添加音乐窗口
const {ipcRenderer} = require('electron');
const {$} = require('./helper.js');
let allFiles; // 导入的所有的音乐文件
let targetMusic;
let audio = new Audio();
// 点击添加按钮,通知主进程创建添加音乐的窗口
 $('add-music').addEventListener("click",() =>{
    ipcRenderer.send('add-music');
})
// 监听渲染事件
ipcRenderer.on('renderList', (event, data) =>{
    allFiles = data;
    renderList(data);
});



// 点击播放
$('musicList').addEventListener('click', (event)=>{
    event.preventDefault();
    // 获得当前点击目标的id与classList
    const curId = event.target.dataset.id;
    const classList = event.target.classList;
    if(curId && classList.contains('fa-play')){ 
        // 找出音乐文件中id与当前点击目标id一致的音乐文件
        targetMusic = allFiles.filter((item)=>{
            return item.id == curId;
        })  
        audio.src = targetMusic[0].path;
        audio.play();
    }
})





// 渲染列表函数
const renderList = (musicData) => {
    let renderHtml = musicData.reduce((pre, cur)=>{
        pre += `<li class="row musicLi list-group-item  d-flex justify-content-between align-items-center"> 
            <div class="rol-9">
                <i class="fas fa-music mr-4"></i>
                ${cur.filename}
            </div>
            <div class="rol-3">
                <i class="fas fa-play mr-4" data-id="${cur.id}"></i>
                <i class="fas fa-trash " data-id="${cur.id}"></i>
            </div>   
        </li>`;
        return pre;
    },'')
    const emptyHtml = `<div class="empty">当前没有任何歌曲</div>`;
    $('musicList').innerHTML = musicData.length === 0 ? emptyHtml :`<ul class="list-group"> ${renderHtml}</ul>`;
}