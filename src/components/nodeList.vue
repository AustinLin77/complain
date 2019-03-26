<template>
   <div class="nodelist">
      <div class="listItem">
        <div class="itemleft">
          <div></div>
          <div></div>
        </div>
        <div class="itemright">
          <div class="itemtitle">模块负责人处理意见</div>
          <div class="itemcontent" v-if="complainitem.treatmentSuggestion">{{complainitem.treatmentSuggestion}}</div>
          <div class="itemcontent" v-else="" style="color: #888">暂无处理信息</div>
          <!--<div class="itemtiem">{{item.createTime}}</div>-->
        </div>
      </div> <div class="listItem">
        <div class="itemleft">
          <div></div>
          <div></div>
        </div>
        <div class="itemright">
          <div class="itemtitle">投诉人确认意见</div>
          <div class="itemcontent" v-if="complainitem.reasonNo"><div v-for="item in reasonNo">{{item}}</div></div>
          <div class="itemcontent" v-else="" style="color: #888">暂无处理信息</div>
          <!--<div class="itemtiem">{{item.createTime}}</div>-->
        </div>
      </div>
     <div class="listItem">
        <div class="itemleft">
          <div></div>
          <div></div>
        </div>
        <div class="itemright">
          <div class="itemtitle">本园区行政负责人意见</div>
          <div class="itemcontent" v-if="complainitem.directorOpinion">{{complainitem.directorOpinion}}</div>
          <div class="itemcontent" v-else="" style="color: #888">暂无处理信息</div>
        </div>
      </div>
     <div class="listItem">
        <div class="itemleft">
          <div></div>
          <div></div>
        </div>
        <div class="itemright">
          <div class="itemtitle"> 集团行政总部意见
          </div>
          <div class="itemcontent" v-if="complainitem.operation">{{complainitem.operation}}</div>
          <div class="itemcontent" v-else="" style="color: #888">暂无处理信息</div>
        </div>
      </div>

   </div>
</template>

<script>
  import message from "@/components/common/message.vue"
  export default {
    components: {
      message
    },
    data () {
    return {
      token:"",
      complainNumber:"",
      complainitem:{},
      reasonNo:[]
    }
  },
  mounted: function(){
    this.token = this.$route.query.token;
    this.complainitem=JSON.parse(localStorage.getItem('complainItem'));
    this.reasonNo=this.complainitem.reasonNo.split(";")
  },
  methods:{


  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.nodelist{
  width: 100%;
  height: 100%;
  background-color: #fff;
  padding-top: 20px;
  font-size: 0.3rem;
  overflow-y: hidden;
}
  .listItem{
     display: flex;
     min-height: 50px;
  }
  .listItem .itemleft{
    width: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    top: 0.1rem;
   }
/*.listItem:last-child .itemleft{*/
  /*top: 0rem;*/
/*}*/
.listItem:first-child .itemleft>div:first-child{
  border-color: #10aeff;
  background-color: #e6a200;
}
  .itemleft>div:first-child{
   width: 0.24rem;
    height: 0.24rem;
    border: solid 1px #eee;
    border-radius: 50%;

  }
   .itemleft>div:last-child{
     flex: 1;
     width: 1px;
     border-right: solid 1px #eee;
  }
   .listItem .itemright{
     flex: 1;
     padding-bottom: 0.4rem;
     padding-right: 0.24rem;
   }
   .itemtitle{
     margin-bottom: 0.2rem;
   }
   .itemcontent{
     line-height: 0.4rem;
     background-color: #eee;
     padding: 0.3rem 0.2rem;
     border-radius: 5px;
   }
  .itemtiem{
    margin-top: 0.2rem;
    line-height: 0.4rem;
    color: rgba(187, 187, 187, 1);
    font-size: 0.28rem;
    padding-bottom: 0.2rem;
    border-bottom: solid 1px #eee;
  }
</style>
