<template>
  <div class="clients-page">
    <!-- Main Content -->
    <div class="main-content">
      <div class="content-wrapper">
        <!-- Título e Ações -->
        <div class="section-header">
          <h1 class="section-title">Meus Clientes</h1>
          <div class="header-actions">
            <q-input
              v-model="search"
              outlined
              dense
              placeholder="Buscar Cliente"
              class="search-input"
              bg-color="dark"
            >
              <template v-slot:prepend>
                <q-icon name="search" color="grey-5" />
              </template>
            </q-input>
            <q-btn
              no-caps
              label="Adicionar Novo Cliente"
              color="white"
              text-color="dark"
              icon="add"
              class="add-btn"
              @click="addClient"
            />
          </div>
        </div>

        <!-- Grid de Clientes -->
        <div class="clients-grid">
          <div
              v-for="(client, index) in filteredClients"
              :key="client.id"
              class="client-card"
              :class="{ 'inactive': !client.active }"
              :style="{ animationDelay: (index * 60) + 'ms' }"
            >
            <!-- Badge de Status -->
            <div class="status-badge" :class="client.active ? 'active' : 'inactive'">
              {{ client.active ? 'Ativo' : 'Inativo' }}
            </div>

            <!-- Ações do Card -->
            <div class="card-actions">
              <q-btn
                flat
                round
                dense
                :icon="client.favorite ? 'favorite' : 'favorite_border'"
                :color="client.favorite ? 'red-5' : 'white'"
                size="sm"
                @click="toggleFavorite(client)"
              />
              <q-btn
                flat
                round
                dense
                icon="settings"
                color="white"
                size="sm"
                @click="openSettings(client)"
              />
            </div>

            <!-- Info do Cliente -->
            <div class="client-info">
              <div class="client-avatar">
                <!-- mostra logo da empresa quando disponível, senão mostra ícone fallback -->
                <q-img
                  :src="client.raw?.logo || client.raw?.logoUrl || '/syrus-logo.png'"
                  class="company-logo"
                  :alt="client.name"
                  contain
                />
              </div>
              <div class="client-name">{{ client.name }}</div>
            </div>

            <!-- Botão Acessar -->
            <q-btn
              outline
              no-caps
              label="Acessar"
              class="access-btn"
              :class="{ 'inactive-btn': !client.active }"
              @click="accessClient(client)"
            />
          </div>
        </div>

        <!-- Botão Mostrar Mais -->
        <div v-if="hasMore" class="load-more">
          <q-btn
            flat
            no-caps
            label="Mostrar Mais"
            color="white"
            @click="loadMore"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCompany } from 'boot/axios'
import { useUserStore } from 'stores/user'

export default {
  data() {
    return {
      search: '',
      // keep a local list for display while we integrate with API
      clients: [],
      hasMore: false,
      companies: []
    };
  },

  computed: {
    filteredClients() {
      if (!this.search) return this.clients;
      
      return this.clients.filter(client =>
        client.name.toLowerCase().includes(this.search.toLowerCase())
      );
    }
  },

  async mounted() {
    const store = useUserStore()
    try {
      const cachedList = Array.isArray(store.companyList) ? store.companyList : []

      if (cachedList.length > 0) {
        // usa a lista em storage sem fazer nova requisição
        this.companies = cachedList

        if (cachedList.length === 1) {
          store.setCompanySelected(cachedList[0])
          this.$router.push('/dashboard/fluxo-financeiro')
          return
        }

        this.clients = cachedList.map((c, idx) => ({
          id: idx,
          name: c.razaoSocial || c.nome || c.cnpj || 'Empresa',
          active: c.ativo,
          favorite: false,
          raw: c
        }))

        return
      }
      
      const res = await getCompany()
      const list = Array.isArray(res) ? res : (res.items || [])

      store.setCompanyList(list)
      this.companies = list

      if (list.length === 1) {
        const only = list[0]
        store.setCompanySelected(only)
        this.$router.push('/dashboard/fluxo-financeiro')
      } else {
        this.clients = list.map((c, idx) => ({
          id: idx,
          name: c.razaoSocial || c.nome || c.cnpj || 'Empresa',
          active: c.ativo,
          favorite: false,
          raw: c
        }))
      }
    } catch (err) {
      console.error('Erro ao carregar empresas:', err)
      this.$q.notify({
        message: err?.response?.data?.message || 'Erro ao carregar empresas',
        color: 'negative',
        position: 'top'
      })
    }
  },

  methods: {
    toggleFavorite(client) {
      client.favorite = !client.favorite;
      this.$q.notify({
        message: client.favorite ? 'Adicionado aos favoritos' : 'Removido dos favoritos',
        color: 'positive',
        position: 'top',
        icon: 'check_circle',
        timeout: 1500
      });
    },

    openSettings(client) {
      this.$q.notify({
        message: `Configurações de ${client.name}`,
        color: 'info',
        position: 'top',
        timeout: 1500
      });
    },

    accessClient(client) {
      if (client.active) {

        // se o card veio de uma empresa (raw) seleciona a empresa na store e navega
        const store = useUserStore()
        if (client.raw) {
          store.setCompanySelected(client.raw)
          this.$router.push('/dashboard/fluxo-financeiro')
        } else {
          // comportamento legacy: abre rota por client id
          // this.$router.push({ path: `/client/${client.id}` });
        }
      }
    },

    addClient() {
      this.$q.notify({
        message: 'Adicionar novo cliente',
        color: 'positive',
        position: 'top',
        timeout: 1500
      });
    },

    loadMore() {
      this.$q.notify({
        message: 'Carregando mais clientes...',
        color: 'info',
        position: 'top',
        timeout: 1500
      });
    }
  }
}
</script>

