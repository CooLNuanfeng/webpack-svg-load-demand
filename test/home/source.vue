<template>
<div>
  <h1 class="red">hello</h1>
  <p><svg-icon icon-class="zan" class-name="zan"></svg-icon>{{msg}}</p>
  <p><svg-icon icon-class="safe" class-name="safe"></svg-icon>{{msg}}</p>
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

