const Utils = {}
Utils.serializar = function (elm) {
  const data = {}
  elm.serializeArray().map(e => {
    // console.log(e)
    data[e.name] = e.value
  })
  return data
}
Utils.taVazio = function (data) {
  if (data === '' || data === null || data === 'null') {
    return true
  }
  return false
}
