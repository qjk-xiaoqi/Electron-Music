const Store = require('electron-store')
const uuid = require('uuid/v4')
const path = require('path')
class MusicStore extends Store {
  constructor(settings) {
    super(settings)
    // 属性musicData保存所有音乐文件的信息。
    this.musicData = this.get('musicData') || []
  }
  saveData() {
    this.set('musicData', this.musicData)
    return this
  }
  getData() {
    return this.get('musicData') || []
  }
  addData(music) {
    // 为传入的音乐文件的每一项增加辅助属性、
    const newMusic = music
      .map((item) => {
        return {
          // 生成唯一的id
          id: uuid(),
          // path不变
          path: item,
          filename: path.basename(item),
        }
      })
      .filter((item) => {
        // 取出当前已经有的数据，并且只要每一项的path
        const currentPath = this.getData().map((item) => {
          return item.path
        })
        // 去重
        return currentPath.indexOf(item.path) < 0
      })
    // 更新musicData文件。
    this.musicData = [...this.musicData, ...newMusic]
    return this.saveData()
  }
}

module.exports = MusicStore
