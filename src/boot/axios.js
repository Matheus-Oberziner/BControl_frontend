import axios from 'axios'

axios.defaults.baseURL = process.env.API_URL
axios.defaults.withCredentials = false

axios.interceptors.request.use(
  async (config) => {
    // const token = ''
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`
    // }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  (response) => {
    return response
  },
  async error => {
    return Promise.reject(error)
  }
)

const sendLogin = async () => {
  const params = {
    id: '12345678910',
    password: '123456'
  }

  const res = await axios.post('/auth/login', params, {
    withCredentials: true
  })

  return res.data
}

const cnpj = '73750167000143'

const getRecebimentoRealizados = async params => {
  const res = await axios.get(`/fluxo-financeiro/${cnpj}/recebimentos`, {params})
  return res.data
}

const getPagamentosRealizados = async params => {
  const res = await axios.get(`/fluxo-financeiro/${cnpj}/pagamentos`, {params})
  return res.data
}

export {
  sendLogin,
  getRecebimentoRealizados,
  getPagamentosRealizados
}
