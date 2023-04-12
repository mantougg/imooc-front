import faces from '@/assets/js/face'

const escapeHtml = (val = '') => {
  if (!val) return ''
  let result = val
  // 替换表情
  let face = /\sface\[\W{1,}]/g
  if (face.test(result)) {
    let group = result.match(face)
    console.log('🚀 ~ file: escapeHtml.js:10 ~ escapeHtml ~ group:', group)
    group.map((item) => {
      const key = item.match(/\[\S+\]/g)[0]
      result = result.replace(item, `<img src="${faces[key]}">`)
    })
  }
  // 替换图片
  const img = /\simg\[\S+\]/g
  if (img.test(result)) {
    const group = result.match(img)
    group.map((item) => {
      console.log('🚀 ~ file: escapeHtml.js:21 ~ group.map ~ item:', item)
      result = result.replace(item, `<img src="${item.substr(5, item.length - 6)}">`)
    })
  }
  // 替换链接
  const link = /\sa\(\S+\]/g
  if (link.test(result)) {
    const group = result.match(link)
    const title = /\((.+)\)/
    const linkName = /\[(.+)\]/
    group.map((item) => {
      const nameGroup = item.match(linkName)
      let name = ''
      if (nameGroup.length > 0) {
        name = nameGroup[1]
      }
      const linkGroup = item.match(title)
      let link = ''
      if (linkGroup.length > 0) {
        link = linkGroup[1]
      }
      result = result.replace(item, `<a href="${link}">${name}</a>`)
    })
  }
  // 替换引用
  result = result.replace(/\s\[quote\]/g, '<div class="layui-elem-quote">')
  result = result.replace(/\[\/quote\]/g, '</div>')
  // 替换代码块
  // 替换hr
  return result
}

export default escapeHtml
