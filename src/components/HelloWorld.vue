<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="success">
      <b-navbar-brand href="#">力弘智慧教育</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template slot="button-content"><em>User</em></template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <b-tabs pills card vertical>
      <b-tab title="基本信息" active>
        <BaseInfo></BaseInfo>
      </b-tab>
      <b-tab title="录播设置">
        <LuboSeting></LuboSeting>
      </b-tab>
      <b-tab title="继电器设置">
        <JdqSeting></JdqSeting>
      </b-tab>
      <b-tab title="串口设置" @click="tabSportSeting">
        <SportSeting ref="childSportSeting"></SportSeting>
      </b-tab>
      <b-tab title="报警设置" @click="tabDangerSeting">
        <DangerSeting ref="childDangerSeting"></DangerSeting>
      </b-tab>
      <b-tab title="温湿度设置">
        <WsdSeting></WsdSeting>
      </b-tab>
      <b-tab title="事件设置" @click="tabEventSeting">
        <EventSeting ref="childEventSeting"></EventSeting>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import BaseInfo from './seting/BaseInfo.vue'
import DangerSeting from './seting/DangerSeting.vue'
import EventSeting from './seting/EventSeting.vue'
import JdqSeting from './seting/JdqSeting.vue'
import LuboSeting from './seting/LuboSeting.vue'
import SportSeting from './seting/SportSeting.vue'
import WsdSeting from './seting/WsdSeting.vue'
export default {
  components: {
    BaseInfo,
    DangerSeting,
    EventSeting,
    JdqSeting,
    LuboSeting,
    SportSeting,
    WsdSeting
  },
  created () {
    console.log('=========HelloWorld===========')
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    tabSportSeting () {
      this.$refs.childSportSeting.sportInfo()
    },
    tabEventSeting () {
      this.$refs.childEventSeting.eventInfo()
    },
    tabDangerSeting () {
      this.$refs.childDangerSeting.getDangerInfo()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
