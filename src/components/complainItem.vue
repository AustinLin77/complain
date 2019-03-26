<template>
  <yd-layout>
      <div class="complainitem">
       <div class="itemtop">
         <div class="topleft"><img></div>
         <div class="topright">
           <p>{{complainitem.name}}-{{complainitem.area}}-{{complainitem.module}}-{{complainitem.feedbackCategory}}</p>
           <p>{{complainitem.startDate}}</p>
         </div>
       </div>
       <!--<div class="process">-->
         <!--<div class="processleft"><yd-icon name="time" size="0.45rem" color="#888"></yd-icon></div>-->
         <!--<div class="processconter" @click="gonodeList">-->
            <!--<p>处理流程</p>-->
            <!--<p v-if="complainitem.factNodeName">当前节点 <span style="color:#4E7EC1 "> {{complainitem.factNodeName}}</span> </p>-->
            <!--<p v-else>已结束</p>-->
         <!--</div>-->

         <!--<div class="processright">-->
           <!--<yd-navbar-next-icon></yd-navbar-next-icon>-->
         <!--</div>-->
       <!--</div>-->
       <div class="messagetitle">
         诉求人信息
       </div>
       <div class="message">
          <div class="messitem"><span>工号</span><span>{{complainitem.workNo}}</span></div>
          <div class="messitem"><span>姓名</span><span>{{complainitem.name}}</span></div>
          <div class="messitem"><span>一级部门</span><span>{{complainitem.jobLevel1}}</span></div>
          <!--<div class="messitem"><span>二级部门</span><span>{{userInfo.jobLevel2}}</span></div>-->
          <!--<div class="messitem"><span>三级部门</span><span>{{userInfo.jobLevel3}}</span></div>-->
          <div class="messitem"><span>岗位</span><span>{{complainitem.workJob}}</span></div>
         <div class="messitem"><span>联系电话</span><span><a :href="'tel:'+complainitem.phoneNumber">{{complainitem.phoneNumber}}</a></span></div>
         <div class="messitem"><span>短号</span><span><a :href="'tel:'+complainitem.phoneNumberBrief">{{complainitem.phoneNumberBrief}}</a></span></div>
       </div>
       <div class="messagetitle">
         诉求内容
       </div>
       <div class="message">
          <div class="messitem"><span>园区</span><span>{{complainitem.area}}</span></div>
          <div class="messitem"><span>模块</span><span>{{complainitem.module}}</span></div>
          <div class="messitem"><span>诉求类型</span><span>{{complainitem.feedbackCategory}}</span></div>
          <div class="messitem"><span>诉求描述</span><span>{{complainitem.incidentDescription}}</span></div>
       </div>
       <div class="imgs">
           <img v-for="item in picList" :src="'data:image/png;base64,'+item.url">
       </div>
        <div class="messagetitle">
          投诉流程
        </div>
        <node-list></node-list>
  </div>
  <div slot="tabbar" class="agree" v-if="complainitem.factNodeName=='投诉人确认'||complainitem.factNodeName=='投诉人再次确认'">
         <div class="agreetitle">您对处理结果</div>
         <div class="aord">
          <span @click="substatus('agree')">
             <i  slot="icon" class="iconfont icon-manyidu"  style="font-size:0.3rem"></i>
            满意</span>
          <span @click="substatus('disagree')"> <i  slot="icon" class="iconfont icon-bumanyi"  style="font-size:0.3rem"></i>
            不满意</span>
         </div>
      </div>
    <message style="z-index: 999" icon="icon-manyidu" v-if="messageshow=='agree'" @click="messageshow='sss'">
      <div slot="centerCont" class="messcontent">
        <div class="messtitle">提交成功</div>
        <div class="messcenter">感谢您对我们工作的大力支持，我们将继续努力！</div>
        <div class="messbut" @click="readytab">我知道了</div>
      </div>
    </message>
    <message style="z-index: 999" icon="icon-bumanyi" v-if="messageshow=='disagree'" @click="messageshow='sss'">
      <div slot="centerCont" class="messcontent" style="width: 80%">
        <div class="messcenter" >
          <yd-textarea maxlength="500" v-model="disagreeres" placeholder="您不满意的信息，我们非常重视，会将此问题反馈给本园区行政负责人。" style="background-color: #ddd;border-radius: 5px;padding: 5px">

          </yd-textarea>
      </div>
        <div class="messbut" @click="subdisagree">提交</div>
        <div class="messbut" @click="messageshow='sss'">取消</div>
      </div>
    </message>
  </yd-layout>
</template>

