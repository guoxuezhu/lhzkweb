<template>
  <div>
    <b-card no-body>
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
        <b-tab title="串口设置">
          <SportSeting></SportSeting>
        </b-tab>
        <b-tab title="报警设置">
          <DangerSeting></DangerSeting>
        </b-tab>
        <b-tab title="温湿度设置">
          <WsdSeting></WsdSeting>
        </b-tab>
        <b-tab title="事件设置">
          <EventSeting></EventSeting>
        </b-tab>
      </b-tabs>
    </b-card>
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
  name: 'HelloWorld',
  components: {
    BaseInfo,
    DangerSeting,
    EventSeting,
    JdqSeting,
    LuboSeting,
    SportSeting,
    WsdSeting
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
