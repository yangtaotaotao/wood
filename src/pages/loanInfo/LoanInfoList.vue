<template>
  <div class="loanInfo-wrapper car-column car-bg-white">
    <search-input @handelSearch="handelSearch"></search-input>
    <div class="scroll-content car-column" ref="scroller">
      <loan-info-list-item v-for="(item, index) in loanInfoArr" :item="item" :key="index" @toDetail="toDetail(item)"></loan-info-list-item>
      <infinite-scroll slot="infiniteScroll" @load="loadMore" @scrollTop="scrollTop" :isShow="hasData" :scroller="scroller" :loading="loading"></infinite-scroll>
    </div>
  </div>
</template>
<script>
import {SearchInput, InfiniteScroll} from 'components'
import LoanInfoListItem from './LoanInfoListItem'

import { loanQueryList, isLogined } from '@/api/getData.js'

const hasNextPageCount = 10
export default {
  name: 'loan-info-list',

  components: {
    SearchInput, LoanInfoListItem, InfiniteScroll
  },

  data () {
    return {
      loanInfoArr: [],
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
      this.$router.push({name: 'loanInfo', params: {loanId: item.id}})
    },
    _mock () {
      this.loading = true
      isLogined().then(res => {
        if (!res.data.success) {
          this.$router.push('/login')
        } else {
          loanQueryList({
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
                this.loanInfoArr = this.loanInfoArr.concat(data.records)
              } else {
                this.$store.dispatch('setToast', {text: '暂无借款信息'})
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
      this.loanInfoArr = []
      // this.deactivatedTop = 0
    }
  },

  activated () {
    try {
      this.scroller = this.$refs.scroller
      // let _this = this
      // this.$refs.scroller.addEventListener('scroll', function () {
      //   _this.deactivatedTop = _this.$refs.scroller.scrollTop
      // })
    } catch (err) {
      console.log(err)
    }
    this.$refs.scroller.scrollTop = this.scrollTo
    this.clear()
    this._mock()
  },

  deactivated () {
    // this.scrollTo = this.deactivatedTop
    this.scrollTo = this.$refs.scroller.scrollTop
  },
  mounted () {
    // this._mock()
    // this.scroller = this.$refs.scroller
    // let _this = this
    // this.$refs.scroller.addEventListener('scroll', function () {
    //   _this.deactivatedTop = _this.$refs.scroller.scrollTop
    // })
  }
}
</script>
<style lang="scss" scoped>
@import "../../common/scss/mixin.scss";
.loanInfo-wrapper {
  height: 100vh;
}
.scroll-content {
  flex-grow: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  .list-item:last-child {
    border: 0!important;
  }
}
</style>
