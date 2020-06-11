class Template {
  static taVazio (data) {
    if (data === '' || data === null || data === 'null') {
      return true
    }
    return false
  }

  static temCamposVazios (obj) {
    let flag = 0
    Object.values(obj).forEach(e => {
      if (Template.taVazio(e)) {
        flag++
      }
    })
    if (flag > 0) {
      return true
    }
    return false
  }
}

module.exports = Template
