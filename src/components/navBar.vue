<template>
  <nav class="flex align-center justify-center">
    <div>
      <input @input="onSearch" type="text" placeholder="Filter by #Location" v-model="searchKey" />
    </div>
  </nav>
</template>

<script>
export default {
  name: "nav-bar",
  data(){
    return{
      searchKey: null
    }
  },
  methods:{
    onSearch(){
      let filterBy = this.searchKey
      this.$store.commit({ type: 'setFilterBy', filterBy })
      
    }
  }
};
</script>

<style lang="scss">
nav {
  width: 100%;
  height: 55px;
  background-color: #2a2a2a;
  z-index: 5;
  position: fixed;
  & input {
    border: 1.3px solid rgb(255, 255, 255);
    padding: 5px;
    border-radius: 5px;
    color: white;
    width: 200px;
    &::placeholder{
      transition: 0.5s ease;
    }
    &:focus{
      border: 1.3px solid rgb(0, 167, 233);
      &::placeholder {
        color: coral;
        padding-left: 50px;
        opacity: 0;
      }
    }
    
  }
}
</style>