<template>
  <div class="approve-wrapper car-column car-bg-white">
    <app-title title="审批记录">
        <div class="back car-row" slot="left">
          <icon class="car-icon" icon="icon-back"></icon>
        </div>
    </app-title>
    <div class="scroll-content car-column" ref="scroller">
      <div class="list-item" v-for="(item, index) in doneArr" :key="index">
        <div class="car-row">
          <div class="list-left car-column">
            <!-- <p class="item-name">{{item.busDesc}}</p> -->
            <div class="item-info car-row car-t-dgray">
              <span>审批环节：</span>
              <span>{{item.flowNodeName}}</span>
            </div>
            <div class="item-info item-contract car-row car-t-dgray">
              <span>审核人：</span>
              <span>{{item.approUserName}}</span>
            </div>
          </div>
          <div class="list-right">
            <!-- <p class="item-status car-t-dgray">{{item.objName}}</p>
            <div class="item-address car-t-dgray">{{item.flowNodeName}}</div> -->
            <p class="item-status car-t-dgray">{{statusArr[item.flowOperation - 1]}}</p>
            <p class="item-time car-t-dgray" v-show="item.approTime">{{item.approTime | formatDate(true)}}</p>
          </div>
        </div>
        <div>
          <div class="item-info item-option item-contract car-row car-t-dgray" v-show="item.opinion">
            <span class="option">审核建议：</span>
            <span>{{item.opinion}}</span>
          </div>
        </div>
      </div>
      <infinite-scroll slot="infiniteScroll" @load="loadMore" @scrollTop="scrollTop" :isShow="hasData" :scroller="scroller" :loading="loading"></infinite-scroll>
    </div>
  </div>
</template>
<script>
import {AppTitle, Icon, InfiniteScroll} from 'components'
import {queryLoanFlowListByLoanId, isLogined} from '@/api/getData.js'
import { formatDate } from '@/api/dateFormat.js'
const hasNextPageCount = 10
export default {
  name: 'approve-record',

  components: {
    AppTitle, InfiniteScroll, Icon
  },

  data () {
    return {
      scrollTo: 0,
      currentPage: 1,
      loading: true,
      scroller: null,
      canMock: true,
      toTop: 0,
      deactivatedTop: 0,
      doneArr: [],
      statusArr: ['同意', '驳回']
    }
  },

  computed: {
    hasData () {
      return true
    }
  },

  filters: {
    formatDate (time, fmt) {
      return formatDate(time, fmt)
    }
  },

  methods: {
    // 加载更多
    loadMore () {
      if (this.canMock) {
        this.currentPage++
        this._mock()
      }
    },
    scrollTop (scrollTop) {
      this.toTop = scrollTop
    },
    _mock () {
      this.loading = true
      let loanId = this.$route.params.loanId
      isLogined().then(res => {
        if (!res.data.success) {
          this.$router.push('/login')
        } else {
          queryLoanFlowListByLoanId({loanId}).then(res => {
            let success = res.data.success
            let data = res.data.data
            this.loading = false
            if (success) {
              if (data.length > 0) {
                let length = data.length
                if (length < hasNextPageCount) {
                  this.canMock = false
                } else {
                  this.canMock = true
                }
                this.doneArr = this.doneArr.concat(data)
              }
            }
          }).catch(err => {
            this.loading = false
            console.log(err)
          })
        }
      })
    },
    clear () {
      this.currentPage = 1
      this.redeemArr = []
      this.deactivatedTop = 0
    }
  },

  activated () {
    this.$refs.scroller.scrollTop = this.scrollTo
  },

  deactivated () {
    this.scrollTo = this.deactivatedTop
  },
  mounted () {
    this._mock()
    this.scroller = this.$refs.scroller
    let _this = this
    this.$refs.scroller.addEventListener('scroll', function () {
      _this.deactivatedTop = _this.$refs.scroller.scrollTop
    })
  }
}
</script>
<style lang="scss" scoped>
@import "../../common/scss/mixin.scss";
.approve-wrapper {
  height: 100vh;
}
.scroll-content {
  width: 100vw;
  flex-grow: 1;
  overflow: hidden;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
.list-item {
  flex-grow: 0;
  flex-shrink: 0;
  padding: px2rem(26) px2rem(20);
  border-bottom: 1px solid #EFEFEF;
  &:last-child {
    border: 0;
  }
}
.list-left {
  width: 60%;
  flex-grow: 0;
  flex-shrink: 0;
  .item-info {
    font-size: px2rem(18);
  }
  .item-contract {
    margin-top: px2rem(16);
  }
}
.item-option {
  .option {
    flex-grow: 0;
    flex-shrink: 0;
  }
}
.list-right {
  flex-grow: 1;
  text-align: right;
  font-size: px2rem(18);
  .item-address {
    margin-top: px2rem(8);
  }
  .item-status {
    // margin: px2rem(10) 0;
    font-size: px2rem(24);
  }
  .item-time {
    margin-top: px2rem(20);
  }
}
</style>
