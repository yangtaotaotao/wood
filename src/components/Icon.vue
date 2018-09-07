<template>
  <svg class="car-icon" aria-hidden="true">
    <use :xlink:href="`#${icon}`"></use>
  </svg>
</template>
<script>
export default {
  name: 'icon',

  props: {
    icon: {
      type: String,
      default: 'icon-aleft'
    }
  }
}
</script>
