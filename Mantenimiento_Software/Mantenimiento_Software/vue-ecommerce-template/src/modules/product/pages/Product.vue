<template>
  <div>
    <div id="modal__gallery" class="modal" v-show="isShowingModal">
      <div class="modal__content">
        <span class="modal__close" @click="closeModal">&times;</span>
        <div class="modal__body" tabindex="0" @focusout="closeModal">
          <img :src="modalImage" class="show__gallery" />
        </div>
      </div>
    </div>
    <main class="main">
      <div class="container">
        <ul class="breadcrumb">
          <li class="breadcrumb__item breadcrumb__item--hide">
            <a href="" class="breadcrumb__link"
              ><span class="breadcrumb__span">inicio</span></a
            >
          </li>
          <li class="breadcrumb__item">
            <a href="" class="breadcrumb__link"
              ><span class="breadcrumb__span">productos</span></a
            >
          </li>
          <li class="breadcrumb__item">
            <a href="" class="breadcrumb__link"
              ><span class="breadcrumb__span"
                >{{ product?.name }}</span
              ></a
            >
          </li>
        </ul>
        <div class="product">
          <div class="product__header">
            <div class="product__row">
          <img
            :src="require(`@/assets/img/slider/${product?.id}.jpg`)"
            alt=""
            class="card__img"
          />
              <div class="product__left">
                <div class="product__category">Categoria juegos</div>
                <div class="product__info">
                  <h1 class="product__title">{{ product?.name }}</h1>
                  <div class="rating">
                    <div class="rating__star">
                      <span
                        class="rating__rate"
                        :data-title="rate.title"
                        v-for="rate in ratings"
                        :key="rate.title"
                        @click="rateWidth = rate.width"
                        @mouseover="handleMouseover"
                        @mouseleave="handleMouseleave"
                      ></span>
                    </div>
                    <div
                      class="rating__fstar"
                      :style="showRate ? `width: ${rateWidth}%` : ''"
                    >
                      <span class="rating__frate"></span>
                      <span class="rating__frate"></span>
                      <span class="rating__frate"></span>
                      <span class="rating__frate"></span>
                      <span class="rating__frate"></span>
                    </div>
                  </div>
                  <div class="rating-star">
                    4.5
                    <span class="rating__num">(65)</span>
                  </div>
                </div>
                <h1 class="product__price">S/{{ product?.price }}</h1>
                <div>
                  <button
                    class="btn btn--boxshadow btn--brand"
                    @click="addItem(product)"
                  >
                    Agregar al carrito
                  </button>
                </div>
                <div class="controls"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import SwiperSlider from '../components/SwiperSlider'
import CompareTab from '../components/CompareTab'
import CommentsTab from '../components/CommentsTab'
import FeaturesTab from '../components/FeaturesTab'
import moment from 'moment'
import '../assets/css/modal.css'

import axios from 'axios'

import { SET_PRODUCTS_MUTATIONS } from '@/modules/product/store/types'
import { mapMutations, mapState, mapActions, mapGetters } from 'vuex'

export default {
  name: 'Product',

  components: {
    SwiperSlider,
    CompareTab,
    CommentsTab,
    FeaturesTab
  },

  data() {
    return {
      diff: null,
      countDownInterval: null,
      gallerySlides: [
        { img: require('@/assets/img/slider/1.jpg') },
        { img: require('@/assets/img/slider/2.jpg') },
        { img: require('@/assets/img/slider/3.jpg') },
        { img: require('@/assets/img/slider/4.jpg') },
        { img: require('@/assets/img/slider/5.jpg') },
        { img: require('@/assets/img/slider/6.jpg') },
        { img: require('@/assets/img/slider/7.jpg') },
        { img: require('@/assets/img/slider/8.jpg') }
      ],
      ratings: [
        { width: 100, title: 'awesome' },
        { width: 80, title: 'good' },
        { width: 60, title: 'normal' },
        { width: 40, title: 'weak' },
        { width: 20, title: 'bad' }
      ],
      slideIndex: 0,
      isShowingModal: false,
      modalImage: null,
      rateWidth: 0,
      showRate: true,
      selectedColor: '',
      colorsOptions: ['red', 'green', 'blue'],
      selectedLang: [],
      langOptions: [
        { name: 'Vue.js', language: 'JavaScript' },
        { name: 'Adonis', language: 'JavaScript' },
        { name: 'Rails', language: 'Ruby' },
        { name: 'Sinatra', language: 'Ruby' },
        { name: 'Laravel', language: 'PHP' },
        { name: 'Phoenix', language: 'Elixir' }
      ],
      slides: [
        { img: require('@/assets/img/slideshow/1.png') },
        { img: require('@/assets/img/slideshow/2.png') },
        { img: require('@/assets/img/slideshow/3.png') },
        { img: require('@/assets/img/slideshow/4.png') }
      ],
      activeTab: 'compare',
      product: {}
    }
  },

  computed: {
    ...mapState('cart', ['items']),
    ...mapGetters('products', ['products'])
  },

  methods: {
    move(n) {
      if (this.gallerySlides.length <= this.slideIndex + n) {
        this.slideIndex = 0
      } else if (this.slideIndex + n < 0) {
        this.slideIndex = this.gallerySlides.length - 1
      } else {
        this.slideIndex += n
      }
    },
    currentSlide(index) {
      this.slideIndex = index
    },
    showModal(image) {
      this.isShowingModal = true
      this.modalImage = image
      document.body.style.overflow = 'hidden'
    },
    closeModal() {
      this.isShowingModal = false
      document.body.style.overflow = 'unset'
    },
    handleMouseover() {
      this.showRate = false
    },
    handleMouseleave() {
      this.showRate = true
    },
    formattedPrice(price) {
  return new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN'
  }).format(price);
},
    ...mapMutations('products', [SET_PRODUCTS_MUTATIONS]),
    ...mapActions('cart', ['addItem'])
  },

  async created() {
    this.countDownInterval = setInterval(() => {
    if (this.dateCountDown) {
      let diffTime = this.dateCountDown.diff(moment())
      let durationTime = moment.duration(diffTime)
      this.diff = `${Math.floor(
        durationTime.asDays()
      )}:${durationTime.hours()}:${durationTime.minutes()}:${durationTime.seconds()}`
    }
  }, 1000)

    this.product = this.$store.getters['products/getProductById'](
      parseInt(this.$route.params.id)
    )

    if (!this.product) {
      const { data } = await axios.get(
        'https://gist.githubusercontent.com/kjoel2001/0ac12e02b951ab154eb0e8499ff4e9c1/raw/cd0b2a946b648ccc0f81f86bb05539f0980aa06c/products.json'
      )

      this.SET_PRODUCTS(data)
      this.product = this.$store.getters['products/getProductById'](
        parseInt(this.$route.params.id)
      )
    }
  },

  unmounted() {
    clearInterval(this.countDownInterval)
  }
}
</script>