(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-41c41fb9"],{"07a1":function(t,e,i){},"206f":function(t,e,i){"use strict";var a=i("07a1"),o=i.n(a);o.a},"323e":function(t,e,i){},"333d":function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"pagination-wrapper"},[i("el-pagination",{attrs:{background:t.background,"current-page":t.currentPage,"page-sizes":t.pageSizes,"page-size":t.pageSize,total:t.total,layout:t.layout},on:{"update:currentPage":function(e){t.currentPage=e},"update:current-page":function(e){t.currentPage=e},"update:pageSize":function(e){t.pageSize=e},"update:page-size":function(e){t.pageSize=e},"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)},o=[],r=(i("a9e3"),{name:"Pagination",props:{page:{type:Number,default:1,required:!0},limit:{type:Number,default:10,required:!0},background:{type:Boolean,default:!0},pageSizes:{type:Array,default:function(){return[10,15,20,50]}},total:{type:Number,default:0,required:!0},layout:{type:String,default:"total, prev, pager, next, sizes, jumper"}},computed:{currentPage:{get:function(){return this.page},set:function(t){console.log(t),this.$emit("update:page",t)}},pageSize:{get:function(){return this.limit},set:function(t){this.$emit("update:limit",t)}}},methods:{handleSizeChange:function(t){this.$emit("pagination",{page:this.currentPage,limit:t})},handleCurrentChange:function(t){this.$emit("pagination",{page:t,limit:this.pageSize})}}}),n=r,l=(i("206f"),i("2877")),s=Object(l["a"])(n,a,o,!1,null,null,null);e["a"]=s.exports},"498a":function(t,e,i){"use strict";var a=i("23e7"),o=i("58a8").trim,r=i("c8d2");a({target:"String",proto:!0,forced:r("trim")},{trim:function(){return o(this)}})},6220:function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"table-classic-wrapper"},[i("el-card",{attrs:{shadow:"always"}},[t._e(),i("div",{staticClass:"control-btns"},[i("el-button",{attrs:{type:"primary"},on:{click:t.handleCreate}},[t._v("添加活动")])],1),i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:t.tableData,"tooltip-effect":"dark",size:"medium"}},[i("el-table-column",{attrs:{"show-overflow-tooltip":"",prop:"activitySort",label:"排序",align:"center",width:"90",sortable:""}}),i("el-table-column",{attrs:{"show-overflow-tooltip":"",prop:"title",label:"活动名称",align:"center"}}),i("el-table-column",{attrs:{"show-overflow-tooltip":"",label:"活动banner",align:"center"},scopedSlots:t._u([{key:"default",fn:function(t){return[i("img",{attrs:{src:t.row.bannerUrl,alt:""}})]}}])}),i("el-table-column",{attrs:{"show-overflow-tooltip":"",prop:"linkUrl",label:"活动链接",align:"center"}}),i("el-table-column",{attrs:{"show-overflow-tooltip":"",label:"开始时间",align:"center",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(t._f("formatDate")(e.row.startTime)))])]}}])}),i("el-table-column",{attrs:{"show-overflow-tooltip":"",label:"结束时间",align:"center",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(t._f("formatDate")(e.row.endTime)))])]}}])}),i("el-table-column",{attrs:{"show-overflow-tooltip":"",label:"状态 ",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("el-switch",{staticClass:"switch",attrs:{"active-text":"禁用","active-value":0,"active-color":"#F04134","inactive-text":"正常","inactive-value":1,"inactive-color":"#00A854"},on:{change:function(i){return t.stateChange(e.row)}},model:{value:e.row.state,callback:function(i){t.$set(e.row,"state",i)},expression:"scope.row.state"}})]}}])}),i("el-table-column",{attrs:{label:"操作",fixed:"right",align:"center",width:"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(i){return t.handleEdit(e.$index,e.row)}}},[t._v("编辑")])]}}])})],1),i("Pagination",{attrs:{total:t.total,page:t.pageIndex,limit:t.pageSize},on:{"update:page":function(e){t.pageIndex=e},"update:limit":function(e){t.pageSize=e},pagination:t.PostFetchData}}),i("el-dialog",{staticClass:"dialog-form",attrs:{title:t.formVisibleList.title,visible:t.formVisibleList.formVisible,width:"45%","before-close":t.handleClose},on:{"update:visible":function(e){return t.$set(t.formVisibleList,"formVisible",e)}}},[i("el-form",{ref:"dialogForm",attrs:{model:t.dialogForm,rules:t.formRules,"label-width":"110px"}},[i("el-form-item",{attrs:{label:"活动名称：",prop:"title",maxlength:"16"}},[i("el-input",{model:{value:t.dialogForm.title,callback:function(e){t.$set(t.dialogForm,"title",e)},expression:"dialogForm.title"}})],1),i("el-form-item",{attrs:{label:"排序：",prop:"activitySort",maxlength:"2"}},[i("el-input",{model:{value:t.dialogForm.activitySort,callback:function(e){t.$set(t.dialogForm,"activitySort",e)},expression:"dialogForm.activitySort"}})],1),i("el-form-item",{attrs:{label:"活动图片： ",prop:"bannerUrl"}},[i("el-upload",{ref:"upload",staticClass:"avatar-uploader",attrs:{action:"#","show-file-list":!1,"http-request":t.uploadImg,limit:1,"on-change":t.onchangeImg,"auto-upload":!0,"before-upload":t.beforeavatarupload}},[t.imgUrl?i("img",{staticClass:"avatar",attrs:{src:t.imgUrl}}):i("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1),i("el-form-item",{attrs:{label:"活动链接：",prop:"linkUrl"}},[i("el-input",{model:{value:t.dialogForm.linkUrl,callback:function(e){t.$set(t.dialogForm,"linkUrl",e)},expression:"dialogForm.linkUrl"}})],1),i("el-form-item",{attrs:{label:"开始时间：",prop:"activityStartTime"}},[i("el-date-picker",{attrs:{type:"datetime","value-format":"yyyy-MM-dd HH:mm:ss",placeholder:"选择日期时间"},model:{value:t.dialogForm.activityStartTime,callback:function(e){t.$set(t.dialogForm,"activityStartTime",e)},expression:"dialogForm.activityStartTime "}})],1),i("el-form-item",{attrs:{label:"结束时间：",prop:"activityEndTime"}},[i("el-date-picker",{attrs:{type:"datetime","value-format":"yyyy-MM-dd HH:mm:ss",placeholder:"选择日期时间"},model:{value:t.dialogForm.activityEndTime,callback:function(e){t.$set(t.dialogForm,"activityEndTime",e)},expression:"dialogForm.activityEndTime "}})],1),i("div",{staticClass:"footer-item"},[i("el-button",{on:{click:t.cancleForm}},[t._v("取 消")]),i("el-button",{attrs:{type:"primary",disabled:t.isSubmit},on:{click:function(e){return t.submitForm("dialogForm",t.formVisibleList.isCreate)}}},[t._v("确 定")])],1)],1)],1)],1)],1)},o=[],r=(i("4160"),i("b0c0"),i("b64b"),i("159b"),i("058a")),n=i("fdf9"),l=i("333d"),s=(i("8a1f"),{name:"Table",components:{Pagination:l["a"]},data:function(){return{pickerOptions:{shortcuts:[{text:"最近一周",onClick:function(t){var e=new Date,i=new Date;i.setTime(i.getTime()-6048e5),t.$emit("pick",[i,e])}},{text:"最近一个月",onClick:function(t){var e=new Date,i=new Date;i.setTime(i.getTime()-2592e6),t.$emit("pick",[i,e])}},{text:"最近三个月",onClick:function(t){var e=new Date,i=new Date;i.setTime(i.getTime()-7776e6),t.$emit("pick",[i,e])}}]},listLoading:!0,listQuery:{},dialogForm:{bannerUrl:"",activitySort:"",activityEndTime:"",id:"",linkUrl:"",activityStartTime:"",state:"1",title:""},imgUrl:null,imgFile:"",fileName:"",dateTime:null,total:0,pageIndex:1,pageSize:10,tableData:[],multipleSelection:[],formVisible:!1,formVisibleList:{formVisible:!1,title:"编辑",isCreate:!1},corsTokem:{SecretId:null,SecretKey:null,region:null,sessionToken:null,filePath:null,Expires:null},formRules:{title:[{required:!0,message:"请输入广告名称",trigger:"blur"},{validator:n["a"].validateNumberAcCn,trigger:"blur"}],activitySort:[{required:!0,message:"请输入最大为99的数字",trigger:"blur"},{validator:n["a"].validateNumber,trigger:"blur"}],bannerUrl:[{required:!0,message:"请上传图片",trigger:"blur"}],activityStartTime:[{required:!0,message:"请输入开始时间",trigger:"blur"}],activityEndTime:[{required:!0,message:"请输入结束时间",trigger:"blur"}],type:[{required:!0,message:"请选择用户账户状态：",trigger:"blur"}]},isSubmit:!1,importVisible:!1}},created:function(){this.PostFetchData(),this.apiGetCosTokenInit()},methods:{handleEdit:function(t,e){this.formVisibleList.formVisible=!0,this.formVisibleList.title="编辑",this.formVisibleList.isCreate=!1,this.dialogForm.id=e.id,this.dialogForm.linkUrl=e.linkUrl,""!=e.bannerUrl&&(this.dialogForm.bannerUrl=e.bannerUrl,this.imgUrl=e.bannerUrl),this.dialogForm.activityStartTime=this.$options.filters["FormatDate"](e.startTime),this.dialogForm.activityEndTime=this.$options.filters["FormatDate"](e.endTime),this.dialogForm.activitySort=e.activitySort,this.dialogForm.title=e.title,this.apiGetCosTokenInit()},apiGetCosTokenInit:function(){var t=this,e={type:3};Object(r["y"])(e).then((function(e){200===e.code?(t.corsTokem.SecretId=e.data.tmpSecretId,t.corsTokem.SecretKey=e.data.tmpSecretKey,t.corsTokem.Expires=e.data.expiredTime,t.corsTokem.region=e.data.region,t.corsTokem.filePath=e.data.filePath,t.corsTokem.sessionToken=e.data.sessionToken):t.$message({type:"warning",message:e.message})})).catch((function(e){console.log(e),t.listLoading=!1}))},uploadImg:function(){var t=this,e=this,a=i("3438"),o=new a({getAuthorization:function(t,i){var a={TmpSecretId:e.corsTokem.SecretId,TmpSecretKey:e.corsTokem.SecretKey,XCosSecurityToken:e.corsTokem.sessionToken,ExpiredTime:e.corsTokem.Expires};i(a)}});o.putObject({Bucket:"qiangdan-1255789551",Region:e.corsTokem.region,Key:e.corsTokem.filePath+(new Date).getTime()+e.fileName,StorageClass:"STANDARD",Body:e.imgFile,onProgress:function(t){console.log(JSON.stringify(t))}},(function(e,i){if(console.log(e||i),e&&t.$message.error("图片上传到cors失败!"),i){var a="https://"+i.Location;t.dialogForm.bannerUrl=a,t.imgUrl=a,t.$refs.upload.clearFiles()}}))},beforeavatarupload:function(t){var e="image/jpg"===t.type||"image/jpeg"===t.type||"image/png"===t.type,i=t.size/1024/1024<2;return e?i?e&&i:(this.$message.error("上传头像图片大小不能超过 2mb!"),!1):(this.$message.error("上传头像图片只能是 jpg和 jpeg 和 png 格式!"),!1)},onchangeImg:function(t,e){var i=this,a=a||window.event,o=(t=a.target.files[0],new FileReader);this.fileName=t.name,this.imgFile=t,o.readAsDataURL(t),o.onload=function(t){i.dialogForm.bannerUrl=t.target.result}},handleClose:function(){this.cancleForm()},handleCreate:function(){this.formVisibleList.formVisible=!0,this.formVisibleList.title="添加活动",this.formVisibleList.isCreate=!0,this.apiGetCosTokenInit()},PostFetchData:function(){var t=this;this.listLoading=!0;var e=this.listQuery;e["pageIndex"]=this.pageIndex,e["pageSize"]=this.pageSize,Object(r["a"])(e).then((function(e){console.log(e),200===e.code&&(t.total=e.data.total,t.tableData=e.data.list,t.listLoading=!1)})).catch((function(e){console.log(e),t.listLoading=!1}))},upDate:function(t){t?(this.listQuery.startTime=t[0],this.listQuery.endTime=t[1]):(this.listQuery.startTime=null,this.listQuery.endTime=null)},onSubmit:function(){this.PostFetchData()},onReset:function(){var t=this;Object.keys(t.listQuery).forEach((function(e){t.listQuery[e]=null})),this.dateTime=null,this.PostFetchData()},submitForm:function(t,e){var i=this;this.$refs[t].validate((function(t){if(!t)return i.isSubmit=!1,!1;var a=i.dialogForm;e?(a["id"]=null,Object(r["b"])(a).then((function(t){console.log(t),200===t.code&&(i.PostFetchData(),i.cancleForm())})).catch((function(t){console.log(t),i.listLoading=!1}))):i.apiUpdateActivityInit(a)}))},apiUpdateActivityInit:function(t){var e=this;Object(r["m"])(t).then((function(t){console.log(t),200===t.code&&(e.PostFetchData(),e.cancleForm())})).catch((function(t){e.listLoading=!1}))},cancleForm:function(){var t=this;Object.keys(t.dialogForm).forEach((function(e){t.dialogForm[e]=null})),this.dialogForm.state="1",this.imgUrl="",this.imgFile="",this.fileName="",this.formVisibleList.formVisible=!1},views:function(){console.log("hh"),this.isAbc=!0},stateChange:function(t){var e={};console.log(t),e["id"]=t.id,e["state"]=t.state,this.apiUpdateActivityInit(e)}}}),c=s,u=(i("fcbb"),i("2877")),m=Object(u["a"])(c,a,o,!1,null,null,null);e["default"]=m.exports},"8a1f":function(t,e,i){"use strict";i.d(e,"a",(function(){return a})),i.d(e,"b",(function(){return o}));i("c975"),i("ac1f"),i("1276"),i("498a");function a(t){return/^1[0-9]{10}$/.test(t)}function o(t){var e=/^[0-9A-Za-z]+$/;return e.test(t)}},c8d2:function(t,e,i){var a=i("d039"),o=i("5899"),r="​᠎";t.exports=function(t){return a((function(){return!!o[t]()||r[t]()!=r||o[t].name!==t}))}},fcbb:function(t,e,i){"use strict";var a=i("323e"),o=i.n(a);o.a},fdf9:function(t,e,i){"use strict";var a=/^[0-9]{1,2}$/,o=/^[0-9]{1,5}$/,r=/^[1-9][0-9]{0,5}$/,n=/^[\u4e00-\u9fa5]+$/,l=/^[\u4e00-\u9fa5]{2,10}$/,s=/^[A-Za-z0-9\u4e00-\u9fa5]{2,16}$/,c=/^[A-Za-z0-9]{2,16}$/,u=/^[A-Za-z0-9\u4e00-\u9fa5]+$/,m=/^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/,d=/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/,g=/^[1][3,4,5,6,7,8,9][0-9]{9}$/;e["a"]={validateNumber:function(t,e,i){a.test(e)?i():i(new Error("请输入数字"))},validateNumberMaxReg:function(t,e,i){o.test(e)?i():i(new Error("请输入最大五位数字"))},validateWithAmount:function(t,e,i){o.test(e)?i():i(new Error("请输入最大五位数字"))},validateRechargeReg:function(t,e,i){r.test(e)?i():i(new Error("请输入1-999999的数额"))},validateNumbetAcReg:function(t,e,i){c.test(e)?i():i(new Error("请输入英文与数字的格式"))},validateUserName:function(t,e,i){l.test(e)?i():i(new Error("请输入中文"))},validateCouponTitle:function(t,e,i){s.test(e)?i():i(new Error("请输入16位以内标题"))},validateCn:function(t,e,i){n.test(e)?i():i(new Error("请输入中文"))},validateEmail:function(t,e,i){d.test(e)?i():i(new Error("请输入正确的邮箱"))},validatePhone:function(t,e,i){console.log(e),g.test(e)?i():i(new Error("请输入正确的手机号码"))},validateUrl:function(t,e,i){m.test(e)?i():i(new Error("请输入正确url格式"))},validateIsUrl:function(t,e,i){u.test(e)?i():i(new Error("请输入正确url格式"))},validateNumberAcCn:function(t,e,i){u.test(e)?i():i(new Error("请输入中文数字字母的格式"))},validateDivide70:function(t,e,i){e%70!=0?i(new Error("请输入70的倍数")):i()}}}}]);