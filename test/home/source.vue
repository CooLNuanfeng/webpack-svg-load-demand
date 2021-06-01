<template>
<div>
  <h1 class="red">hello</h1>
  <p><svg-icon svg-path="assets/home/zan.svg" icon-class="zan" class-name="zan"></svg-icon>{{msg}}</p>
  <p><svg-icon svg-path="assets/home/safe.svg" class-name="safe" icon-class="safe"></svg-icon>{{msg}}</p>
</div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'bbb'
    }
  }
}
</script>

<style>
.red {
  color: red;
}
</style>

