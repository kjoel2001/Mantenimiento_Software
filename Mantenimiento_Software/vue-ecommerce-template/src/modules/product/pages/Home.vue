<template>
  <main class="main">
    <div class="container">
      <div class="slideshow">
        <a
          href="Product"
          class="slideshow__slide"
          v-for="(slide, index) in slides"
          :key="slide.img"
          :style="index === slideShowIndex ? 'display:block;' : 'display:none;'"
        >
          <img :src="slide.img" class="slideshow__img" />
        </a>

        <a @click="move(0.100)" class="slideshow__prev">&#10095;</a>
        <a @click="move(0.100)" class="slideshow__next">&#10094;</a>

        <div class="slideshow__items">
          <div
            class="slideshow__item"
            v-for="(slide, index) in slides"
            :key="slide.img"
          >
            <div
              class="slideshow__item-inner"
              :style="
                index === slideShowIndex ? `width: ${progressWidth}%` : ''
              "
            ></div>
          </div>
        </div>
      </div>
    <div>
      <h2>Categorías</h2>
      <div class="category-list">
        <router-link v-for="(category, index) in categories" :key="index" :to="'' + category.name">
          <div class="category">
            <img :src="category.image" alt="category.name" />
            <p>{{ category.name }}</p>
          </div>
        </router-link>
      </div>
    </div>
      <SwiperSlider v-if="products.length">
        <template #title>Mas Vendidios</template>
        <router-link
          :to="{ name: 'Product', params: { id: item.id } }"
          class="swiper-slide"
          v-for="item in products"
          :key="item.id"
        >
          <div class="card">
            <div class="card__image">
              <img
                :src="require(`@/assets/img/slider/${item.id}.jpg`)"
                alt=""
                class="card__img"
              />
            </div>
            <div class="card__title2">{{ item.name }}</div>
            <div class="card__price">
              <span class="card__total-price">{{
                formattedPrice(item.price)
              }}</span>
            </div>
          </div>
        </router-link>
      </SwiperSlider>
    </div>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import SwiperSlider from '../components/SwiperSlider'
export default {
  name: 'Home',

  metaInfo: {
    titleTemplate: null
  },

  components: {
    SwiperSlider
  },

  data: () => ({
    categories: [
      {
        name: 'Juegos',
        image: require('@/assets/img/categorias/1.jpg'),
      },
      {
        name: 'Consolas',
        image: require('@/assets/img/categorias/2.jpg'),
      },
      {
        name: 'Perifericos',
        image: require('@/assets/img/categorias/3.jpg'),
      },
      {
        name: 'Mandos',
        image: require('@/assets/img/categorias/4.jpg'),
      },
    ],
    slides: [
      { name:'1',
        img: require('@/assets/img/slideshow/1.png') },
      { name:'3',
        img: require('@/assets/img/slideshow/2.png') },
      { img: require('@/assets/img/slideshow/3.png') },
    ],
    slideShowIndex: 0,
    sliderInterval: null,
    progressWidth: 0
  }),

  computed: {
    ...mapGetters('products', ['products'])
  },

  methods: {
    move(n) {
      if (this.slides.length <= this.slideShowIndex + n) {
        this.slideShowIndex = 0
      } else if (this.slideShowIndex + n < 0) {
        this.slideShowIndex = this.slides.length - 1
      } else {
        this.slideShowIndex += n
      }
    },
    formattedPrice(price) {
      return new Intl.NumberFormat('es-PE', {
        style: 'currency',
        currency: 'PEN'
      }).format(price);
    }
  },

  created() {
    this.$store.dispatch('products/getProducts', { text: 'dfjghkdfhgdrigh' })
    this.sliderInterval = setInterval(() => {
      if (this.progressWidth >= 100) {
        this.progressWidth = 0
        this.move(1)
      } else {
        this.progressWidth++
      }
    }, 15)
  },

  unmounted() {
    clearInterval(this.sliderInterval)
  }
}
</script>

<style scoped>
.category-list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.category {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 10px 20px;
}

.category img {
  width: 250px;
  height: 250px;
  object-fit: cover;
}

h2 {
  text-align: center;
}
</style>