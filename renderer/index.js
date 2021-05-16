// 向主进程发消息： 点击添加音乐按钮后创建添加音乐窗口
const { ipcRenderer } = require('electron')
const { $ } = require('./helper.js')
const { convertTimer } = require('./helper.js')
let allFiles // 导入的所有的音乐文件
let targetMusic
let audio = new Audio()

// 点击添加按钮,通知主进程创建添加音乐的窗口
$('add-music').addEventListener('click', () => {
  ipcRenderer.send('add-music')
})
// 监听渲染事件
ipcRenderer.on('renderList', (event, data) => {
  allFiles = data
  renderList(data)
})

// 点击播放
$('musicList').addEventListener('click', (event) => {
  event.preventDefault()
  // 获得当前点击目标的id与classList
  const curId = event.target.dataset.id
  const classList = event.target.classList
  if (curId && classList.contains('fa-play')) {
    // 如果是当前点击过的音乐，就接着播放
    if (targetMusic && targetMusic[0].id == curId) {
      audio.play()
    } else {
      // 否则找出音乐文件中id与当前点击目标id一致的音乐文件
      targetMusic = allFiles.filter((item) => {
        return item.id == curId
      })
      audio.src = targetMusic[0].path
      audio.play()
      // 点击新歌，要还原之前歌曲的图标
      const otherMusic = document.querySelector('.fa-pause') //  querySelector() 方法仅仅返回匹配指定选择器的第一个元素
      if (otherMusic) {
        otherMusic.classList.replace('fa-pause', 'fa-play')
      }
    }
    // 换图标
    classList.replace('fa-play', 'fa-pause')
  } else if (curId && classList.contains('fa-pause')) {
    audio.pause()
    classList.replace('fa-pause', 'fa-play')
  } else if (curId && classList.contains('fa-trash')) {
    ipcRenderer.send('delete-music', curId)
  }
})

// 渲染播放器的状态
audio.addEventListener('loadedmetadata', () => {
  renderPlay(targetMusic[0].filename, audio.duration)
})
audio.addEventListener('timeupdate', () => {
  // 将当前时间转为正确的格式
  $('currentTime').innerHTML = convertTimer(audio.currentTime)
  // 计算进度条
  const progress = Math.floor((audio.currentTime / audio.duration) * 100)
  $('bar').innerHTML = progress + '%'
  bar.style.width = progress + '%'
})

// 渲染播放器状态函数
const renderPlay = (musicName, duration) => {
  const playHtml = `<div class="col-9 font-weight-bold">
                    Playing：${musicName}    
                    </div>
                    <div class="col-3"> 
                        <span id="currentTime">00:00</span>
                        <span class="duration">/${convertTimer(duration)}</span>
                    </div>`
  $('playStatus').innerHTML = playHtml
}

// 渲染列表函数
const renderList = (musicData) => {
  let renderHtml = musicData.reduce((pre, cur) => {
    pre += `<li class="row musicLi list-group-item  d-flex justify-content-between align-items-center"> 
            <div class="rol-9">
                <i class="fas fa-music mr-4"></i>
                ${cur.filename}
            </div>
            <div class="rol-3">
                <i class="fas fa-play mr-4" data-id="${cur.id}"></i>
                <i class="fas fa-trash " data-id="${cur.id}"></i>
            </div>   
        </li>`
    return pre
  }, '')
  const emptyHtml = `<div class="empty">You don't have any music right now </div>`
  $('musicList').innerHTML = musicData.length === 0 ? emptyHtml : `<ul class="list-group"> ${renderHtml}</ul>`
}
