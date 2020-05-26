class MensagemFlash {
  static criar (req, tipo, data) {
    req.session.flashCustom = {
      type: tipo,
      message: data
    }
  }

  static ler (res) {
    return res.locals.flashCustom
  }
}
module.exports = { MensagemFlash }
