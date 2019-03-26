<template>
  <yd-layout id="conlist" class="mycomplain" >

    <!--<div class="linetop" slot="top">-->
      <!--<yd-search v-model="selectContent" :on-submit="submitHandler" placeholder="根据关键字搜索" cancel-text="确定" :on-cancel="submitHandler"></yd-search>-->
    <!--</div>-->
    <yd-infinitescroll :callback="loadList" ref="infinitescrollDemo" v-if="complains.length!=0" >
      <div slot="list" class="listcon" v-if="complains[0]!='A'">
        <div v-for="(item,n) in complains" class="companylist" @click="goItem(item)">
          <!--<left-slider :index="n" @deleteItem="deleteItem">-->
            <div class="listitem">
              <div class="itemleft">
                  <p class="itemtitle">
                    <span style="font-size: 14px">{{item.name}}-{{item.area}}-{{item.module}}-{{item.feedbackCategory}}</span>
                    <span v-if="item.startDate">{{item.startDate.split(' ')[0]}}</span>
                  </p>
                <p class="itemcontent">
                  <span class="" v-if="item.factNodeName">{{item.factNodeName}}</span>
                  <span class="" v-else>已结束</span>
                  <span>
                    {{item.incidentDescription}}
                  </span>
                </p>
              </div>
              <div class="itemright">
                <i  slot="icon" class="iconfont icon-morevert"  style="font-size:0.4rem;color: #888"></i>
              </div>
            </div>
          <!--</left-slider>-->
          <div class="linebott"></div>
        </div>
      </div>
      <!-- 数据全部加载完毕显示 -->
      <span slot="doneTip" >啦啦啦，啦啦啦，没有数据啦~~</span>
      <!-- 加载中提示，不指定，将显示默认加载中图标 -->
      <img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg"/>
    </yd-infinitescroll>
    <div class="signready" v-if="complains.length==0">
      <div>
        <yd-icon name="warn-outline"  color="#137fe4" size="1.1rem"></yd-icon>
      </div>
      <div class="signreadyTxt" >暂无投诉</div>
      <div class="subtxt">
        <p>您还没有任何投诉信息</p>
        <p>如果有任何不满意的地方,请前往添加投诉</p>
      </div>
    </div>

  </yd-layout>

</template>

<script>
  import LeftSlider from './../common/swiperLeft.vue';
export default {
  name: 'mycomplain',
  data () {
    return {
      page: 1,
      complains:[],
      selectContent:"",
      token:"",
      totalPage:0
    }
  },
  components: {
    LeftSlider
  },

  mounted: function(){
//    this.token = this.$route.query.token;
    console.log(this.$route)
    if(this.$route.query.token){
      console.log("AAAAAA")
      localStorage.setItem("usertoken",this.$route.query.token)
    }
    this.token = localStorage.getItem("usertoken");
    console.log(this.token)
    this.getList(this.page);
  },
  methods:{
    deleteItem:function () {
    },
    loadList() {
      console.log("aaaaaa");
      let vm = this;

      vm.getList(vm.page);
    },
    submitHandler:function () {

    },
    submitHandler:function () {

    },

    getList:function (page) {
      let vm = this;
      this.$dialog.loading.open('获取信息中');
      setTimeout(() => {
        this.$dialog.loading.close();
        vm.api(vm,'get',"获取信息中","queryComplain.json",{token:vm.token,page:page,pageSize:20},function (data) {
          console.log(data);
          if(data.statusCode == 0){
            vm.complains = vm.complains.concat(data.dataInfo.listData);
            vm.totalPage = data.dataInfo.pageInfo.totalPage;
            vm.page++;
            if(vm.page>vm.totalPage){
              if(vm.$refs.infinitescrollDemo){
                vm.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone');
                return;
              }

            }
          }
        });
      }, 800);

    },

    goItem:function (item) {
      console.log(item);
      localStorage.setItem("complainItem",JSON.stringify(item))
      this.$router.push({path:"complainItem",query:{token:this.token,fileId:item.fileId}})
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .mycomplain{
    background-color: #fff;
  }
.listcon{
  padding-left: 0.25rem;
  padding-right: 0.25rem;
}
  .listitem{
    background-color: #fff;
    /*height: 50px;*/
    line-height: 50px;
    display: flex;
  }
  .listitem .itemleft{
    flex: 1;
    overflow: hidden;
  }
  .itemtitle{
    line-height: 0.44rem;
    padding-top: 0.3rem;
    padding-bottom: 0.14rem;
    font-size: 0.3rem;
    color: rgba(39, 55, 77, 1);
    display: flex;
  }
  .itemtitle>span:first-child{
    flex: 1;
    overflow: hidden;
    display: inline-block;
    white-space: nowrap;
    text-overflow: ellipsis
  }
  .itemtitle>span:last-child{
    color: rgba(173, 190, 202, 1);
    font-size: 0.24px;
    padding: 0 0.2rem;
  }
  .itemcontent{
    line-height: 0.4rem;
    color: rgba(173, 190, 202, 1);
    font-size: 0.28rem;
    display: flex;
    padding-bottom: 0.18rem;
  }
  .itemcontent>span:first-child{
    line-height: 0.4rem;
    border-radius: 2px;
    text-align: center;
    border: 1px solid rgba(0, 150, 136, 1);
    padding:0 2px;
    color: rgba(0, 150, 136, 1);
    white-space: nowrap;
    margin-right: 0.1rem;
  }
  .itemcontent span:last-child{
    flex: 1;
    overflow: hidden;
    display: inline-block;
    white-space: nowrap;
    text-overflow: ellipsis

  }
  .itemcontent span:last-child>span{
    /*display: inline-block;*/

  }
  .listitem .itemright{
    width: 0.4rem;
    display: flex;
    align-items: center;
  }
  .linebott{
    border-bottom: solid 1px #eee;
  }
  .signready{
    box-sizing: border-box;
    background-color: #fff;
    margin-bottom: 0.2rem;
    padding-top: 0.4rem;
    padding-left: 0.4rem;
    padding-bottom: 0.32rem;
    padding-right: 0.32rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .signready>div{
    text-align: center;
  }
  .signreadyTxt{
    font-size: 0.4rem;
    font-weight: 600;
    color: #137fe4;
    margin-bottom: 0.1rem;
  }
  .subtxt{
    font-size: 0.28rem;
    color: #888;
  }
</style>
