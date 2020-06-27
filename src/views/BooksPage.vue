<template>
  <div class="books-container">
    <div class="book" v-for="book in books" :key="book._id">
      <h2>{{book.title}}</h2>
      <p>{{book.score}}</p>
      <p>{{book.isRead}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "books-page",
  computed: {
    books() {
      return this.$store.getters.books;
    }
  },
  async created() {
    await this.$store.dispatch({ type: "loadBooks" });
  }
};
</script>