<style scoped>
.clients-page {
  background: linear-gradient(135deg, #0a0f0d 0%, #0d2818 50%, #000000 100%);
  /* limitar a altura da página ao viewport e usar layout flex para
     permitir que o conteúdo role internamente sem ultrapassar 100vh */
  height: 100vh;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: 'Inter', sans-serif;
  position: relative;
  overflow: hidden;
}

/* Grid pattern overlay */
.clients-page::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    linear-gradient(rgba(16, 185, 129, 0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(16, 185, 129, 0.02) 1px, transparent 1px);
  background-size: 50px 50px;
  pointer-events: none;
  z-index: 0;
}


/* Main Content */
.main-content {
  position: relative;
  z-index: 1;
  padding: 40px 0;
}

.content-wrapper {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 32px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
}

.section-title {
  color: white;
  font-size: 36px;
  font-weight: 600;
  margin: 0;
}

.header-actions {
  display: flex;
  gap: 16px;
  align-items: center;
}

.search-input {
  width: 300px;
}

.search-input :deep(.q-field__control) {
  background: rgba(255, 255, 255, 0.05);
  border: 1.5px solid rgba(16, 185, 129, 0.3);
  border-radius: 8px;
  color: white;
  height: 44px;
}

.search-input :deep(.q-field__native) {
  color: white;
}

.search-input :deep(.q-field__control):hover {
  border-color: rgba(16, 185, 129, 0.5);
}

.add-btn {
  height: 44px;
  border-radius: 8px;
  font-weight: 600;
  padding: 0 24px;
  box-shadow: 0 4px 12px rgba(255, 255, 255, 0.15);
  transition: all 0.3s ease;
}

.add-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(255, 255, 255, 0.25);
}

/* Clients Grid */
.clients-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
}

.client-card {
  background: rgba(16, 185, 129, 0.08);
  border: 1.5px solid rgba(16, 185, 129, 0.3);
  border-radius: 16px;
  padding: 24px;
  position: relative;
  transition: all 0.28s cubic-bezier(.2,.9,.3,1);
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: 0;
  transform: translateY(8px) scale(0.995);
  animation: card-in 360ms ease forwards;
  box-sizing: border-box; /* garante padding incluso em min-height */
  min-height: 300px; /* altura consistente para alinhamento dos botões */
}

.client-card:hover {
  border-color: rgba(16, 185, 129, 0.6);
  transform: translateY(-6px) scale(1.01);
  box-shadow: 0 14px 40px rgba(16, 185, 129, 0.12);
}


.client-card.inactive {
  background: rgba(185, 28, 28, 0.12);
  border-color: rgba(239, 68, 68, 0.5);
}

.client-card.inactive:hover {
  border-color: rgba(239, 68, 68, 0.7);
  box-shadow: 0 8px 24px rgba(239, 68, 68, 0.2);
}

.status-badge {
  position: absolute;
  top: 16px;
  left: 16px;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.status-badge.active {
  background: rgba(16, 185, 129, 0.2);
  color: #10b981;
  border: 1px solid rgba(16, 185, 129, 0.4);
}


.status-badge.inactive {
  background: rgba(239, 68, 68, 0.25);
  color: #fca5a5;
  border: 1px solid rgba(239, 68, 68, 0.5);

}



.card-actions {
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  gap: 4px;
}

.client-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin: 32px 0 24px;
  flex: 1 1 auto; /* ocupa espaço disponível para empurrar o botão para baixo */
}

.client-avatar {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.22);
  width: 88px;
  height: 88px;
  border-radius: 10px; /* quadrado levemente arredondado */
  overflow: hidden;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.company-logo {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}

:deep(.company-logo .q-img__image) {
  object-fit: contain !important;
}

@keyframes card-in {
  from { opacity: 0; transform: translateY(8px) scale(0.995); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}

.client-name {
  color: white;
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  /* limita o nome a 2 linhas para evitar altura variável entre cards */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  min-height: 44px; /* reserva espaço visual para 2 linhas */
}

.access-btn {
  width: 100%;
  height: 40px;
  border-radius: 8px;
  color: white;
  border: 1.5px solid rgba(16, 185, 129, 0.5);
  font-weight: 500;
  transition: all 0.3s ease;
  align-self: stretch;
  margin-top: 8px;
}

.access-btn:hover {
  background: rgba(16, 185, 129, 0.1);
  border-color: #10b981;
}



.access-btn.inactive-btn {
  border-color: rgba(239, 68, 68, 0.6);
  color: rgba(255, 255, 255, 0.8);
  cursor: not-allowed;
}


.access-btn.inactive-btn:hover {
  background: rgba(239, 68, 68, 0.15);
  border-color: rgba(239, 68, 68, 0.8);
}

/* Load More */
.load-more {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}

.load-more .q-btn {
  font-size: 16px;
  padding: 8px 32px;
  transition: all 0.3s ease;
}

.load-more .q-btn:hover {
  background: rgba(255, 255, 255, 0.05);
}

/* Responsive */
@media (max-width: 1024px) {
  .nav-icons {
    display: none;
  }

  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }

  .header-actions {
    width: 100%;
    flex-direction: column;
  }

  .search-input {
    width: 100%;
  }

  .add-btn {
    width: 100%;
  }

  .clients-grid {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 16px;
  }
}

@media (max-width: 768px) {
  .content-wrapper {
    padding: 0 16px;
  }

  .header-content {
    padding: 0 16px;
  }

  .section-title {
    font-size: 28px;
  }

  .clients-grid {
    grid-template-columns: 1fr;
  }

  .company-details {
    display: none;
  }

  /* reduz o tamanho do avatar em telas pequenas */
  .client-avatar {
    width: 64px;
    height: 64px;
  }
}
</style>