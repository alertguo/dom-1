//增
//document.createElement('div')
const div = dom.create('<div>newDiv</div>')
console.log(div)

// dom.after(test,div)
// dom.before(test,div)
// dom.append(test,div)

const div2 = dom.create('<div id="parent"></div>')
dom.wrap(test, div2)

//删
const nodes = dom.empty(window.empty) //获取所有节点
console.log(nodes)

//改
//读写属性
dom.attr(test, 'title', 'Hi,I am Frank')
const title = dom.attr(test, 'title')
console.log(`title:${title}`)
//读写文本内容
dom.text(test, '你好，这是新的内容')
//修改 style
dom.style(test, { border: '1px solid red', color: 'blue' })
console.log(dom.style(test, 'border'))
dom.style(test, 'border', '1px solid black')
//添加 class
dom.class.add(test, 'red')
dom.class.add(test, 'blue')
//删除 class
dom.class.remove(test, 'blue')
//检查该元素是否存在
console.log(dom.class.contains(test, 'blue'))
//添加、删除事件监听
const fn = () => {
  console.log('点击了')
} //给函数取个名字，不然没法删除掉
dom.on(test, 'click', fn)
dom.off(test, 'click', fn)

//查
//获取标签或标签们
const testDiv = dom.find('#test')[0]
console.log(testDiv)
const test2 = dom.find('#test2')[0]
console.log(dom.find('.red', test2)[0])
//获取父元素
console.log(dom.parent(test))
//获取兄弟姐妹元素
const s2 = dom.find('#s2')[0]
console.log(dom.siblings(s2))
//获取弟弟
console.log(dom.next(s2))
//获取哥哥
console.log(dom.previous(s2))
//遍历所有节点
const t = dom.find('#travel')[0]
dom.each(dom.children(t), (n) => dom.style(n, 'color', 'red'))
//获取排行老几
console.log(dom.index(s2))
