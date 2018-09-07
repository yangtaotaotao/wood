<template>
  <div class="car-row group">
    <div class="group-left car-t-gray">{{itemTitle}}</div>
    <div class="group-right car-t-dgray">{{itemCon}}</div>
  </div>
</template>
<script>
export default {
  name: 'info-table-group',

  props: {
    itemCon: {
      type: String,
      default: ''
    },
    itemTitle: {
      default: ''
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../common/scss/mixin.scss";
.group {
  padding: px2rem(20) 0;
  align-items: center;
  font-size: px2rem(18);
  border-bottom: 1px solid #EFEFEF;
  .group-left, .group-right {
    padding-left: px2rem(20);
  }
  .group-left {
    border-right: 1px solid #EFEFEF;
    width: px2rem(200);
    padding-left: px2rem(14);
    flex-grow: 0;
    flex-shrink: 0;
  }
  .group-right {
    flex-grow: 1;
  }
}
</style>
