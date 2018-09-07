<template>
  <div class="approve-wrapper car-column car-bg-white">
    <search-input @handelSearch="handelSearch" placeholderVal="请输入审批描述关键词筛选"></search-input>
    <div class="scroll-content car-column" ref="scroller">
      <done-list-item v-for="(item, index) in doneArr" :item="item" :key="index" @toDetail="toDetail(item)"></done-list-item>
      <infinite-scroll slot="infiniteScroll" @load="loadMore" @scrollTop="scrollTop" :isShow="hasData" :scroller="scroller" :loading="loading"></infinite-scroll>
    </div>
  </div>
</template>
<script>
import {SearchInput, InfiniteScroll} from 'components'
import DoneListItem from './DoneListItem'
import {queryHaveDoneList, isLogined} from '@/api/getData.js'
const hasNextPageCount = 10
export default {
  name: 'query-todo-list',

  components: {
    SearchInput, InfiniteScroll, DoneListItem
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
      // flowFlag = 1 待办  2 已办
      if (item.objCode === 'AUTO_LOAN_FLOW') { // 借款流程
        this.$router.push(`/approve/approveInfo/?objId=${item.flowObjId}&insId=${item.busId}&bbaNodeId=${item.flowMenuId}&flowFlag=2&type=${item.type}&flowListId=${item.id}&objStatus=${item.objName}`)
      } else if (item.objCode === 'AUTO_WOOD_CK_FLOW') { // 赎回
        this.$router.push(`/approve/backInfoSecond/?objId=${item.flowObjId}&insId=${item.busId}&bbaNodeId=${item.flowMenuId}&flowFlag=2&type=${item.type}&flowListId=${item.id}&objStatus=${item.objName}`)
      } else if (item.objCode === 'AUTO_WOOD_ZY_FLOW') { // 置换
        this.$router.push(`/approve/borrowInfo/?objId=${item.flowObjId}&insId=${item.busId}&bbaNodeId=${item.flowMenuId}&flowFlag=2&type=${item.type}&flowListId=${item.id}&objStatus=${item.objName}`)
      } else if (item.objCode === 'AUTO_WOOD_LOAN_FLOW') { // 木业
        this.$router.push(`/approve/lumberInfo/?objId=${item.flowObjId}&insId=${item.busId}&bbaNodeId=${item.flowMenuId}&flowFlag=2&type=${item.type}&flowListId=${item.id}&objStatus=${item.objName}`)
      } else if (item.objCode === 'AUTO_WOOD_BHK_FLOW') { // 不还款出库
        this.$router.push(`/approve/noRepayOut/?objId=${item.flowObjId}&insId=${item.busId}&bbaNodeId=${item.flowMenuId}&flowFlag=2&type=${item.type}&flowListId=${item.id}&objStatus=${item.objName}`)
      }
    },
    _mock () {
      this.loading = true
      isLogined().then(res => {
        if (!res.data.success) {
          this.$router.push('/login')
        } else {
          queryHaveDoneList({
            pageSize: hasNextPageCount,
            pageNum: this.currentPage,
            objName: '',
            busDesc: this.handelValue
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
                this.doneArr = this.doneArr.concat(data.records)
              } else {
                this.$store.dispatch('setToast', {text: '暂无已办任务'})
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
.approve-wrapper {
  height: 100vh;
}
.scroll-content {
  width: 100vw;
  flex-grow: 1;
  overflow: hidden;
  overflow: auto;
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
  flex-grow: 0;
  flex-shrink: 0;
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
