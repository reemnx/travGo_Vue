<template>
  <div class="post-content-container flex column">
    <div class="post-header flex align-center">
      <img class="post-creator-img" :src="post.createdBy.imgUrl" />
      <div class="author-info">
        <h3>{{post.createdBy.userName}}</h3>
        <h5>{{post.createdAt | moment}}</h5>
      </div>
      <div class="post-geo flex column align-center justify-center">
        <h2>
          <span class="hashtag">#</span>
          {{post.location}}
        </h2>
      </div>
    </div>
    <div class="post-desc">
      <p>{{post.desc}}</p>
    </div>
    <v-carousel style="height: 420px"  :show-arrows="false" >
      <v-carousel-item class="carousel-item" v-for="(imgUrl,idx) in post.imgUrls" :key="idx" :src="imgUrl" />
      <!-- :style="{ backgroundImage: 'url(' + imgUrl + ')' }"></v-carousel-item -->
    </v-carousel>
    <div class="post-engagers flex column justify-center">
      <div style="margin-bottom: 10px ; padding: 5px" class="flex align-center space-between">
        <div class="post-likes flex align-center">
          <img src="../style/img/mission.png" />
          <h4>{{post.likes.length}} Hikes</h4>
        </div>
        <h4 class="comments" @click="onComments">{{post.comments.length}} Comments</h4>
      </div>
      <div class="post-engagers-actions flex align-center justify-center">
          <button :style=" isPostLiked ? 'color: blue;' : 'color: black;' " @click="onHike">{{isPostLiked? 'Hiked!' : 'Hike'}}</button>
        <button @click="onComment">Comment</button>
      </div>
      <form v-on:submit.prevent="onSubmit">
        <input
          type="text"
          placeholder="Share your thoughts ..."
          ref="commentInput"
          name="commentInput"
          v-if="isAddCommentShown"
          v-model="commentData"
        />
      </form>
      <div class="comments-container" v-if="isCommentsShown">
        <div
          class="post-comment flex align-center"
          v-for="(comment,idx) in post.comments"
          :key="idx"
        >
          <img :src="comment.userImg" />
          <p>{{comment.content}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "post-preview",
  data() {
    return {
      isAddCommentShown: false,
      isCommentsShown: false,
      commentData: "",
      isPostLiked: false,
      userLikeIdx: null
    };
  },
  created(){
    let currUserName = this.currUser.userName
    let userLikeIdx = this.post.likes.findIndex(like => like.userName.toLowerCase() === currUserName.toLowerCase())
    this.userLikeIdx = userLikeIdx
    if(userLikeIdx != -1) this.isPostLiked = true
    else this.isPostLiked = false  
  },
  updated() {
    if (this.isAddCommentShown) {
      this.$refs.commentInput.focus();
    }
  },
  computed: {
    currUser() {
      return this.$store.getters.getCurrUser;
    }
  },
  props: ["post"],
  filters: {
    moment(dateNow) {
      return moment(dateNow).fromNow();
    }
  },
  methods: {
    onComment() {
      this.isAddCommentShown = !this.isAddCommentShown;
      
    },
    onComments() {
      this.isCommentsShown = !this.isCommentsShown;
    },
    onSubmit(ev) {
      let currUser = this.$store.getters.getCurrUser;
      let data = {
        createdBy: currUser.userName,
        userImg: currUser.imgUrl,
        content: this.commentData
      };
      this.post.comments.unshift(data);
      let updatedPost = this.post;
      this.$store.dispatch({ type: "savePost", updatedPost });
      this.commentData = "";
      this.onComment();
      // this.onComments();
    },
    onHike(){
        if(this.isPostLiked){
            this.post.likes.splice(this.userLikeIdx , 1)
            let updatedPost = this.post;
            this.$store.dispatch({ type: "savePost", updatedPost });
            this.isPostLiked = false;
        }
        else {
            let currUserName = this.currUser.userName
            this.post.likes.push({userName: currUserName})
            let updatedPost = this.post;
            this.$store.dispatch({ type: "savePost", updatedPost });
            this.isPostLiked = true;
        }
    }
  },
  components:{
  }
};
</script>

<style lang="scss">
.post-content-container {
  color: black;
  width: 700px;
  margin-bottom: 30px;
  background-color: rgb(255, 255, 255);
  border-radius: 5px;
  box-shadow: 0px 3px 5px -2px rgba(0, 0, 0, 0.75);
  border-top: 1.6px solid coral;
  .post-header {
    position: relative;
    width: 100%;
    height: 60px;
    padding: 5px 10px;
    // background-color: cornflowerblue;
  }
  .post-desc {
    padding: 10px 15px;
    overflow-y: scroll;
    max-height: 120px;
    background-color: rgb(51, 51, 51);
    color: rgb(255, 255, 255);
  }
  .carousel-img {
    object-fit: cover;
  }
  .post-creator-img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    // border: 2px solid rgb(0, 0, 0);
  }
  .author-info {
    margin-left: 10px;
    & h5 {
      color: rgb(160, 160, 160);
    }
  }
  .post-geo {
    position: absolute;
    z-index: 1;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    margin: auto auto;
    width: fit-content;
    height: 100%;
    .hashtag {
      color: coral !important;
    }
  }
  .post-engagers {
    width: 100%;
    background-color: white;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    padding: 5px 15px;
    .post-likes {
      & img {
        width: 20px;
        height: 20px;
        margin-right: 10px;
      }
    }
  }
  .post-engagers-actions {
    border-top: 1.2px solid rgba(150, 150, 150, 0.514);
    padding: 5px 0px;
    & button:first-of-type {
      margin-right: 20px;
      width: 45px;
    }
    & img {
        width: 15px;
    }
  }
  .post-comment {
    margin-bottom: 10px;
    & img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      margin-right: 15px;
    }
    & p {
      color: rgb(56, 56, 56);
      background-color: #d7dfeb;
      padding: 5px;
      border-radius: 5px;
      font-size: 14px;
    }
  }
  & input {
    margin-bottom: 20px;
  }
  .comments {
    &:hover {
      cursor: pointer;
    }
  }
  // .carousel-item{
  //   background-position: center !important;
  //   background-size: 100% !important;
  //   background-repeat: no-repeat !important;
  //   object-fit:fill !important;
  //   display: none;
  // }
}
</style>