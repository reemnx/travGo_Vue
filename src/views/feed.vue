<template>
  <div class="feed-content-container flex column align-center">
      <posts-list :posts="posts"> </posts-list>
  </div>
</template>

<script>
import PostsList from '../components/PostsList'

export default {
  name: "feed",
  async created() {
    await this.$store.dispatch({ type: "loadPosts" });
  },
  computed: {
    posts() {
     return this.$store.getters.posts;
    }
  },
  components:{
    PostsList
  }
};
</script>

<style lang="scss">
.post{
  width: fit-content;
}
</style>