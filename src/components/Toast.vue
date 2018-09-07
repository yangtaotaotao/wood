<template>
  <div class="toast-content car-row car-main-center" v-show="toast.show">
    <div class="toast">
      <p>{{toast.title}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'toast',
  props: {
    toast: {
      type: Object,
      required: false
    }
  }
}
</script>
<style lang="scss" scoped>
.toast-content{
  background: rgba(#000000, 0.8);
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 99;
  height: 3rem;
  line-height: 3rem;
  border-radius: 5px;
  transform: translate3d(-50%, -50%, 0);
  text-align: center;
}
.toast{
  padding-left: 2rem;
  padding-right: 2rem;
  white-space: nowrap;
  p{
    color: #fff;
    font-size: 14px;
  }
}
</style>
