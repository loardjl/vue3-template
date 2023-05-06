// 设置 rem 函数
function setRem() {
  // 320 默认大小16px; 320px = 20rem ;每个元素px基础上/16
  let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth
  //得到html的Dom元素
  let htmlDom = document.getElementsByTagName('html')[0]
  //设置根元素字体大小
  htmlDom.style.fontSize = htmlWidth / (1920 / 14) < 8 ? '8px' : htmlWidth / (1920 / 14) + 'px'
}
setRem()
let timer = null
// 改变窗口大小时重新设置 rem
window.addEventListener('resize', function () {
  if (timer) {
    clearTimeout(timer)
  }
  timer = setTimeout(() => {
    setRem()
  }, 200)
})
