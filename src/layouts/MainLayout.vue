<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar style="min-height: 80px; padding: 0 6.5%; background-color: #000000;">
        <q-img
          src="/logo-bcontrol.svg"
          :style="!$q.screen.lt.sm ? 'max-width: 160px;' : 'max-width: 200px;'"
        />

        <q-space />

        <div class="row items-center q-gutter-md">
          <span class="text-20">Olá Matheus!</span>

          <q-avatar size="50px" style="background-color: #FFFFFF; border-radius: 50%;">
            <q-icon
              name="person"
              color="black"
              size="44px"
            />
          </q-avatar>
        </div>
      </q-toolbar>

      <div class="row justify-center" style="width: 100%;">
        <div style="width: 80%; position: absolute;">
          <Sidebar />
        </div>
      </div>
    </q-header>

    <Drawer/>

    <q-footer>
      <q-toolbar style="min-height: 35px; background-color: #000000;">
        <q-toolbar-title class="text-center text-14 weight-300">Desenvolvido por FatorX Tech - Todos os Direitos de Uso Reservados</q-toolbar-title>
      </q-toolbar>
    </q-footer>

    <q-page-container>
      <q-page
        :style="$q.screen.width > 1550 ? 'padding: 100px 30px 0px 120px;' : 'padding: 100px 10px 0px 100px;'"
      >
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script>
import Drawer from 'src/components/DrawerComponent.vue'
import Sidebar from 'src/components/SidebarComponent.vue'
export default {
  components: {
    Sidebar,
    Drawer
  }
}
</script>
