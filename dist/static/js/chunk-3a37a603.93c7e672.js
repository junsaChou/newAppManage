(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3a37a603"],{"07a1":function(e,t,a){},"206f":function(e,t,a){"use strict";var i=a("07a1"),l=a.n(i);l.a},"333d":function(e,t,a){"use strict";var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"pagination-wrapper"},[a("el-pagination",{attrs:{background:e.background,"current-page":e.currentPage,"page-sizes":e.pageSizes,"page-size":e.pageSize,total:e.total,layout:e.layout},on:{"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t},"update:pageSize":function(t){e.pageSize=t},"update:page-size":function(t){e.pageSize=t},"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)},l=[],o=(a("a9e3"),{name:"Pagination",props:{page:{type:Number,default:1,required:!0},limit:{type:Number,default:10,required:!0},background:{type:Boolean,default:!0},pageSizes:{type:Array,default:function(){return[10,15,20,50]}},total:{type:Number,default:0,required:!0},layout:{type:String,default:"total, prev, pager, next, sizes, jumper"}},computed:{currentPage:{get:function(){return this.page},set:function(e){console.log(e),this.$emit("update:page",e)}},pageSize:{get:function(){return this.limit},set:function(e){this.$emit("update:limit",e)}}},methods:{handleSizeChange:function(e){this.$emit("pagination",{page:this.currentPage,limit:e})},handleCurrentChange:function(e){this.$emit("pagination",{page:e,limit:this.pageSize})}}}),r=o,n=(a("206f"),a("2877")),s=Object(n["a"])(r,i,l,!1,null,null,null);t["a"]=s.exports},3854:function(e,t,a){"use strict";var i=a("6537"),l=a.n(i);l.a},"498a":function(e,t,a){"use strict";var i=a("23e7"),l=a("58a8").trim,o=a("c8d2");i({target:"String",proto:!0,forced:o("trim")},{trim:function(){return l(this)}})},6537:function(e,t,a){},"7eda":function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"table-classic-wrapper"},[a("el-card",{attrs:{shadow:"always"}},[a("el-form",{ref:"searchForm",staticClass:"search-form",attrs:{inline:!0,model:e.listQuery,"label-width":"90px"}},[a("el-form-item",{attrs:{label:"广告名称"}},[a("el-input",{attrs:{placeholder:"请填写"},model:{value:e.listQuery.title,callback:function(t){e.$set(e.listQuery,"title",t)},expression:"listQuery.title"}})],1),a("el-form-item",{attrs:{label:"账户状态"}},[a("el-select",{attrs:{placeholder:"请填写"},model:{value:e.listQuery.type,callback:function(t){e.$set(e.listQuery,"type",t)},expression:"listQuery.type "}},[a("el-option",{attrs:{value:"",label:"全部"}}),a("el-option",{attrs:{value:0,label:"未认证"}}),a("el-option",{attrs:{value:1,label:"认证"}}),a("el-option",{attrs:{value:2,label:"通用"}})],1)],1),a("el-form-item",{attrs:{label:"广告状态"}},[a("el-select",{attrs:{placeholder:"请填写"},model:{value:e.listQuery.state,callback:function(t){e.$set(e.listQuery,"state",t)},expression:"listQuery.state "}},[a("el-option",{attrs:{value:"",label:"全部"}}),a("el-option",{attrs:{value:0,label:"禁用"}}),a("el-option",{attrs:{value:1,label:"启用"}})],1)],1),a("el-form-item",{attrs:{label:"日期范围"}},[a("el-date-picker",{attrs:{type:"datetimerange","picker-options":e.pickerOptions,"value-format":"yyyy-MM-dd HH:mm:ss","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期",align:"right"},on:{change:e.upDate},model:{value:e.dateTime,callback:function(t){e.dateTime=t},expression:"dateTime"}})],1),a("el-form-item",{attrs:{label:"广告类型"}},[a("el-select",{attrs:{placeholder:"请填写"},model:{value:e.listQuery.bannerType,callback:function(t){e.$set(e.listQuery,"bannerType",t)},expression:"listQuery.bannerType"}},[a("el-option",{attrs:{value:"",label:"全部"}}),a("el-option",{attrs:{value:0,label:"首页banner"}}),a("el-option",{attrs:{value:1,label:"悬浮"}}),a("el-option",{attrs:{value:2,label:"弹窗"}})],1)],1),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:e.onSubmit}},[e._v("搜索")]),a("el-button",{attrs:{type:"warning"},on:{click:e.onReset}},[e._v("重置")])],1)],1),a("div",{staticClass:"control-btns"},[a("el-button",{attrs:{type:"primary"},on:{click:e.handleCreate}},[e._v("创建banner")])],1),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:e.tableData,"tooltip-effect":"dark",size:"medium"}},[a("el-table-column",{attrs:{"show-overflow-tooltip":"",prop:"sort",label:"排序",align:"center",width:"90",sortable:""}}),a("el-table-column",{attrs:{"show-overflow-tooltip":"",prop:"title",label:"广告名称",align:"center"}}),a("el-table-column",{attrs:{"show-overflow-tooltip":"",label:"广告图片",align:"center"},scopedSlots:e._u([{key:"default",fn:function(e){return[a("img",{attrs:{src:e.row.bannerUrl,alt:""}})]}}])}),a("el-table-column",{attrs:{"show-overflow-tooltip":"",prop:"linkUrl",label:"跳转链接",align:"center"}}),a("el-table-column",{attrs:{"show-overflow-tooltip":"",label:"创建时间",align:"center",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(e._f("formatDate")(t.row.createTime)))])]}}])}),a("el-table-column",{attrs:{"show-overflow-tooltip":"",label:"账户状态",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s("0"==t.row.type?"未认证":"1"==t.row.type?"认证":"通用"))]}}])}),a("el-table-column",{attrs:{"show-overflow-tooltip":"",label:"广告状态 ",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s("0"==t.row.state?"禁用":"启用"))]}}])}),a("el-table-column",{attrs:{"show-overflow-tooltip":"",label:"广告类型 ",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s("0"==t.row.bannerType?"首页banner":"1"==t.row.bannerType?"悬浮":"弹窗"))]}}])}),a("el-table-column",{attrs:{"show-overflow-tooltip":"",label:"有效期",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(e._f("formatDate")(t.row.startTime))+" - "+e._s(e._f("formatDate")(t.row.endTime)))]}}])}),a("el-table-column",{attrs:{label:"操作",fixed:"right",align:"center",width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(a){return e.handleEdit(t.$index,t.row)}}},[e._v("编辑")]),a("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(a){return e.handleDelete(t.$index,t.row.id)}}},[e._v("删除")])]}}])})],1),a("Pagination",{attrs:{total:e.total,page:e.pageIndex,limit:e.pageSize},on:{"update:page":function(t){e.pageIndex=t},"update:limit":function(t){e.pageSize=t},pagination:e.PostFetchData}}),a("el-dialog",{staticClass:"dialog-form",attrs:{title:e.formVisibleList.title,visible:e.formVisibleList.formVisible,width:"45%","before-close":e.handleClose},on:{"update:visible":function(t){return e.$set(e.formVisibleList,"formVisible",t)}}},[a("el-form",{ref:"dialogForm",attrs:{model:e.dialogForm,rules:e.formRules,"label-width":"110px"}},[a("el-form-item",{attrs:{label:"广告名称：",prop:"title",maxlength:"16"}},[a("el-input",{model:{value:e.dialogForm.title,callback:function(t){e.$set(e.dialogForm,"title",t)},expression:"dialogForm.title"}})],1),a("el-form-item",{attrs:{label:"广告类型：",prop:"bannerType"}},[a("el-select",{model:{value:e.dialogForm.bannerType,callback:function(t){e.$set(e.dialogForm,"bannerType",t)},expression:"dialogForm.bannerType"}},[a("el-option",{attrs:{value:0,label:"首页banner"}}),a("el-option",{attrs:{value:1,label:"悬浮"}}),a("el-option",{attrs:{value:2,label:"弹窗"}})],1)],1),0==e.dialogForm.bannerType?a("el-form-item",{attrs:{label:"排序：",prop:"bannerSort",maxlength:"2"}},[a("el-input",{model:{value:e.dialogForm.bannerSort,callback:function(t){e.$set(e.dialogForm,"bannerSort",t)},expression:"dialogForm.bannerSort"}})],1):e._e(),a("el-form-item",{attrs:{label:"正常/禁用： ",prop:"state"}},[a("el-switch",{attrs:{"active-value":"1","inactive-value":"0"},model:{value:e.dialogForm.state,callback:function(t){e.$set(e.dialogForm,"state",t)},expression:"dialogForm.state"}})],1),a("el-form-item",{attrs:{label:"banner图片： ",prop:"bannerUrl"}},[a("el-upload",{ref:"upload",staticClass:"avatar-uploader",attrs:{action:"#","show-file-list":!1,"http-request":e.uploadImg,limit:1,"on-change":e.onchangeImg,"auto-upload":!0,"before-upload":e.beforeavatarupload}},[e.imgUrl?a("img",{staticClass:"avatar",attrs:{src:e.imgUrl}}):a("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1),a("el-form-item",{attrs:{label:"跳转链接：",prop:"linkUrl"}},[a("el-input",{model:{value:e.dialogForm.linkUrl,callback:function(t){e.$set(e.dialogForm,"linkUrl",t)},expression:"dialogForm.linkUrl"}})],1),a("el-form-item",{attrs:{label:"开始时间：",prop:"startTime"}},[a("el-date-picker",{attrs:{type:"datetime","value-format":"yyyy-MM-dd HH:mm:ss",placeholder:"选择日期时间"},model:{value:e.dialogForm.startTime,callback:function(t){e.$set(e.dialogForm,"startTime",t)},expression:"dialogForm.startTime"}})],1),a("el-form-item",{attrs:{label:"结束时间：",prop:"endTime"}},[a("el-date-picker",{attrs:{type:"datetime","value-format":"yyyy-MM-dd HH:mm:ss",placeholder:"选择日期时间"},model:{value:e.dialogForm.endTime,callback:function(t){e.$set(e.dialogForm,"endTime",t)},expression:"dialogForm.endTime"}})],1),a("el-form-item",{attrs:{label:"用户账户状态：",prop:"type"}},[a("el-select",{model:{value:e.dialogForm.type,callback:function(t){e.$set(e.dialogForm,"type",t)},expression:"dialogForm.type"}},[a("el-option",{attrs:{value:0,label:"未认证"}}),a("el-option",{attrs:{value:1,label:"认证"}}),a("el-option",{attrs:{value:2,label:"通用"}})],1)],1),a("div",{staticClass:"footer-item"},[a("el-button",{on:{click:e.cancleForm}},[e._v("取 消")]),a("el-button",{attrs:{type:"primary",disabled:e.isSubmit},on:{click:function(t){return e.submitForm("dialogForm",e.formVisibleList.isCreate)}}},[e._v("确 定")])],1)],1)],1)],1)],1)},l=[],o=(a("4160"),a("b0c0"),a("b64b"),a("159b"),a("058a")),r=a("fdf9"),n=a("333d"),s=(a("8a1f"),{name:"Table",components:{Pagination:n["a"]},data:function(){return{pickerOptions:{shortcuts:[{text:"最近一周",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-6048e5),e.$emit("pick",[a,t])}},{text:"最近一个月",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-2592e6),e.$emit("pick",[a,t])}},{text:"最近三个月",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-7776e6),e.$emit("pick",[a,t])}}]},listLoading:!0,listQuery:{endTime:null,id:null,linkUrl:null,startTime:null,state:null,title:null,type:null,bannerType:null},dialogForm:{bannerUrl:"",bannerSort:"",endTime:"",id:"",linkUrl:"",startTime:"",state:"1",title:"",type:null,bannerType:null},imgUrl:null,imgFile:"",fileName:"",dateTime:null,total:0,pageIndex:1,pageSize:10,tableData:[],multipleSelection:[],formVisible:!1,formVisibleList:{formVisible:!1,title:"编辑",isCreate:!1},corsTokem:{SecretId:null,SecretKey:null,region:null,sessionToken:null,filePath:null,Expires:null},formRules:{title:[{required:!0,message:"请输入广告名称",trigger:"blur"},{validator:r["a"].validateNumberAcCn,trigger:"blur"}],bannerSort:[{required:!0,message:"请输入最大为99的数字",trigger:"blur"},{validator:r["a"].validateNumber,trigger:"blur"}],bannerUrl:[{required:!0,message:"请上传图片",trigger:"blur"}],startTime:[{required:!0,message:"请输入开始时间",trigger:"blur"}],endTime:[{required:!0,message:"请输入结束时间",trigger:"blur"}],type:[{required:!0,message:"请选择用户账户状态：",trigger:"blur"}],bannerType:[{required:!0,message:"请选择广告类型：",trigger:"blur"}]},isSubmit:!1,importVisible:!1}},created:function(){this.PostFetchData(),this.apiGetCosTokenInit()},methods:{handleEdit:function(e,t){this.formVisibleList.formVisible=!0,this.formVisibleList.title="编辑",this.formVisibleList.isCreate=!1,this.dialogForm.id=t.id,this.dialogForm.linkUrl=t.linkUrl,""!=t.bannerUrl&&(this.dialogForm.bannerUrl=t.bannerUrl,this.imgUrl=t.bannerUrl),this.dialogForm.startTime=this.$options.filters["FormatDate"](t.startTime),this.dialogForm.endTime=this.$options.filters["FormatDate"](t.endTime),this.dialogForm.bannerSort=t.sort,this.dialogForm.state=String(t.state),this.dialogForm.title=t.title,this.dialogForm.type=t.type,this.dialogForm.bannerType=t.bannerType,this.apiGetCosTokenInit()},handleDelete:function(e,t){var a=this;console.log(e,t),this.$confirm("此操作将删除选中数据, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){a.deleteApi(t),a.$message({type:"success",message:"删除成功!"})})).catch((function(){a.$message({type:"info",message:"已取消删除"})}))},deleteApi:function(e){var t=this,a={bannerId:e};Object(o["i"])(a).then((function(e){console.log(e),200===e.code?t.PostFetchData():t.$message({type:"warning",message:e.message})})).catch((function(e){console.log(e),t.listLoading=!1}))},apiGetCosTokenInit:function(){var e=this,t={type:3};Object(o["y"])(t).then((function(t){200===t.code?(e.corsTokem.SecretId=t.data.tmpSecretId,e.corsTokem.SecretKey=t.data.tmpSecretKey,e.corsTokem.Expires=t.data.expiredTime,e.corsTokem.region=t.data.region,e.corsTokem.filePath=t.data.filePath,e.corsTokem.sessionToken=t.data.sessionToken):e.$message({type:"warning",message:t.message})})).catch((function(t){console.log(t),e.listLoading=!1}))},uploadImg:function(){var e=this,t=this,i=a("3438"),l=new i({getAuthorization:function(e,a){var i={TmpSecretId:t.corsTokem.SecretId,TmpSecretKey:t.corsTokem.SecretKey,XCosSecurityToken:t.corsTokem.sessionToken,ExpiredTime:t.corsTokem.Expires};a(i)}});l.putObject({Bucket:"qiangdan-1255789551",Region:t.corsTokem.region,Key:t.corsTokem.filePath+(new Date).getTime()+t.fileName,StorageClass:"STANDARD",Body:t.imgFile,onProgress:function(e){console.log(JSON.stringify(e))}},(function(t,a){if(console.log(t||a),t&&e.$message.error("图片上传到cors失败!"),a){var i="https://"+a.Location;e.dialogForm.bannerUrl=i,e.imgUrl=i,e.$refs.upload.clearFiles()}}))},beforeavatarupload:function(e){var t="image/jpg"===e.type||"image/jpeg"===e.type||"image/png"===e.type,a=e.size/1024/1024<2;return t?a?t&&a:(this.$message.error("上传头像图片大小不能超过 2mb!"),!1):(this.$message.error("上传头像图片只能是 jpg和 jpeg 和 png 格式!"),!1)},onchangeImg:function(e,t){var a=this,i=i||window.event,l=(e=i.target.files[0],new FileReader);this.fileName=e.name,this.imgFile=e,l.readAsDataURL(e),l.onload=function(e){a.dialogForm.bannerUrl=e.target.result}},handleClose:function(){this.cancleForm()},handleCreate:function(){this.formVisibleList.formVisible=!0,this.formVisibleList.title="创建",this.formVisibleList.isCreate=!0,this.apiGetCosTokenInit()},PostFetchData:function(){var e=this;this.listLoading=!0;var t=this.listQuery;t["pageIndex"]=this.pageIndex,t["pageSize"]=this.pageSize,Object(o["w"])(t).then((function(t){console.log(t),200===t.code&&(e.total=t.data.total,e.tableData=t.data.list,e.listLoading=!1)})).catch((function(t){console.log(t),e.listLoading=!1}))},upDate:function(e){e?(this.listQuery.startTime=e[0],this.listQuery.endTime=e[1]):(this.listQuery.startTime=null,this.listQuery.endTime=null)},onSubmit:function(){this.PostFetchData()},onReset:function(){var e=this;Object.keys(e.listQuery).forEach((function(t){e.listQuery[t]=null})),this.dateTime=null,this.PostFetchData()},submitForm:function(e,t){var a=this;this.$refs[e].validate((function(e){if(!e)return a.isSubmit=!1,!1;var i=a.dialogForm;t?(i["id"]=null,Object(o["f"])(i).then((function(e){console.log(e),200===e.code&&(a.PostFetchData(),a.cancleForm())})).catch((function(e){console.log(e),a.listLoading=!1}))):Object(o["o"])(i).then((function(e){console.log(e),200===e.code&&(a.PostFetchData(),a.cancleForm())})).catch((function(e){a.listLoading=!1}))}))},cancleForm:function(){var e=this;Object.keys(e.dialogForm).forEach((function(t){e.dialogForm[t]=null})),this.dialogForm.state="1",this.imgUrl="",this.imgFile="",this.fileName="",this.formVisibleList.formVisible=!1},views:function(){console.log("hh"),this.isAbc=!0},changePicker:function(e){console.log(e)}}}),u=s,c=(a("3854"),a("2877")),m=Object(c["a"])(u,i,l,!1,null,null,null);t["default"]=m.exports},"8a1f":function(e,t,a){"use strict";a.d(t,"a",(function(){return i})),a.d(t,"b",(function(){return l}));a("c975"),a("ac1f"),a("1276"),a("498a");function i(e){return/^1[0-9]{10}$/.test(e)}function l(e){var t=/^[0-9A-Za-z]+$/;return t.test(e)}},c8d2:function(e,t,a){var i=a("d039"),l=a("5899"),o="​᠎";e.exports=function(e){return i((function(){return!!l[e]()||o[e]()!=o||l[e].name!==e}))}},fdf9:function(e,t,a){"use strict";var i=/^[0-9]{1,2}$/,l=/^[0-9]{1,5}$/,o=/^[1-9][0-9]{0,5}$/,r=/^[\u4e00-\u9fa5]+$/,n=/^[\u4e00-\u9fa5]{2,10}$/,s=/^[A-Za-z0-9\u4e00-\u9fa5]{2,16}$/,u=/^[A-Za-z0-9]{2,16}$/,c=/^[A-Za-z0-9\u4e00-\u9fa5]+$/,m=/^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/,d=/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/,p=/^[1][3,4,5,6,7,8,9][0-9]{9}$/;t["a"]={validateNumber:function(e,t,a){i.test(t)?a():a(new Error("请输入数字"))},validateNumberMaxReg:function(e,t,a){l.test(t)?a():a(new Error("请输入最大五位数字"))},validateWithAmount:function(e,t,a){l.test(t)?a():a(new Error("请输入最大五位数字"))},validateRechargeReg:function(e,t,a){o.test(t)?a():a(new Error("请输入1-999999的数额"))},validateNumbetAcReg:function(e,t,a){u.test(t)?a():a(new Error("请输入英文与数字的格式"))},validateUserName:function(e,t,a){n.test(t)?a():a(new Error("请输入中文"))},validateCouponTitle:function(e,t,a){s.test(t)?a():a(new Error("请输入16位以内标题"))},validateCn:function(e,t,a){r.test(t)?a():a(new Error("请输入中文"))},validateEmail:function(e,t,a){d.test(t)?a():a(new Error("请输入正确的邮箱"))},validatePhone:function(e,t,a){console.log(t),p.test(t)?a():a(new Error("请输入正确的手机号码"))},validateUrl:function(e,t,a){m.test(t)?a():a(new Error("请输入正确url格式"))},validateIsUrl:function(e,t,a){c.test(t)?a():a(new Error("请输入正确url格式"))},validateNumberAcCn:function(e,t,a){c.test(t)?a():a(new Error("请输入中文数字字母的格式"))},validateDivide70:function(e,t,a){t%70!=0?a(new Error("请输入70的倍数")):a()}}}}]);