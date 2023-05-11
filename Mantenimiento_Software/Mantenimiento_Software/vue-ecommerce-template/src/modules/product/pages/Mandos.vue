<template>
    <main class="main">
      <div class="container">
        <div class="page">
          <div class="page__content">
            <ul class="breadcrumb">
              <li class="breadcrumb__item breadcrumb__item--hide">
                <a href="" class="breadcrumb__link"
                  ><span class="breadcrumb__span">Inicio</span></a
                >
              </li>
              <li class="breadcrumb__item">
                <a href="" class="breadcrumb__link"
                  ><span class="breadcrumb__span">Mandos</span></a
                >
              </li>
            </ul>
            <ul class="breadcrumb">
              <div class="search">
              <input
                type="text"
                class="search__input"
                v-model="searchText"
                placeholder="Buscar producto..."
              />
            </div>
            </ul>
            <div class="products">
              <router-link
                :to="{ name: 'Product', params: { id: item.id } }"
                v-for="(item) in filteredProducts"
                :key="item.id"
                class="products__item"
              >
                <div class="card">
                  <div class="card__image">
                    <img
                      :src="require(`@/assets/img/slider/${item.id}.jpg`)"
                      alt=""
                      class="card__img"
                    />
                  </div>
                  <div class="card__title">{{ item.name }}</div>
                  <div class="card__price">
                    <span class="card__total-price">{{
                      formattedPrice(item.price)
                    }}</span>
                  </div>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </main>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        products: [],
        selectedFilters: [],
        isBrandOpen: true,
        searchText: "",
      };
    },
    methods: {
      async fetchProducts() {
        try {
          const response = await axios.get(
            "https://gist.githubusercontent.com/kjoel2001/0ac12e02b951ab154eb0e8499ff4e9c1/raw/cd0b2a946b648ccc0f81f86bb05539f0980aa06c/products.json"
          );
          this.products = response.data.filter((item) => item.type =="mando");
        } catch (error) {
          console.error(error);
        }
      },
      formattedPrice(price) {
        return `$${price.toFixed(2)}`;
      },
    },
    computed: {
      filteredProducts() {
        return this.products.filter((product) => {
          return product.name
            .toLowerCase()
            .includes(this.searchText.toLowerCase());
        });
      },
    },
    created() {
      this.fetchProducts();
    },
  };
  </script>
  <style scoped>
  .page {
    justify-content: center;
  }
  </style>