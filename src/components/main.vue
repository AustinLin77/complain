<template>
  <yd-layout>

    <router-view ></router-view>

    <yd-tabbar slot="tabbar" color="#888" active-color="#0FA0FA" style="border-top: solid 1px #eee">

      <yd-tabbar-item title="我的投诉" link="mycomplain" :active="active=='mycomplain'">
        <!--<yd-icon name="home" slot="icon" size="0.54rem"></yd-icon>-->
        <i  slot="icon" class="iconfont icon-tousu"  style="font-size:0.54rem"></i>
      </yd-tabbar-item>
      <yd-tabbar-item title="添加投诉" link="addcomplain" :active="active=='addcomplain'" >
        <!--<yd-icon name="location" slot="icon" size="0.54rem"></yd-icon>-->
        <i  slot="icon" class="iconfont icon-add"  style="font-size:0.54rem"></i>
      </yd-tabbar-item>
      <!--<yd-tabbar-item title="我的处理" link="mysalve"  :active="active=='mysalve'">-->
        <!--&lt;!&ndash;<yd-icon name="ucenter" slot="icon" size="0.54rem"></yd-icon>&ndash;&gt;-->
        <!--<i  slot="icon" class="iconfont icon-pichuli"  style="font-size:0.54rem"></i>-->

      <!--</yd-tabbar-item>-->
    </yd-tabbar>

  </yd-layout>
</template>

<script>
export default {

  data () {
    return {
      active:this.$route.name
    }
  },
  mounted: function(){
    console.log(this.$route)
    this.$dialog.confirm({
      title: '温馨提示',
      mes: '此平台只提供行政事务性投诉这种功能。  ',
      opts: () => {
      }
    });
  },
  watch:{
     $route:function (val,old) {
       this. active=val.name
     }
  },
  methods:{
    getdots:function () {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .router-link-active{
    color:#0FA0FA;
  }
</style>
