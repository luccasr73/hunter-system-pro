class MensagemErro {
  constructor (tipo, contexto) {
    this.tipo = tipo
    this.contexto = contexto
  }

  getTipo () {
    return this.tipo
  }

  getContexto () {
    return this.contexto
  }

  mensagemValidacao (campo, tipo, contexto) {
    if (tipo === 'string.min') {
      const mensagem = `O campo ${campo} precisa ter no minimo ${contexto.limit} caracteres!`
      return { campo, mensagem }
    }
    if (tipo === 'any.required') {
      const mensagem = `O campo ${campo} é obrigatorio`
      return { campo, mensagem }
    }
    if (tipo === 'string.regex.base') {
      const mensagem = `O campo ${campo} precisa ter no minimo 8 caracteres, conter ao menos 1 letra maiúscula, 1 minúscula e 1 numero`
      return { campo, mensagem }
    }
    if (tipo === 'any.allowOnly' && campo === 'confirmar-senha') {
      const mensagem = 'As senha precisam ser identicas'
      return { campo, mensagem }
    }
  }

  gerar () {
    const contexto = this.getContexto()
    // console.log(contexto)
    return this.mensagemValidacao(contexto.label, this.getTipo(), contexto)
  }
}

module.exports = {
  MensagemErro
}
