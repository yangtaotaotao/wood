export default {
  props: {
    scroller: {}
  },

  mounted () {
    this.$bindScroll()
  },

  methods: {
    $bindScroll () {
      if (!this.scroller) return
      this._handleScroll = e => {
        if (this.onScroll) this.onScroll()
        // console.log(this.scroller.scrollTop)
      }
      this.scroller.addEventListener('scroll', this._handleScroll)
    },
    $unbindScroll (scroller = this.scroller) {
      if (this._handleScroll) scroller.removeEventListener('scroll', this._handleScroll)
    }
  },

  beforeDestroy () {
    this.$unbindScroll()
  },

  watch: {
    scroller (scroller, oldScroller) {
      if (scroller === oldScroller) return
      this.$unbindScroll(oldScroller)
      this.$bindScroll(scroller)
    }
  }
}
