<template>
  <div class="borde_red">
    <h1 class="borde_red">{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      msg: 'Login'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.borde_red{
  border: 1px solid red;
}
</style>
