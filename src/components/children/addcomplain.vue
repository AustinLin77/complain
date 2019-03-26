<template>
  <div class="addcomplain">
    <div class="messagetitle">
      诉求人信息
    </div>
    <div class="message">
      <div class="messitem"><span><i>*</i>工号</span><span><input placeholder="请输入工号" v-model="form.workNo" disabled/></span></div>
      <div class="messitem"><span><i>*</i>姓名</span><span><input placeholder="请输入姓名" v-model="form.name" disabled/></span></div>
      <div class="messitem" v-show="moreshow"><span><i>*</i>一级部门</span><span><input placeholder="请输入一级部门" v-model="form.jobLevel1"/></span></div>
      <div class="messitem" v-show="moreshow"><span style="padding-left: 0.4rem">二级部门</span><span><input placeholder="请输入二级部门" v-model="form.jobLevel2"/></span></div>
      <div class="messitem" v-show="moreshow"><span style="padding-left: 0.4rem">三级部门</span><span><input placeholder="请输入三级部门" v-model="form.jobLevel3"/></span></div>
      <div class="messitem" v-show="moreshow"><span><i>*</i>岗位</span><span><input placeholder="请输入岗位" v-model="form.workJob"/></span></div>
      <div class="messitem"><span><i>*</i>联系电话</span><span><input placeholder="请输入联系电话" v-model="form.phoneNumber"/></span></div>
      <div class="messitem"><span style="padding-left: 0.4rem">短号</span><span><input placeholder="请输入短号" v-model="form.phoneNumberBrief"/></span></div>
      <!--<div class="more" @click="moreshow=!moreshow">-->
      <div class="more">
        <i class="iconfont icon-icon-angle-double-bottom"  style="font-size:0.5rem;color: #555" v-if="!moreshow"></i>
        <i class="iconfont icon-icon-angle-double-top"  style="font-size:0.5rem;color: #555" v-if="moreshow"></i>
      </div>
    </div>

    <div class="messagetitle">
      诉求内容
    </div>
    <div class="message">
      <div class="messitem"><span><i>*</i>园区</span><span class="selctcont">
        <select v-model="form.area" style="color:	#a8a8a8">
          <option value="" disabled selected hidden >请选择园区</option>
          <option v-for="i in areas" :value="i">{{i}}</option>
        </select>
      </span></div>
      <div class="messitem"><span><i>*</i>模块</span><span>
        <select v-model="form.module" style="color:	#a8a8a8">
          <option value="" disabled selected hidden >请选择模块</option>
         <option v-for="i in complainmodel" :value="i">{{i}}</option>
        </select>
      </span>
      </div>
      <div class="messitem"><span><i>*</i>诉求类型</span>
        <span>
        <select v-model="form.feedbackCategory" style="color:	#a8a8a8">
          <option value="" disabled selected hidden >请选择诉求类型</option>
          <option v-for="i in complaintype" :value="i">{{i}}</option>
        </select>
      </span>
      </div>
      <div class="messitem"><span><i>*</i>诉求描述</span><span> <yd-textarea  v-model="form.incidentDescription" placeholder="请输入诉求描述" maxlength="500"></yd-textarea></span></div>
    </div>
    <div class="imgs">
      <div class="imgItem"  v-for="(i,n) in imgs">
        <img  :src="i">
        <yd-icon  class="deletimg" name="error-outline" size="0.5rem" color="#aaa" @click.native="deleteImg(n)"></yd-icon>
      </div>

      <div class="imgItem"  v-show="imgs.length<3">
        <i class="iconfont icon-zhaoxiangji"  style="font-size:0.8rem;color: #4F74A6"></i>
        <input type="file" accept="image/*"   id="inputfile" @change="preImg('inputfile')" >
      </div>
    </div>
    <div style="padding: 0 0.24rem;padding-bottom: 0.5rem">
      <yd-button size="large" type="primary" bgcolor="#4F74A6" color="#fff" @click.native="subm" :disabled="subtof">提交</yd-button>
    </div>
    <message style="z-index: 999" icon="icon-lingdang" v-show="shoumessage">
      <div slot="centerCont" class="messcontent">
        <div class="messtitle">提交成功</div>
        <div class="messcenter">我们将第一时间处理您的投诉/建议信息！</div>
        <div class="messbut" @click="readytab">我知道了</div>
      </div>
    </message>
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
      subtof:false,
      moreshow:false,
      shoumessage:false,
      areas:["石龙仔","光明","博罗","裕永兴","F栋","水田","普瑞赛思"],
      complaintype:["投诉","建议"],
      complainmodel:["膳食(食堂)","住宿(宿舍问题)","车辆(班车、车队问题)","接待(前台、展厅接待、会务)","清洁(园区公共区域卫生问题)","工务维修(公共区域设施、宿舍水电维修)","综合(其它行政服务类问题)"],
      form:{
        workNo:"",
        name:"",
        jobLevel1:"",
        jobLevel2:"",
        jobLevel3:"",
        workJob:"",
        feedbackCategory:"",
        area:"",
        phoneNumber:"",
        phoneNumberBrief:"",
        module:"",
        incidentDescription:"",
        file:"",
      },
      token:"",
      imgs:[],//存图片的src
      subFile:[]//存图片的上传的图片
    }
  },
  mounted: function(){
    this.token = localStorage.getItem("usertoken");
    this.getuserInfo();
  },
  methods:{
    convertBase64UrlToBlob: function (urlData) {
      var bytes = window.atob(urlData.split(',')[1]);        //去掉url的头，并转换为byte
      //处理异常,将ascii码小于0的转换为大于0
      var ab = new ArrayBuffer(bytes.length);
      var ia = new Uint8Array(ab);
      for (var i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i);
      }
      return new Blob([ab], {type: 'image/png'});
    },
    dealImage: function (path, obj, callback) {
      var img = new Image();
      img.src = path;
      img.onload = function () {
        var that = this;
        // 默认按比例压缩
        var w = that.width,
          h = that.height,
          scale = w / h;
        w = obj.width || w;
        h = obj.height || (w / scale);
        var quality = 0.8;  // 默认图片质量为1
        //生成canvas
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        // 创建属性节点
        var anw = document.createAttribute("width");
        anw.nodeValue = w;
        var anh = document.createAttribute("height");
        anh.nodeValue = h;
        canvas.setAttributeNode(anw);
        canvas.setAttributeNode(anh);
        ctx.drawImage(that, 0, 0, w, h);
        // 图像质量
        if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
          quality = obj.quality;
        }
        // quality值越小，所绘制出的图像越模糊
        var base64 = canvas.toDataURL('image/jpeg', quality);
        // 回调函数返回base64的值
        callback(base64);
      }
    },
    preImg:function (fileId) {
      let vm = this;
      var src = this.getFileUrl(fileId);
      vm.imgs.push(src);
      vm.dealImage(src,{width:300},function (base) {
        console.log(vm.convertBase64UrlToBlob(base));
        vm.subFile.push(vm.convertBase64UrlToBlob(base))
        console.log(vm.imgs);
      })

    },
    deleteImg:function (n) {
      console.log(n);
      this.imgs.splice(n,1);
      this.subFile.splice(n,1);
      document.getElementById('inputfile').value = '';
      console.log(this.imgs)
      console.log(this.subFile)
    },
    getFileUrl:function (id) {//根据图片获取src
      console.log(document.getElementById(id).files[0]);
      var url;
      if (navigator.userAgent.indexOf("MSIE")>=1) { // IE
        url = document.getElementById("inputfile").value;
      } else if(navigator.userAgent.indexOf("Firefox")>0) { // Firefox
        url = window.URL.createObjectURL(document.getElementById(id).files.item(0));
      } else if(navigator.userAgent.indexOf("Chrome")>0) { // Chrome
        url = window.URL.createObjectURL(document.getElementById(id).files.item(0));
      }else {
        url = window.webkitURL.createObjectURL(document.getElementById(id).files[0]);
      }
      return url;
    },
    getuserInfo:function () {
      let vm = this;
      console.log("aaaaaaaaaa");
      vm.api(vm,'get',"获取信息中","getUserInfo.json",{token:vm.token},function (data) {
        console.log(data);
        if(data.statusCode == 0){
            vm.form.workNo =data.dataInfo.listData[0].workNo;
            vm.form.name=data.dataInfo.listData[0].name;
            vm.form.jobLevel1=data.dataInfo.listData[0].jobLevel1;
            vm.form.jobLevel2=data.dataInfo.listData[0].jobLevel2;
            vm.form.jobLevel3=data.dataInfo.listData[0].jobLevel3;
            vm.form.workJob=data.dataInfo.listData[0].workJob;
            vm.form.phoneNumber="";
            vm.form.phoneNumberBrief="";
        }
      });
    },
    readytab:function () {
      let vm = this;
      vm.$router.replace({path:"mycomplain",query:{token:vm.token}});
      vm.shoumessage=false;

    },
    subm:function () {
        console.log(this.form);
        let vm = this;
        this.subtof = true;
        if(vm.form.incidentDescription==""){
          this.$dialog.toast({
            mes: "请填写投诉描述",
            timeout: 500
          });
          this.subtof = false;
          return
        }
      if(vm.form.workNo==""){
        this.$dialog.toast({
          mes: "请填写工号",
          timeout: 500
        });
        this.subtof = false;
        return
      }
      if(vm.form.name==""){
        this.$dialog.toast({
          mes: "请填写姓名",
          timeout: 500
        });
        this.subtof = false;
        return
      }
      if(vm.form.jobLevel1==""){
        this.$dialog.toast({
          mes: "请填写一级部门",
          timeout: 500
        });
        this.subtof = false;
        return
      }
      if(vm.form.workJob==""){
        this.$dialog.toast({
          mes: "请填写岗位",
          timeout: 500
        });
        this.subtof = false;
        return
      }
      if(vm.form.phoneNumber==""){
        this.$dialog.toast({
          mes: "请填写联系电话",
          timeout: 500
        });
        this.subtof = false;
        return
      }
      if(vm.form.phoneNumber.length!=11){
        this.$dialog.toast({
          mes: "电话号码位数不对",
          timeout: 500
        });
        this.subtof = false;
        return
      }
      if(vm.form.area==""){
        this.$dialog.toast({
          mes: "请选择园区",
          timeout: 500
        });
        this.subtof = false;
        return
      }
      if(vm.form.module==""){
        this.$dialog.toast({
          mes: "请选择模块",
          timeout: 500
        });
        this.subtof = false;
        return
      }
      if(vm.form.feedbackCategory==""){
        this.$dialog.toast({
          mes: "请选择诉求类型",
          timeout: 500
        });
        this.subtof = false;
        return
      }
        vm.$dialog.loading.open('正在提交');
        let formData = new FormData();
        for(let k in vm.subFile){ //文件数组
          formData.append('file',vm.subFile[k]);
        }
        formData.append('workNo',vm.form.workNo);
        formData.append('name',vm.form.name);
        formData.append('jobLevel1',vm.form.jobLevel1);
        formData.append('workJob',vm.form.workJob);
        formData.append('feedbackCategory',vm.form.feedbackCategory);
        formData.append('area',vm.form.area);
        formData.append('phoneNumber',vm.form.phoneNumber);
        formData.append('phoneNumberBrief',vm.form.phoneNumberBrief);
        formData.append('module',vm.form.module);
        formData.append('incidentDescription',vm.form.incidentDescription);
        formData.append('token',vm.token);
        $.ajax({
          type:"post",
          url:vm.path+"addComplain.json",
          data:formData,
          cache: false,
          contentType: false,
          processData:false,
          mimeType:"multipart/form-data",
          success:function(data){
            let a=JSON.parse(data);
            vm.$dialog.loading.close();
            if(a.statusCode==0){

              vm.shoumessage=true;
            }else{
              vm.$dialog.toast({
                mes: '添加失败',
                timeout: 1500
              });
            }

          }});

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
.more{
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}
  .message select{
    width: 100%;
    border: none;
  }
  .imgs{
    display: flex;
    flex-wrap: wrap;
    background-color: #fff;
    padding-bottom: 0.5rem;
  }
  .imgs .imgItem{
    position: relative;
    overflow: hidden;
    width: 30vw;
    height: 30vw;
    margin-left: 2vw;
    margin-top: 0.3rem;
    border: solid 1px #eee;
    display: flex;
    justify-content: center;
    align-items: center;

  }
  .imgs  input {
    position: absolute;
    display: block;
    font-size: 60px;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    opacity: 0;
  }
  .imgItem  .deletimg{
    position:absolute ;
    top: 0;
    right: 0;
    line-height: 0.5rem;
    /*box-shadow: 1px 1px 2px #555;*/
   border-radius: 50%;
    /*background-color: #aaa;*/
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
  }
  .messcontent .messbut{
    margin-top: 0.38rem;
    height: 0.72rem;
    border-radius: 0.48rem;
    color: rgba(236, 132, 135, 1);
    font-size: 0.28rem;
    text-align: center;
    border: 1px solid rgba(236, 132, 135, 1);
    line-height: 0.72rem;
  }
 i{
   margin-right: 0.2rem;
   color: red;


  }

</style>
