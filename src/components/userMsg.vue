<template>
  <div class="user-msg flex align-center justify-center">
    <h3>{{msg}}</h3>
  </div>
</template>

<script>
export default {
  name: "user-msg",
  props: ["msg"]
};
</script>

<style lang="scss">
.user-msg {
  position: fixed;
  z-index: 10;
  left: 80px;
  bottom: 0px;
  background-color: rgb(255, 255, 255);
  border-radius: 5px;
  padding: 5px;
  box-shadow: 0px 1px 5px -1px rgb(0, 0, 0);
  color: black;
  -webkit-animation: slide-top 3s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
	        animation: slide-top 3s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}
@keyframes slide-top {
  0% {
    -webkit-transform: translateY(50px);
            transform: translateY(50px);
  }
  25% {
    -webkit-transform: translateY(-40px);
            transform: translateY(-40px);
  }
  90%{
       -webkit-transform: translateY(-40px);
            transform: translateY(-40px);
  }
  100%{
      -webkit-transform: translateY(50px);
            transform: translateY(50px);
  }

}
</style>