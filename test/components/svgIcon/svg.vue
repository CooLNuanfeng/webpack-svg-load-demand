<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="`#icon-${iconName}`"/>
  </svg>
</template>

<script>
export default {
  name: 'SvgIcon',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    }
  },
  mounted(){
    console.log(this)
  },
  computed: {
    iconName () {
      return `${this.iconClass}`
    },
    svgClass () {
      if (this.className) {
        return `za-svg-icon za-icon-${this.iconClass} ` + this.className
      } else {
        return `za-svg-icon za-icon-${this.iconClass}`
      }
    }
  }
}
</script>

<style>
.za-svg-icon {
  width: 20px;
  height: 20px;
  vertical-align: middle;
  fill: currentColor;
  overflow: hidden;
}
</style>