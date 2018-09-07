<template>
  <div class="pick-manage-box clear-float">
    <div class="manage-item" v-for="(item, index) in selectManages" :key="index">
      <div class="delete-icon" v-if="removeButton">
        <div class="row main-center" @click="remove(item.id)">
          <svg class="icon back" aria-hidden="true">
            <use xlink:href="#icon-cha1"></use>
          </svg>
        </div>
      </div>
      <div class="join-manage bg-gray" :class="isPay && 't-blue'">{{item.name}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'manage-pick',

  props: {
    /**
     * 选项列表
     * @type {Object}
     */
    selectManages: {
      default () {
        return []
      }
    },
    /**
     * 控制颜色
     * @type {Object}
     */
    isPay: {
      type: Boolean
    },
    /**
     * 是否显示删除按钮
     * @type {Object}
     */
    removeButton: {
      type: Boolean
    }
  },

  methods: {
    remove (id) {
      this.$emit('remove', id)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../common/scss/base.scss";
@import "../common/scss/mixin.scss";
.pick-manage-box {
  padding: .5em;
  background: #fff;
  display: flex;
  flex-flow: row wrap;
  .manage-item {
    position: relative;
    height: 2em;
    line-height: 2em;
    margin-top: .5em;
    margin-bottom: .5em;
    margin-right: .3em;
    border-radius: 4px;
    text-align: center;
    box-sizing: border-box;
    font-size: 14px;
    float: left;
  }
  .delete-icon {
    position: absolute;
    top: -30%;
    right: 0;
    border-radius: 50%;
    width: .9rem;
    height: .9rem;
    z-index: 2;
    div {
      height: 100%;
      width: 100%;
    }
  }
  .join-manage{
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    height: 2em;
    margin-right: 5px;
    border-radius: 5px;
    padding: 0 5px;
  }
}
</style>
