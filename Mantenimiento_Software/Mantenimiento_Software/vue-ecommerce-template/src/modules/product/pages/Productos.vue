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
                  ><span class="breadcrumb__span">Productos</span></a
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
            <ul class="breadcrumb">
              <div
                class="filter"
                style="display: flex; justify-content: space-between;"
              >
                <div class="filter__item">
                  <label for="minPrice">Precio mínimo:</label>
                  <input type="number" id="minPrice" v-model="minPrice" min="0" />
                </div>
                <div class="filter__item">
                  <label for="maxPrice">Precio máximo:</label>
                  <input type="number" id="maxPrice" v-model="maxPrice" min="0" />
                </div>
              </div>
              <div class="filter__item">
  <label for="productType">Tipo de producto:</label>
  <select id="productType" v-model="selectedType" class="filter__select">
    <option value="">Todos</option>
    <option value="juegos">Juegos</option>
    <option value="consolas">Consolas</option>
    <option value="perifericos">Periféricos</option>
    <option value="mandos">Mandos</option>
  </select>
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
      minPrice: null,
      maxPrice: null,
      selectedType: "",
      
    };
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await axios.get(
          "https://gist.githubusercontent.com/kjoel2001/0ac12e02b951ab154eb0e8499ff4e9c1/raw/cd0b2a946b648ccc0f81f86bb05539f0980aa06c/products.json"
        );
        this.products = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    formattedPrice(price) {
      return `$${price.toFixed(2)}`;
    },
    filterByPrice(product) {
      if (this.minPrice && product.price < this.minPrice) {
        return false;
      }
      if (this.maxPrice && product.price > this.maxPrice) {
        return false;
      }
      return true;
    },
    filterByType(product) {
      if (this.selectedType === "") {
        return true;
      }
      return product.type === this.selectedType;
    },
  },
  computed: {
    filteredProducts() {
    return this.products.filter((product) => {
      return (
        product.name.toLowerCase().includes(this.searchText.toLowerCase()) &&
        this.filterByPrice(product) &&
        this.filterByType(product)
      );
    });
  },
    productTypes() {
      const types = new Set();
      this.products.forEach((product) => types.add(product.type));
      return Array.from(types);
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
  .filter__select {
  width: 200px;
  padding: 5px;
}

  </style>