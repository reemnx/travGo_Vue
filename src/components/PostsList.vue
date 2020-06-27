<template>
  <div>
        <post-creation> </post-creation>
    <div class="posts-container" >
      <post-preview :post="post" v-for="post in posts" :key="post._id"></post-preview>
    </div>
  </div>
</template>

<script>
import PostPreview from '../components/PostPreview'
import postCreation from "../components/postCreation"


export default {
  name: "posts-list",
  props: ["posts"],
  components:{
      PostPreview,
      postCreation

  }
};
</script>

<style lang="scss">
.posts-container{
    margin-top: 120px;
    padding-bottom: 40px;
}
</style>