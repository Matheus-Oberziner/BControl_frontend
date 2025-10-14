import { Notify } from 'quasar'

export const notify = {

  showFromHttp (data) {
    let msg = ''
    let msgType = ''
    let statusCode = 0

    if (data.response) {
      if (data.response.data.message) {
        msg = data.response.data.message
      }
      statusCode = data.response.status
    } else {
      if (data.message) {
        msg = data.message
        statusCode = 200
      } else {
        msg = 'Erro no processo: ' + data
      }
    }

    if (statusCode >= 500 || statusCode === 401) {
      msgType = 'negative'
    } else if (statusCode >= 300) {
      msgType = 'warning'
    } else if (statusCode >= 200) {
      msgType = 'positive'
    } else {
      msgType = 'negative'
    }

    Notify.create({
      type: msgType,
      position: 'top',
      message: msg,
      actions: [
        { icon: 'close', color: 'white', round: true }
      ]
    })
  },

  show (msg, msgType) {
    Notify.create({
      type: msgType,
      position: 'top',
      message: msg,
      actions: [
        { icon: 'close', color: 'white', round: true }
      ]
    })
  }
}
