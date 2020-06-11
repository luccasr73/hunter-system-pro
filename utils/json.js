// const obj = { nome: 'Luccas Robertaaaa', email: 'luccasrobert@hotmail.com', celular: '', data_nasc: '', descricao: '' }
// const arr = ['nome', 'email']

function trocaVazioPorNulo (keys, dados) {
  keys.forEach(e => {
    if (dados[e] === '') {
      dados[e] = null
    }
  })
  return dados
}

module.exports = { trocaVazioPorNulo }
