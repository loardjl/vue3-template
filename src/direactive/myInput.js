// 正则表达式
const reg = {
  num: /[^\d]/g,
  zh: /[\u4e00-\u9fa5]/g
}
/**
 * 自定义输入框限制指令
 * @param {*} el 当前dom
 * @param {*} bind 指令对象
 * @param {*} vNode 当前虚拟dom
 * @param {*} preNode 之前的虚拟dom
 */
const myInput = (el, bind, vNode, preNode) => {
  el.oninput = e => {
    e.target.value = e.target.value.replace(reg[bind.arg], '')
    e.target.dispatchEvent(new Event('input'))
  }
}
export default { myInput }
