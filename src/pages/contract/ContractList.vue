<template>
  <div class="approve-wrapper car-column car-bg-white">
    <search-input @handelSearch="handelSearch"></search-input>
    <!-- <div class="scroll-content car-column" ref="scroller">
      <div class="approve approve-title car-row car-bg-white" v-if="contractArr.length">
        <span class="contract-num">合同编号</span>
        <span class="customer-name">借款用途</span>
        <span class="start-time">开始时间</span>zz
        <span class="end-time">结束时间</span>
        <span class="loan-price">借款金额</span>
      </div>
      <div class="approve approve-list car-row car-bg-white" v-for="(item, index) in contractArr" :key="index" @click="toDetail(item)">
        <span class="contract-num">{{item.mainCodeMark}}</span>
        <span class="customer-name">{{item.loanUseName}}</span>
        <span class="start-time">{{item.beginTime | formatDate(true)}}</span>
        <span class="end-time">{{item.endTime | formatDate(true)}}</span>
        <span class="loan-price">{{item.loanAmount | numberFormat}}</span>
      </div>
      <infinite-scroll slot="infiniteScroll" @load="loadMore" @scrollTop="scrollTop" :isShow="hasData" :scroller="scroller" :loading="loading"></infinite-scroll>
    </div> -->
    <div class="scroll-content car-column" ref="scroller">
      <contract-list-item v-for="(item, index) in contractArr" :item="item" :key="index" @toDetail="toDetail(item)"></contract-list-item>
      <infinite-scroll slot="infiniteScroll" @load="loadMore" @scrollTop="scrollTop" :isShow="hasData" :scroller="scroller" :loading="loading"></infinite-scroll>
    </div>
  </div>
</template>
<script>
import {SearchInput, InfiniteScroll} from 'components'
import { queryContractList, isLogined } from '@/api/getData.js'
import { formatDate, numberFormat } from '@/api/dateFormat.js'
import ContractListItem from './ContractListItem'
const hasNextPageCount = 10
export default {
  name: 'contract-list',

  components: {
    SearchInput, InfiniteScroll, ContractListItem
  },

  data () {
    return {
      contractArr: [],
      scrollTo: 0,
      currentPage: 1,
      loading: true,
      scroller: null,
      canMock: true,
      deactivatedTop: 0,
      handelValue: null
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
    },
    numberFormat (price) {
      return numberFormat(price, 2)
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
    // 筛选
    handelSearch (value) {
      this.handelValue = value
      this.$refs.scroller.scrollTop = 0
      this.clear()
      this._mock()
    },
    // 详情
    toDetail (item) {
      this.$router.push({name: 'contract', params: {loanId: item.id}})
    },
    _mock () {
      this.loading = true
      isLogined().then(res => {
        if (!res.data.success) {
          this.$router.push('/login')
        } else {
          queryContractList({
            pageSize: 10,
            pageNum: this.currentPage,
            customerName: this.handelValue
          }).then(res => {
            let success = res.data.success
            let data = res.data.data
            this.loading = false
            if (success) {
              if (data.records.length > 0) {
                let length = data.records.length
                if (length < hasNextPageCount) {
                  this.canMock = false
                } else {
                  this.canMock = true
                }
                this.contractArr = this.contractArr.concat(data.records)
              } else {
                this.$store.dispatch('setToast', {text: '暂无合同信息'})
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
      this.contractArr = []
      // this.deactivatedTop = 0
    }
  },

  activated () {
    try {
      this.scroller = this.$refs.scroller
    } catch (err) {
      console.log(err)
    }
    this.$refs.scroller.scrollTop = this.scrollTo
    this.clear()
    this._mock()
  },

  deactivated () {
    this.scrollTo = this.deactivatedTop
  },
  mounted () {
    // this._mock()
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
  overflow-x: auto;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  .approve-list:nth-child(even) {
    span {
      background: #fff!important;
    }
  }
  .approve-list:nth-child(odd) {
    span {
      background: #eef5f9!important;
    }
  }
}
.approve {
  align-items: center;
  font-size: px2rem(18);
  height: px2rem(54);
  flex-shrink: 0;
  flex-grow: 0;
  span {
    display: block;
    height: px2rem(54);
    line-height: px2rem(54);
    padding-left: px2rem(20);
    border-right: 1px solid #efefef;
    flex-grow: 0;
    flex-shrink: 0;
  }
  .product-name {
    width: px2rem(146);
  }
  .contract-num {
    width: px2rem(194);
  }
  .customer-name {
    width: px2rem(256);
  }
  .paper-num, .start-time, .end-time, .approve-link {
    width: px2rem(190);
  }
  .rate-method {
    width: px2rem(200);
  }
  .loan-price {
    width: px2rem(200);
  }
  .approve-link {
    width: px2rem(160);
  }
}
.approve-title {
  color: #2e6f99;
  span {
    border-bottom: 1px solid #2e6f99;
  }
}
</style>