<script>
  import message from "@/components/common/message.vue"
  import nodeList from "@/components/nodeList.vue"
  export default {
    components: {
      message,
      nodeList
    },
    data () {
    return {
      fileId:'',
      picList:[],
      messageshow:'',
      disagreeres:"",
      token:"",
      userInfo:{},
      complainitem:{},
    }
  },
  mounted: function(){
    this.token = this.$route.query.token;
    console.log(this.fileId);
    if(this.$route.query.fileId){
      this.fileId = this.$route.query.fileId.split(",");
      this.getPicList();
    }else{
      console.log("无图片")
    }
//


    this.complainitem=JSON.parse(localStorage.getItem('complainItem'));
//    this.getuserInfo();


  },
  methods:{
    getPicList:function (){
      let vm = this;
      for (var i=0;i<vm.fileId.length;i++){
        vm.api(vm,'get',"获取信息中","complainImage.json",{token:vm.token,fileName:vm.fileId[i]},function (data) {
          console.log(data);
          var picBase={
            url:data.extData
          };
          vm.picList.push(picBase);

        });
        console.log(vm.picList)
      }

    },
    getuserInfo:function () {
      let vm = this;
      vm.api(vm,'get',"获取信息中","getUserInfo.json",{token:vm.token},function (data) {
        console.log(data);
        if(data.statusCode == 0){
          vm.userInfo =data.dataInfo.listData[0];
        }
      });
    },
    gonodeList:function () {
      this.$router.push({path:"nodeList",query:{token:this.token,complainNumber:this.complainitem.complainNumber}})
    },
    readytab:function () {
      let vm = this;
      vm.$router.replace({path:"mycomplain",query:{token:vm.token}});
      vm.shoumessage=false;
    },
    subdisagree:function () {
      if(this.disagreeres == ""){
        this.$dialog.toast({
          mes: '请填写不满意原因！',
          timeout: 1500
        });
        return
      }
      this.postmyms(this.disagreeres,'不满意');
    },
    postmyms:function (mess,stat) {
      let vm =this;
      vm.api(vm,'get',"提交中","complainantConfirm.json",{
        token:vm.token,
        confirmComment:mess,
        confirmstatus:stat,
        complainNumber:vm.complainitem.complainNumber
      },function (data) {
        console.log(data);
        if(data.statusCode == 0){
          vm.messageshow = 'agree'
//         vm.readytab();
        }
      });
    },
    substatus:function (stats) {
      if(stats == 'agree'){
        this.postmyms('满意',"满意")
      } if(stats == 'disagree'){
        this.messageshow = 'disagree'
      }
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.itemtop{
  display: flex;
  background-color: #fff;
  /*border-bottom: 0.2rem solid #eee;*/
  padding: 0.35rem 0.24rem ;
}
  .itemtop .topleft{
    width: 0.8rem;
    overflow: hidden;
  }
.itemtop .topright{
  flex:1;
  margin-left: 0.2rem;
}
.topright>p:first-child{

  line-height: 0.44rem;
  color: rgba(39, 55, 77, 1);
  font-size: 0.3rem;

}.topright>p:last-child{
   line-height: 0.34rem;
   color: rgba(173, 190, 202, 1);
   font-size: 0.24rem;

 }
.itemtop .topleft img{
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 0.15rem;
  background-color: #eee;
}


  .process{
    display: flex;
    background-color: #fff;
    padding: 0.2rem 0.3rem;
    align-items: center;
  }
  .processconter{
    flex:1;
    margin-left: 0.3rem;
  }
  .processconter>p:first-child{
    line-height: 0.44rem;
    color: rgba(39, 55, 77, 1);
    font-size:0.3rem;
  }
.processconter>p:last-child{
  line-height: 0.44rem;
  color: rgba(16, 16, 16, 1);
  font-size:0.3rem;

}
  .processleft,.processright{
    width: 0.48rem;
    height: 0.48rem;
    display: flex;
    align-items: center;
  }
  .processright{
    justify-content: flex-end;
  }

  .messagetitle{
    height: 0.9rem;
    line-height: 0.9rem;
    background-color: rgba(245, 245, 245, 1);
    color: rgba(107, 120, 138, 1);
    font-size:0.26rem;
    padding-left: 0.24rem;
  }

.messitem{
  display: flex;
  line-height: 0.44rem;
  padding: 0.3rem 0.24rem;
  background-color: #fff;
  border-bottom: solid 1px #eee;
  color: rgba(39, 55, 77, 1);
  font-size: 0.3rem;


}
.messitem>span:first-child{
  width: 1.8rem;

}
.messitem>span:last-child{
  flex: 1;
}
  .imgs{
    display: flex;
    flex-wrap: wrap;
    background-color: #fff;
    padding-bottom: 0.5rem;
  }
.imgs img{
  width: 30vw;
  height: 30vw;
  margin-left: 2vw;
  margin-top: 0.3rem;

}
  .agree{
    padding: 0.2rem 0;
    background-color: #fff;
    border-top: solid 1px #eee;
  }
  .agreetitle{
     text-align: center;
     line-height: 0.44rem;
     color: rgba(16, 16, 16, 1);
     font-size: 0.3rem;
   }
  .aord{
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.2rem 0;


  }
.aord>span{
  border: solid 1px;
  border-radius: 4px;
  padding: 2px 10px;
  text-align: center;
  display: inline-block;
  width:2rem ;
}
.aord>span:first-child{
  border-color: #EC8487 ;
  color: #EC8487;
}
.aord>span:last-child{
  margin-left: 0.4rem;
  border-color: rgb(78, 113, 162)  ;
  color: rgb(78, 113, 162);
}


.messcontent{
  width: 4.36rem;
}
.messcontent .messtitle{
  line-height: 0.52rem;
  color: rgba(78, 113, 162, 1);
  font-size: 0.36rem;
  text-align: center;
  font-weight: 600;
}
.messcontent .messcenter{
  margin-top: 0.16rem;
  line-height: 0.4rem;
  color: rgba(78, 113, 162, 1);
  font-size: 0.28rem;
  text-align: center;
  margin-bottom: 0.38rem;
}
.messcontent .messbut{
  margin-top: 0.18rem;
  height: 0.72rem;
  border-radius: 0.48rem;
  color: rgba(236, 132, 135, 1);
  font-size: 0.28rem;
  text-align: center;
  border: 1px solid rgba(236, 132, 135, 1);
  line-height: 0.72rem;
}
</style>
