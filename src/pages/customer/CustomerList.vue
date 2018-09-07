<template>
  <div class="customer-wrapper car-column car-bg-white">
    <search-input @handelSearch="handelSearch"></search-input>
    <div class="scroll-content car-column" ref="scroller">
      <customer-list-item v-for="(item, index) in customerArr" :item="item" :key="index" @toDetail="toDetail(item)"></customer-list-item>
      <infinite-scroll slot="infiniteScroll" @load="loadMore" @scrollTop="scrollTop" :isShow="hasData" :scroller="scroller" :loading="loading"></infinite-scroll>
    </div>
  </div>
</template>
<script>
import {SearchInput, InfiniteScroll} from 'components'
import CustomerListItem from './CustomerListItem'

import { queryCustomerList, isLogined } from '@/api/getData.js'
const hasNextPageCount = 10
export default {
  name: 'customer-list',

  components: {
    SearchInput, CustomerListItem, InfiniteScroll
  },

  data () {
    return {
      customerArr: [],
      scrollTo: 0,
      currentPage: 1,
      loading: true,
      scroller: null,
      canMock: true,
      toTop: 0,
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
    toDetail (item) {
      this.$router.push({name: 'customerInfo', params: {customerId: item.id}})
    },
    _mock () {
      this.loading = true
      isLogined().then(res => {
        if (!res.data.success) {
          this.$router.push('/login')
        } else {
          queryCustomerList({
            pageSize: hasNextPageCount,
            pageNum: this.currentPage,
            objName: this.handelValue
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
                this.customerArr = this.customerArr.concat(data.records)
              } else {
                this.$store.dispatch('setToast', {text: '暂无客户信息'})
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
      this.customerArr = []
      // this.deactivatedTop = 0
    }
  },

  activated () {
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
.customer-wrapper {
  height: 100vh;
}
.scroll-content {
  flex-grow: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
</style>
