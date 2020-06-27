<template>
  <div class="post-creation-container flex column">
    <div class="flex align-center">
      <img :src="currUser.imgUrl" />
      <p
        :style="isCreatePostActive? 'backgroundColor: #ffbcbc;' : 'backgroundColor: #DFDFDF;'"
        @click="onCreatePost"
      >{{isCreatePostActive ? 'Cancel post creation' : `Whats on your mind, ${currUser.userName}?`}}</p>
    </div>
    <div v-if="isCreatePostActive" class="post-creation flex column">
      <div v-if="countriesToShow.length" class="countries-suggestions-container flex column justify-center">
        <div @click="onCountryChose(country.name)" class="country-wrapper flex align-center" v-for="(country,idx) in countriesToShow" :key="idx">
          <img :src="country.flag" />
          <h5>{{country.name}}</h5>
        </div>
      </div>
      <!-- <form v-on:submit.prevent="onPublish"> -->
      <input
        @input="onLocation"
        v-model="postLocation"
        type="search"
        placeholder="Enter adventure #location"
        id="country"
        autocomplete="off"
        required
      />
      <textarea v-model="postContent" placeholder="Tell us about your journy" required></textarea>
      <label class="flex align-center">
        <h3>Add images</h3>
        <img src="../style/img/image.png" />
        <input
          @input="onImages"
          class="images"
          type="file"
          accept="image/*"
          multiple
          required
          hidden
        />
      </label>
      <img v-if="isLoaderShown" src="../style/img/loader.gif" />
      <div v-if="postPreviewImages.length > 1" class="preview-imgs-container flex">
        <img class="preview-img" v-for="(imgUrl,idx) in postPreviewImages" :key="idx" :src="imgUrl" />
      </div>
      <button @click="onPublish">Publish</button>
      <!-- </form> -->
    </div>
    <user-msg v-if="userMsgContent" :msg="userMsgContent"> </user-msg>
  </div>
</template>

<script>
import { uploadImg } from "../services/cloudinaryService";
import countries from '../services/countries.json'
import userMsg from '../components/userMsg'

export default {
  name: "post-creation",
  data() {
    return {
      isCreatePostActive: false,
      postLocation: null,
      postContent: null,
      postPreviewImages: [],
      isLoaderShown: false,
      countriesToShow: [],
      userMsgContent: ''
    };
  },
  computed: {
    currUser() {
      return this.$store.getters.getCurrUser;
    }
  },
  methods: {
    onCreatePost() {
      this.isCreatePostActive = !this.isCreatePostActive;
      console.log(this.isCreatePostActive);
    },
    onPublish() {
      let countryIdx = countries.findIndex(country => country.name === this.postLocation)
      if(countryIdx === -1){
        console.log('Country not in the list');
        this.showUserMsg('Ops: Country Invalid')
        return
      }
      const updatedPost = {
        location: this.postLocation,
        desc: this.postContent,
        createdBy: {
          userName: this.currUser.userName,
          imgUrl: this.currUser.imgUrl
        },
        imgUrls: this.postPreviewImages,
        createdAt: Date.now(),
        likes: [],
        comments: []
      };
      this.$store.dispatch({ type: "savePost", updatedPost });
      this.postLocation = null;
      this.postContent = null;
      this.postPreviewImages = [];
      this.isCreatePostActive = false;
      showUserMsg('Post published successfully!')
    },
    showUserMsg(msg){
      this.userMsgContent = msg
      setTimeout(() => {
        this.userMsgContent = ''
      }, 3000);
    },
    onImages(ev) {
      this.isLoaderShown = true;
      let previewImages = [];
      uploadImg(ev).then(res => {
        res.map(img => {
          previewImages.push(img.url);
        });
        this.postPreviewImages = previewImages;
        this.isLoaderShown = false;
      });
    },
    onLocation(){
      let key = this.postLocation
      // let countriesToShow = []
      if(this.postLocation === ''){
        this.countriesToShow = []
        return
      }
      const countriesToShow = countries.filter(country => {
        return(country.name.toLowerCase().includes(key.toLowerCase()))
      })
      this.countriesToShow = countriesToShow
      console.log(this.countriesToShow);
      
    },
    onCountryChose(country){
    this.postLocation = country
    this.countriesToShow = []
    }
  },
  components:{
    userMsg
  }
};
</script>

<style lang="scss">
.post-creation-container {
  position: relative;
  padding: 5px 15px;
  position: fixed;
  z-index: 10;
  width: 380px;
  background-color: rgb(241, 241, 241);
  min-height: 50px;
  margin: 60px 0px 15px 0px;
  box-shadow: 0px 1px 5px -1px rgba(0, 0, 0, 0.75);
  border-radius: 5px;
  & img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 15px;
  }
  & p {
    width: 300px;
    background-color: rgb(223, 223, 223);
    padding: 5px;
    border-radius: 5px;
    color: black;
    &:hover {
      cursor: pointer;
    }
  }
  .post-creation {
    margin: 10px 0px 5px 55px;
    & textarea {
      width: 300px;
      background-color: lightgray;
      padding: 5px;
      border-radius: 5px;
      margin-bottom: 10px;
    }
    & input {
      margin-bottom: 10px;
      width: 300px;
      border: 1.3px solid lightgray;
      border-radius: 5px;
      padding: 3px;
    }
    & button {
      background-color: rgb(3, 191, 216);
      width: 60px;
      padding: 3px;
      border-radius: 3px;
      margin: 10px auto 0px;
    }
    .images {
      color: black;
    }
  }
  .preview-img {
    width: 90px;
    height: 90px;
    border-radius: 5px;
    border: 1.3px solid coral;
    max-width: 310px;
    flex-wrap: wrap;
    margin-bottom: 5px;
  }
  label {
    color: black;
    margin: 10px 0px;
    &:hover {
      cursor: pointer;
    }
    & img {
      width: 30px;
      height: 30px;
      border-radius: 0px;
      margin-left: 10px;
    }
  }
  .preview-imgs-container {
    width: 345px;
    display: flex;
    flex-wrap: wrap;
    max-width: none;
  }
  .countries-suggestions-container{
    color: black;
    position: absolute;
    z-index: 2;
    top: 90px; 
    width: 300px;
    min-height: 50px;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.507);
    padding: 10px;
    max-height: 350px;
    overflow-y: auto;
    & img{
      width: 30px;
      height: 30px;
    }
  }
  .country-wrapper{
    margin-bottom: 5px;
    padding: 2px ;
    &:hover{
      background-color: rgba(182, 182, 182, 0.288);
      cursor: pointer;
    }
  }
}
</style>