<template>
  <div class="message">
    <div class="content">
      <div class="top_icon">
        <div class="iconcontent">
          <i class="iconfont" :class="icon" style="font-size:0.6rem;color: #fff"></i>
        </div>
      </div>
      <div class="center">
        <slot name="centerCont"></slot>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    props: {
      icon: String
    },
    data() {
      return {

      }
    },
    mounted: function(){
      console.log(this.icon)
    },
    methods: {

      deleteItem: function(index) {
        this.$emit('deleteItem', index);
      }
    }
  }
</script>

<style  scoped="">
  .message{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0,0,0,.5);

  }
  .content{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
   .top_icon{
    z-index: 999;
  }
  .top_icon .iconcontent{
     display: flex;
     justify-content: center;
     align-items: center;
     width: 1.3rem;
     height: 1.3rem;
     border-radius: 50%;
     border: solid 2px #fff;
    background-color: #EC8487;

  }
  .center{
    position: relative;
    top: -0.65rem;
    background-color: #fff;
    padding-top: 0.89rem;
    z-index: 1;
    width: 85vw;
    border-radius: 10px;
    padding-bottom: 0.24rem;
    display: flex;
    justify-content: center;
  }

</style>
