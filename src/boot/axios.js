import axios from 'axios'
import { parseJwt } from 'src/helpers/parseJwt'
import { useUserStore } from 'src/stores/user'

axios.defaults.baseURL = process.env.API_URL
axios.defaults.withCredentials = false

// --- CONFIG para o refresh-token
const refreshJwt = axios.create({
  baseURL: axios.defaults.baseURL,
  withCredentials: false
})

let refreshPromise = null

function setUserInfoFromToken (accessToken) {
  const p = parseJwt.parse(accessToken);
  const userInfo = {
    id: p.sub,
    name: p.name,
    email: p.email,
    role: p.role
  };
  const store = useUserStore();
  store.setUserInfo(userInfo);
}

async function getOrStartRefresh () {
  if (!refreshPromise) {
    const store = useUserStore()
    refreshPromise = refreshJwt.post('/auth/refresh', { refreshToken: store.user.refreshToken })
      .then(({ data }) => {
        // Atualiza sessão e userInfo
        store.setUser(data)
        setUserInfoFromToken(data.accessToken)
        return data.accessToken
      })
      .catch((err) => {
        // Falhou o refresh -> limpa sessão e vai pro login
        store.deleteSession()
        window.location.href = '/#/login'
        throw err
      })
      .finally(() => { refreshPromise = null })
  }
  return refreshPromise
  // Falhou o refresh -> limpa sessão e vai pro login
  // console.log("Refresh de token não implementado")
  // const store = useUserStore()
  // store.deleteSession()
  // window.location.href = '/#/login'
  // refreshPromise = null
  // throw "Sessão expirada. Efetue novamente o login"
}

axios.interceptors.request.use(
  async (config) => {
    const store = useUserStore()
    // Se já existe um refresh em progresso, espera ele terminar
    if (refreshPromise) {
      const newToken = await refreshPromise.catch(() => null)
      if (newToken) {
        config.headers.Authorization = `Bearer ${newToken}`
        config._sentAuth = true
      }

      return config
    }

    if (store.user) {
      const token = store.user.accessToken
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
        config._sentAuth = true
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  response => {
    return response
  },
  async error => {
    const originalRequest = error.config

    // Se ocorrer um erro generico, de rede por exemplo, ajusta para retornar no formato padrao esperado
    if (!error.response) {
      Object.assign(error, { response: { data: { message: 'Ocorreu um erro: ' + error.message } } })
      return Promise.reject(error)
    }

    // Retorna uma mensagem amigavel ao usuario nos casos em que tentar acessar a API com os dados de sessão ausentes (Logout em outra aba, por exemplo)
    if (error.response.status === 401 && error.response.data.message && error.response.data.message === 'missing or malformed jwt') {
      error.response.data.message = 'Sessão expirada. Efetue novamente o login'
    }

    // Verifica se ocorreu um erro de autenticação (token expirado, por exemplo) e faz o refresh da sessão
    if (error.response.status === 401 && !originalRequest._retry) {
      if (!originalRequest._sentAuth) {
        return Promise.reject(error)
      }
      
      originalRequest._retry = true
      try {
        // Aguarda o mesmo refresh para todas as requisições concorrentes
        const newToken = await getOrStartRefresh()

        // Atualiza o cabeçalho da requisição original com o novo token
        originalRequest.headers.Authorization = `Bearer ${newToken}`

        // Repete a requisição original com o novo token
        return axios(originalRequest)
      } catch (refreshError) {
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

const sendLogin = async params => {
  const res = await axios.post('/auth/login', params, {
    withCredentials: false
  });
  return res.data
}

const getCompany = async params => {
  const res = await axios.get(`/auth/empresas`, {params})
  return res.data
}

const getResetInfo = async params => {
  const res = await axios.get(`/auth/reset-info`, { params })
  return res.data
}

const forgotPassword = async params => {
  const res = await axios.post(`/auth/forgot-password`, params)
  return res.data
}

// EndPoints de fluxo financeiro ===============================================
const getFluxoFinanceiro = async params => {
  let company = JSON.parse(localStorage.getItem('company'))
  const res = await axios.get(`/fluxo-financeiro/${company?.cnpj}/`, {params})
  return res.data
}

const getFluxoDiario = async params => {
  let company = JSON.parse(localStorage.getItem('company'))
  const res = await axios.get(`/fluxo-financeiro/${company?.cnpj}/fluxo-diario`, {params})
  return res.data
}

const getRecebimentoRealizados = async params => {
  let company = JSON.parse(localStorage.getItem('company'))
  const res = await axios.get(`/fluxo-financeiro/${company?.cnpj}/recebimentos`, {params})
  return res.data
}

const getTituloDetalhe = async (params) => {
  let company = JSON.parse(localStorage.getItem('company'))
  const res = await axios.get(`/fluxo-financeiro/${company?.cnpj}/titulo-detalhe`, { params })
  return res.data
}

const getPagamentosRealizados = async params => {
  let company = JSON.parse(localStorage.getItem('company'))
  const res = await axios.get(`/fluxo-financeiro/${company?.cnpj}/pagamentos`, {params})
  return res.data
}

const getSaldoContas = async params => {
  let company = JSON.parse(localStorage.getItem('company'))
  const res = await axios.get(`/fluxo-financeiro/${company?.cnpj}/saldos`, {params})
  return res.data
}

const getFluxoMensal = async (params = {}) => {
  let company = JSON.parse(localStorage.getItem('company'))
  const res = await axios.get(`/fluxo-financeiro/${company?.cnpj}/fluxo-mensal`, { params })
  return res.data
}
// ============================================================================

// endpoint de resultado financeiro
const getResultadoFinanceiro = async () => {
  let company = JSON.parse(localStorage.getItem('company'))
  const res = await axios.get(`/resultado-financeiro/${company?.cnpj}/`)
  return res.data
}

const getDespesasCentroCusto = async () => {
  let company = JSON.parse(localStorage.getItem('company'))
  const res = await axios.get(`/resultado-financeiro/${company?.cnpj}/despesas-por-centro-custo`)
  return res.data
}

const getDreMensal = async params => {
  let company = JSON.parse(localStorage.getItem('company'))
  const res = await axios.get(`/resultado-financeiro/${company?.cnpj}/dre`, {params})
  return res.data
}

const getFaturamento = async params => {
  let company = JSON.parse(localStorage.getItem('company'))
  const res = await axios.get(`/resultado-financeiro/${company?.cnpj}/faturamento`, {params})
  return res.data
}

const getInadimplencia = async () => {
  let company = JSON.parse(localStorage.getItem('company'))
  const res = await axios.get(`/resultado-financeiro/${company?.cnpj}/inadimplencia`)
  return res.data
}

const getPerdaReceitaRecorrente = async params => {
  let company = JSON.parse(localStorage.getItem('company'))
  const res = await axios.get(`/resultado-financeiro/${company?.cnpj}/perda-receita-recorrente`, {params})
  return res.data
}
// =============================================================================

export {
  sendLogin,
  getRecebimentoRealizados,
  getPagamentosRealizados,
  getSaldoContas,
  getFluxoDiario,
  getFluxoFinanceiro,
  getCompany,
  getFluxoMensal,
  getResetInfo,
  forgotPassword,
  getResultadoFinanceiro,
  getDespesasCentroCusto,
  getDreMensal,
  getFaturamento,
  getInadimplencia,
  getPerdaReceitaRecorrente,
  getTituloDetalhe
}
