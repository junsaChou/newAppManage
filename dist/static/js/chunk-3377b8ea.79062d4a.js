(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3377b8ea"],{"9eb4":function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"rich-text-editor"},[n("Hints",[n("template",{slot:"hintName"},[t._v("富文本编辑器")]),n("template",{slot:"hintInfo"},[n("p",[t._v("wangEditor:基于javascript和css开发的 Web富文本编辑器， 轻量、简洁、易用、开源免费")]),n("p",[t._v("该组件是对wangEditor进行Vue版的二次封装，Vue项目可直接拿来使用")]),n("p",[t._v("官方地址：访问 "),n("el-link",{attrs:{type:"success",href:"http://www.wangeditor.com/",target:"_blank"}},[t._v("wangEditor")])],1)])],2),n("Editor",{attrs:{placeholder:t.placeholder},model:{value:t.content,callback:function(e){t.content=e},expression:"content"}})],1)},o=[],r=n("b522"),a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"editor-wrapper"},[n("div",{ref:"editorEle",staticClass:"editor-container"})])},c=[],s=(n("d3b7"),n("07ac"),n("25f0"),n("1a0b")),l=n.n(s),u={name:"Editor",props:{value:{type:String,default:""},placeholder:{type:String,default:""}},data:function(){return{editor:null}},watch:{value:function(t){this.editor.txt.html(t)}},mounted:function(){var t=this;this.editor=new l.a(this.$refs.editorEle),this.editor.customConfig.onchange=function(e){t.$emit("input",e)},this.editor.customConfig.uploadImgServer="你的上传图片的接口",this.editor.customConfig.uploadFileName="你自定义的文件名",this.editor.customConfig.uploadImgHooks={before:function(t,e,n){},success:function(t,e,n){this.imgUrl=Object.values(n.data).toString()},fail:function(t,e,n){},error:function(t,e){},timeout:function(t,e){},customInsert:function(t,e,n){var i=Object.values(e.data);JSON.stringify(i),t(i)}},this.editor.create(),this.editor.txt.html(this.placeholder)},beforeDestroy:function(){this.editor.destroy()}},d=u,f=(n("bcc2"),n("2877")),p=Object(f["a"])(d,a,c,!1,null,null,null),h=p.exports,m={name:"RichTextEditor",components:{Editor:h,Hints:r["a"]},data:function(){return{content:"",placeholder:'<b style="font-size: 16px">请输入内容...</b>'}}},b=m,v=Object(f["a"])(b,i,o,!1,null,null,null);e["default"]=v.exports},aa2b:function(t,e,n){},bcc2:function(t,e,n){"use strict";var i=n("aa2b"),o=n.n(i);o.a}}]);