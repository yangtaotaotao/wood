<template>
  <div class="info-wrapper car-column">
    <div class="info-top car-column">
      <app-title title="修改密码">
        <div class="back car-row" slot="left">
          <icon class="car-icon" icon="icon-back"></icon>
        </div>
      </app-title>
    </div>
    <div class="info-content car-bg-white">
      <div class="password car-row">
        <label for="ori-password">原密码</label>
        <input type="password" name="" id="org-password" v-model="orgPsd" @blur="verifyVal(orgPsd)">
        <span class="car-t-red">*</span>
      </div>
      <div class="password car-row">
        <label for="ori-password">新密码</label>
        <input type="password" name="" id="new-password" v-model="newPsd" @blur="verifyVal(newPsd)">
        <span class="car-t-red">*</span>
      </div>
      <div class="password car-row">
        <label for="ori-password">确认新密码</label>
        <input type="password" name="" id="cfm-password" v-model="cfmPsd" @blur="verifyVal(cfmPsd)">
        <span class="car-t-red">*</span>
      </div>
    </div>
    <div class="info-footer car-row">
      <div class="confirm car-row car-main-center car-bg-blue car-t-white" @click="confirmPrice">确定</div>
      <div class="cancle car-row car-main-center car-t-blue" @click="goBack">取消</div>
    </div>
  </div>
</template>
<script>
import {AppTitle, Icon} from 'components'
import { isLogined, updatePass } from '@/api/getData.js'
export default {
  name: 'user-info',

  components: {
    AppTitle, Icon
  },

  data () {
    return {
      orgPsd: '',
      newPsd: '',
      cfmPsd: ''
    }
  },

  computed: {
  },

  methods: {
    // 返回
    goBack () {
      this.$router.back()
    },
    verifyVal (val) {
      if (!val) {
        this.$store.dispatch('setToast', {text: '请输入有效密码'})
      }
    },
    confirmPrice () {
      isLogined().then(res => {
        if (!res.data.success) {
          this.$router.push('/login')
        } else {
          updatePass({
            userId: localStorage.getItem('userId'),
            newPass: this.newPsd,
            oldPass: this.orgPsd
          }).then(res => {
            if (res.data.success) {
              this.$store.dispatch('setToast', {text: res.data.msg})
            } else {
              this.$store.dispatch('setToast', {text: res.data.msg})
            }
          })
        }
      })
    }
  },

  mounted () {
  }
}
</script>
<style lang="scss" scoped>
@import "../../common/scss/base.scss";
@import "../../common/scss/mixin.scss";
.info-wrapper {
  height: 100%;
  background: #eeeeee;
}
.info-top {
  flex-grow: 0;
  flex-shrink: 0;
}
.info-content {
  flex-grow: 1;
  padding: px2rem(30);
  .password {
    align-items: center;
    font-size: px2rem(30);
    margin-bottom: px2rem(30);
    label {
      width: px2rem(160);
      text-align: right;
    }
    input {
      width: 60%;
      height: px2rem(60);
      border: 1px solid #d8d8d8;
      margin: 0 px2rem(20);
      text-indent: px2rem(20);
    }
  }
}
.info-footer {
  width: 100%;
  height: px2rem(82);
  font-size: px2rem(24);
  background: #EEF5F9;
  flex-grow: 0;
  flex-shrink: 0;
  div {
    flex-grow: 1;
  }
}
input::-webkit-input-placeholder {
  // WebKit browsers
  color: #999 !important;
}
input:-moz-placeholder {
  // Mozilla Firefox 4 to 18
  color: #999 !important;
}
input::-moz-placeholder {
  // Mozilla Firefox 19+/
  color: #999 !important;
}
input:-ms-input-placeholder {
  // Internet Explorer 10+/
  color: #999 !important;
}
</style>
