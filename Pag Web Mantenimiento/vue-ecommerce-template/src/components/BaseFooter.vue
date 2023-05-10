<template>
  <footer class="footer">
    <span class="scroll__top" @click="goTop" v-show="showScrollTop"></span>
    <div class="footer__top">
      <div class="container">
        <div class="footer__row">
          <div class="footer__getcall">
            <img src="img/tamasbama.png" alt="" />
            <div class="footer__getcall-info">
              <h3 class="footer__getcall-h3">Contactanos</h3>
              <span class="gooter__getcall-span">alguna pregunta? preguntanos!</span>
            </div>
          </div>
          <div class="footer__info">
            <span class="footer__info-span">Email : atencionalcliente1@gmail.com.pe</span>
            <span class="footer__info-span margin--right-10">
              Tel :  960984854</span
            >
          </div>
        </div>
      </div>
    </div>
    <div class="footer__main">
      <div class="container">
        <div class="footer__hr"></div>
        <div class="footer__about">
          <p class="footer__txt">

          </p>
        </div>
      </div>
      <div class="footer__team">
        diseñado por 
        <a href="" class="footer__copy">Kevin &amp; </a>
        2023
      </div>
    </div>
    <div class="overlay" :class="{ 'overlay--is-active': showSideBar }"></div>
  </footer>
</template>

<script>
export default {
  name: 'BaseFooter',

  props: {
    showSideBar: {
      type: Boolean,
      required: true
    }
  },

  data: () => ({
    showScrollTop: false,
    scrollTimeout: null
  }),

  methods: {
    handleScroll() {
      if (this.scrollTimeout) return

      console.log('user scrolled')

      this.scrollTimeout = setTimeout(() => {
        this.showScrollTop = window.scrollY > 200

        clearTimeout(this.scrollTimeout)
        this.scrollTimeout = 0
      }, 150)
    },
    goTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  },

  mounted() {
    document.addEventListener('scroll', this.handleScroll)
  },

  unmounted() {
    document.removeEventListener('scroll', this.handleScroll)
  }
}
</script>

<style></style>
