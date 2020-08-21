window.dom = {
  //增
  //创建节点
  create(string) {
    const container = document.createElement('template') //容器
    container.innerHTML = string.trim() //trim() 用来去掉前后空格
    return container.content.firstChild
  },
  //新增弟弟
  after(node, node2) {
    node.parentNode.insertBefore(node2, node.nextSibling)
  },
  //新增哥哥
  before(node, node2) {
    node.parentNode.insertBefore(node2, node)
  },
  //新增儿子
  append(parent, node) {
    parent.appendChild(node)
  },
  //新增爸爸
  wrap(node, parent) {
    dom.before(node, parent)
    //先添加新节点到原先节点前面
    dom.append(parent, node)
    //再把原先的节点添加为新节点的儿子
  },

  //删
  //删节点
  remove(node) {
    // node.remove() //该方法比较新，有可能会用不了
    node.parentNode.removeChild(node)
    return node
  },
  //删后代
  empty(node) {
    // node.innerHTML = '' //直接设置元素后代为空
    //上面的方法也可行，但是如果想获取到里面的节点的引用，可用下面的方法(返回移除的节点)
    const array = []
    let x = node.firstChild
    while (x) {
      array.push(dom.remove(node.firstChild))
      x = node.firstChild
    }
    return array
  },

  //改
  //读写属性
  attr(node, name, value) {
    if (arguments.length === 3) {
      //如果长度为3，设置节点(实现写)
      node.setAttribute(name, value)
    } else if (arguments.length === 2) {
      //如果长度为2，获取节点(实现读)
      return node.getAttribute(name)
    }
  },
  //读写文本内容
  text(node, string) {
    // 适配
    if (arguments.length === 2) {
      if ('innerText' in node) {
        node.innerText = string // IE
      } else {
        node.textContent = string // firefox | Chrome
      }
    } else if (arguments.length === 1) {
      if ('innerText' in node) {
        return node.innerText // IE
      } else {
        return node.textContent // firefox | Chrome
      }
    }
  },
  //读写 HTML 内容
  html(node, string) {
    if (arguments.length === 2) {
      node.innerHTML = string
    } else if (arguments.length === 1) {
      return node.innerHTML
    }
  },
  //修改 style
  style(node, name, value) {
    if (arguments.length === 3) {
      // dom.style(div, 'color', 'red')
      node.style[name] = value
    } else if (arguments.length === 2) {
      if (typeof name === 'string') {
        // dom.style(div,'color')
        return node.style[name]
      } else if (name instanceof Object) {
        // dom.style(div, {color: 'red'})
        const object = name
        for (let key in object) {
          node.style[key] = object[key]
        }
      }
    }
  },
  //添加、删除 class
  class: {
    add(node, className) {
      node.classList.add(className)
    },
    remove(node, className) {
      node.classList.remove(className)
    },
    contains(node, className) {
      // 检查是否有该元素
      return node.classList.contains(className)
    },
  },
  //添加、删除事件监听
  on(node, eventName, fn) {
    node.addEventListener(eventName, fn)
  },
  off(node, eventName, fn) {
    node.removeEventListener(eventName, fn)
  },

  //查
  //获取标签或标签们
  find(selector, scope) {
    return (scope || document).querySelectorAll(selector)
    //如果有scope，就在scope里找selector；否则就在document里找
  },
  //获取父元素
  parent(node) {
    return node.parentNode
  },
  //获取子元素
  children(node) {
    return node.children
  },
  //获取兄弟姐妹元素
  siblings(node) {
    return Array.from(node.parentNode.children).filter((n) => n !== node)
  },
  //获取弟弟
  next(node) {
    let x = node.nextSibling
    while (x && x.nodeType === 3) {
      x = x.nextSibling
    }
    //x存在且直到第一个x的节点类型不为3(文本节点)，返回x
    return x
  },
  //获取哥哥
  previous(node) {
    let x = node.previousSibling
    while (x && x.nodeType === 3) {
      x = x.previousSibling
    }
    //x存在且直到第一个x的节点类型不为3(文本节点)，返回x
    return x
  },
  //遍历所有节点
  each(nodeList, fn) {
    for (let i = 0; i < nodeList.length; i++) {
      fn.call(null, nodeList[i])
    }
  },
  //获取排行老几
  index(node) {
    //node.parentNode.children
    const list = dom.children(node.parentNode)
    let i
    for (i = 0; i < list.length; i++) {
      if (list[i] === node) {
        break
      }
    }
    return i
  },
}
