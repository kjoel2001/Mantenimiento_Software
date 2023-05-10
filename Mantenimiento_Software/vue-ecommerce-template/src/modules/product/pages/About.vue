<template><ul class="breadcrumb">
  <div class="search">
  <input
    type="text"
    class="search__input"
    v-model="searchText"
    placeholder="Buscar producto..."
  />
  </div>
</ul>
</template>
<script>
export default {
  data() {
    return {
      products: [],
      selectedFilters: [],
      isBrandOpen: true,
      searchText: "",
    };
  },
};
</script>

