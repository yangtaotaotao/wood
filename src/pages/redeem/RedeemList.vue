<template>
  <div class="redeem-wrapper car-column car-bg-white">
    <search-input @handelSearch="handelSearch"></search-input>
    <div class="scroll-content car-column" ref="scroller">
      <redeem-list-item v-for="(item, index) in redeemArr" :item="item" :key="index" @toDetail="toDetail(item)"></redeem-list-item>
      <infinite-scroll slot="infiniteScroll" @load="loadMore" @scrollTop="scrollTop" :isShow="hasData" :scroller="scroller" :loading="loading"></infinite-scroll>
    </div>
  </div>
</template>
<script>
import {SearchInput, InfiniteScroll} from 'components'
import RedeemListItem from './RedeemListItem'

import {queryListWoodGuarantee, isLogined} from '@/api/getData.js'
const hasNextPageCount = 10
export default {
  name: 'redeem-list',

  components: {
    SearchInput, RedeemListItem, InfiniteScroll
  },

  data () {
    return {
      redeemArr: [],
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
    // 赎回详情
    // toDetail (item) {
    //   if (item.status === 2 || item.status === 5) {
    //     this.$router.push({name: 'redeemInfo', params: {id: item.id}})
    //   } else if (item.status === 3 || item.status === 4) {
    //     this.$router.push({name: 'substitutionInfo', params: {id: item.id}})
    //   }
    // },
    toDetail (item) {
      this.$router.push({name: 'redeemInfo', params: {id: item.id}})
    },
    _mock () {
      this.loading = true
      isLogined().then(res => {
        if (!res.data.success) {
          this.$router.push('/login')
        } else {
          queryListWoodGuarantee({
            pageSize: hasNextPageCount,
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
                this.redeemArr = this.redeemArr.concat(data.records)
              } else {
                this.$store.dispatch('setToast', {text: '暂无质押清单'})
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
.redeem-wrapper {
  height: 100vh;
}
.scroll-content {
  flex-grow: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
</style>
