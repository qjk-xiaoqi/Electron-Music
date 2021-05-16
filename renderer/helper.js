// 选择dom的代码
exports.$ = (id) => {
  return document.getElementById(id)
}

// 将时间转为正确的格式
exports.convertTimer = (time) => {
  // 转分钟  '01' 或者 '010'
  const minutes = '0' + Math.floor(time / 60)
  // 计算秒数 '01' 或者 '010'
  const seconds = '0' + Math.floor(time - minutes * 60)
  return minutes.substr(-2) + ':' + seconds.substr(-2)
}
