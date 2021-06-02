<template>
  <svg aria-hidden="true">
    <use :xlink:href="`#${link}`"/>
  </svg>
</template>

<script>
export default {
  name: 'SvgIcon',
  props: {
    link: {
      type: String,
      required: true
    },
  },
}
</script>
