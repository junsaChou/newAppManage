(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1103cfb8"],{"03cb":function(t,e,i){},"0b79":function(t,e,i){"use strict";var n=i("5b03"),a=i.n(n);a.a},"1fb0":function(t,e,i){},"272e":function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("VueDrr",{staticClass:"element-drr-wrapper",attrs:{x:t.element.x,y:t.element.y,w:t.element.w,h:t.element.h,handles:t.handles,active:t.element.active,minw:80,minh:18,parent:!0,rotatable:!1},on:{dragstop:t.handleDragStop,resizing:t.handleResizing,resizestop:t.handleResizeStop,deactivated:t.handleDeactivate,activated:t.handleActivated}},[t._t("default")],2)},a=[],s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"z-drr-container",class:{"z-draggable":t.draggable,"z-resizable":t.resizable,"z-rotatable":t.rotatable,"z-active":t.enabled,"z-dragging":t.dragging,"z-resizing":t.resizing,"z-rotating":t.rotating},style:t.style,on:{mousedown:t.elmDown}},[t.rotatable?i("div",{staticClass:"z-rotateable-handle",style:{display:t.enabled?"block":"none"},on:{touchstart:function(e){return e.preventDefault(),e.stopPropagation(),t.elmDown(e)},mousedown:function(e){e.stopPropagation(),e.preventDefault(),t.rotating=!0},dblclick:t.fillParent}}):t._e(),t._l(t.handles,(function(e){return t.resizable?i("div",{key:e,staticClass:"z-resizeable-handle",class:"z-handle-"+e,style:{display:t.enabled?"block":"none"},on:{touchstart:function(i){return i.stopPropagation(),i.preventDefault(),t.handleDown(e,i)},mousedown:function(i){return i.stopPropagation(),i.preventDefault(),t.handleResizeStart(e,i)}}}):t._e()})),t._t("default")],2)},l=[];i("4de4"),i("c975"),i("a9e3"),i("d3b7"),i("4d63"),i("ac1f"),i("25f0"),i("6062"),i("3ca3"),i("ddb0"),i("7db0");function o(t){return"function"===typeof t||"[object Function]"===Object.prototype.toString.call(t)}function r(t,e,i){var n=t,a=["matches","webkitMatchesSelector","mozMatchesSelector","msMatchesSelector","oMatchesSelector"].find((function(t){return o(n[t])}));if(!o(n[a]))return!1;do{if(n[a](e))return!0;if(n===i)return!1;n=n.parentNode}while(n);return!1}var h={name:"VueDrr",props:{active:{type:Boolean,default:!1},draggable:{type:Boolean,default:!0},resizable:{type:Boolean,default:!0},rotatable:{type:Boolean,default:!0},canDeactive:{type:Boolean,default:!0},w:{type:[Number],default:200},h:{type:[Number,String],default:28,validator:function(t){var e="string"===typeof t?"auto"===t:t>=0;return e}},ratio:{type:[Number,String]},contains:{type:Boolean,default:!1},minw:{type:Number,default:28,validator:function(t){return t>0}},minh:{type:Number,default:28,validator:function(t){return t>0}},angle:{type:Number,default:0,validator:function(t){return"number"===typeof t}},x:{type:Number,default:0,validator:function(t){return"number"===typeof t}},y:{type:Number,default:0,validator:function(t){return"number"===typeof t}},z:{type:[String,Number],default:"auto",validator:function(t){var e="string"===typeof t?"auto"===t:t>=0;return e}},handles:{type:Array,default:function(){return["n","e","s","w","nw","ne","se","sw"]},validator:function(t){var e=new Set(["n","e","s","w","nw","ne","se","sw"]);return new Set(t.filter((function(t){return e.has(t)}))).size===t.length}},dragHandle:{type:String,default:null},dragCancel:{type:String,default:null},axis:{type:String,default:"both",validator:function(t){return-1!==["x","y","both"].indexOf(t)}},grid:{type:Array,default:function(){return[1,1]}},parent:{type:Boolean,default:!1},overflowY:{type:String,default:""}},data:function(){return{top:this.y,left:this.x,width:this.w,height:this.h,rotateAngle:this.angle,resizing:!1,dragging:!1,rotating:!1,enabled:this.active,handle:null,zIndex:this.z,parentW:9999,parentH:9999,mouseX:0,mouseY:0,lastMouseX:0,lastMouseY:0,mouseOffX:0,mouseOffY:0,elmX:0,elmY:0,elmW:0,elmH:0}},computed:{style:function(){return{top:this.top+"px",left:this.left+"px",width:this.width+"px",height:this.height+"px",transform:"rotate("+this.rotateAngle+"deg)",zIndex:this.zIndex,overflowY:this.overflowY,overflowX:""}}},watch:{active:function(t){this.enabled=t},x:function(t){this.left=t,this.elmX=t},y:function(t){this.top=t,this.elmY=t},z:function(t){(t>=0||"auto"===t)&&(this.zIndex=t)},w:function(t){this.width=t,this.elmW=t},h:function(t){this.height=t,this.elmH=t},angle:function(t){this.rotateAngle=t}},mounted:function(){var t=document.querySelector(".editor-mask")||document.documentElement;t.addEventListener("mousedown",this.deselect,!1),t.addEventListener("mousemove",this.handleMove,!1),t.addEventListener("mouseup",this.handleUp,!1),t.addEventListener("touchmove",this.handleMove,!1),t.addEventListener("touchend touchcancel",this.deselect,!1),t.addEventListener("touchstart",this.handleUp,!1),this.elmX=parseInt(this.$el.style.left),this.elmY=parseInt(this.$el.style.top),this.elmW=this.$el.offsetWidth||this.$el.clientWidth,this.elmH=this.$el.offsetHeight||this.$el.clientHeight,this.reviewDimensions()},beforeDestroy:function(){var t=document.querySelector(".editor-mask")||document.documentElement;t.removeEventListener("mousedown",this.deselect,!1),t.removeEventListener("mousemove",this.handleMove,!1),t.removeEventListener("mouseup",this.handleUp,!1),t.addEventListener("touchmove",this.handleMove,!1),t.addEventListener("touchend touchcancel",this.deselect,!1),t.addEventListener("touchstart",this.handleUp,!1)},methods:{reviewDimensions:function(){if(this.minw>this.w&&(this.width=this.minw),this.minh>this.h&&(this.height=this.minh),this.parent){var t=parseInt(this.$el.parentNode.clientWidth,10),e=parseInt(this.$el.parentNode.clientHeight,10);this.parentW=t,this.parentH=e,this.w>this.parentW&&(this.width=t),this.h>this.parentH&&(this.height=e),this.x+this.w>this.parentW&&(this.width=t-this.x),this.y+this.h>this.parentH&&(this.height=e-this.y),this.elmW=this.width,this.elmH=this.height}this.$emit("resizing",this.left,this.top,this.width,this.height)},elmDown:function(t){var e=t.target||t.srcElement;if(this.$el.contains(e)){if(this.dragHandle&&!r(e,this.dragHandle,this.$el)||this.dragCancel&&r(e,this.dragCancel,this.$el))return;this.reviewDimensions(),this.enabled||(this.enabled=!0,this.$emit("activated"),this.$emit("update:active",!0)),this.draggable&&(this.dragging=!0)}},deselect:function(t){-1!==t.type.indexOf("touch")?(this.mouseX=t.changedTouches[0].clientX,this.mouseY=t.changedTouches[0].clientY):(this.mouseX=t.pageX||t.clientX+document.documentElement.scrollLeft,this.mouseY=t.pageY||t.clientY+document.documentElement.scrollTop),this.lastMouseX=this.mouseX,this.lastMouseY=this.mouseY;var e=t.target||t.srcElement,i=new RegExp("z-handle-([nesw]{1, 2})","");this.$el.contains(e)||i.test(e.className)||this.enabled&&this.canDeactive&&(this.enabled=!1,this.$emit("deactivated"),this.$emit("update:active",!1))},handleResizeStart:function(t,e){this.handle=t,e.stopPropagation&&e.stopPropagation(),e.preventDefault&&e.preventDefault(),this.resizing=!0},handleDown:function(t,e){this.handle=t,e.stopPropagation&&e.stopPropagation(),e.preventDefault&&e.preventDefault(),this.resizing=!0},fillParent:function(t){var e=this;if(this.parent&&this.resizable&&this.maximize){var i=!1,n=function t(){i||window.requestAnimationFrame(t),"x"===e.axis?e.width===e.parentW&&0===e.left&&(i=!0):"y"===e.axis?e.height===e.parentH&&0===e.top&&(i=!0):"both"===e.axis&&e.width===e.parentW&&e.height===e.parentH&&0===e.top&&0===e.left&&(i=!0),"x"!==e.axis&&"both"!==e.axis||(e.width<e.parentW&&(e.width++,e.elmW++),e.left>0&&(e.left--,e.elmX--)),"y"!==e.axis&&"both"!==e.axis||(e.height<e.parentH&&(e.height++,e.elmH++),e.top>0&&(e.top--,e.elmY--)),e.$emit("resizing",e.left,e.top,e.width,e.height)};window.requestAnimationFrame(n)}},getOrigin:function(){var t=this.$el.getBoundingClientRect();return{x:(t.left+t.right)/2,y:(t.bottom+t.top)/2}},handleMove:function(t){var e=this.lastMouseX,i=this.lastMouseY,n=-1!==t.type.indexOf("touchmove");this.mouseX=n?t.touches[0].clientX:t.pageX||t.clientX+document.documentElement.scrollLeft,this.mouseY=n?t.touches[0].clientY:t.pageY||t.clientY+document.documentElement.scrollTop;var a=this.mouseX-this.lastMouseX+this.mouseOffX,s=this.mouseY-this.lastMouseY+this.mouseOffY;this.mouseOffX=this.mouseOffY=0,this.lastMouseX=this.mouseX,this.lastMouseY=this.mouseY;var l=a,o=s;if(this.resizing)this.handle.indexOf("n")>=0&&(this.elmH-o<this.minh?this.mouseOffY=o-(s=this.elmH-this.minh):this.parent&&this.elmY+o<0&&(this.mouseOffY=o-(s=-this.elmY)),this.elmY+=s,this.elmH-=s),this.handle.indexOf("s")>=0&&(this.elmH+o<this.minh?this.mouseOffY=o-(s=this.minh-this.elmH):this.parent&&this.elmY+this.elmH+o>this.parentH&&(this.mouseOffY=o-(s=this.parentH-this.elmY-this.elmH)),this.elmH+=s),this.handle.indexOf("w")>=0&&(this.elmW-l<this.minw?this.mouseOffX=l-(a=this.elmW-this.minw):this.parent&&this.elmX+l<0&&(this.mouseOffX=l-(a=-this.elmX)),this.elmX+=a,this.elmW-=a),this.handle.indexOf("e")>=0&&(this.elmW+l<this.minw?this.mouseOffX=l-(a=this.minw-this.elmW):this.parent&&this.elmX+this.elmW+l>this.parentW&&(this.mouseOffX=l-(a=this.parentW-this.elmX-this.elmW)),this.elmW+=a),this.left=Math.round(this.elmX/this.grid[0])*this.grid[0],this.top=Math.round(this.elmY/this.grid[1])*this.grid[1],this.width=Math.round(this.elmW/this.grid[0])*this.grid[0],this.height=Math.round(this.elmH/this.grid[1])*this.grid[1],this.$emit("resizing",this.left,this.top,this.width,this.height);else if(this.dragging)this.parent&&(this.elmX+l<0?this.mouseOffX=l-(a=-this.elmX):this.elmX+this.elmW+l>this.parentW&&(this.mouseOffX=l-(a=this.parentW-this.elmX-this.elmW)),this.elmY+o<0?this.mouseOffY=o-(s=-this.elmY):this.elmY+this.elmH+o>this.parentH&&(this.mouseOffY=o-(s=this.parentH-this.elmY-this.elmH))),this.elmX+=a,this.elmY+=s,"x"!==this.axis&&"both"!==this.axis||(this.left=Math.round(this.elmX/this.grid[0])*this.grid[0]),"y"!==this.axis&&"both"!==this.axis||(this.top=Math.round(this.elmY/this.grid[1])*this.grid[1]),this.$emit("dragging",this.left,this.top);else if(this.rotating){var r=this.getOrigin(),h=Math.atan2(i-r.y,e-r.x),c=Math.atan2(this.mouseY-r.y,this.mouseX-r.x);this.rotateAngle+=Math.round(180*(c-h)/Math.PI),this.$emit("rotating",this.rotateAngle)}},handleUp:function(t){-1!==t.type.indexOf("touch")&&(this.lastMouseX=t.changedTouches[0].clientX,this.lastMouseY=t.changedTouches[0].clientY),this.handle=null,this.resizing&&(this.resizing=!1,this.$emit("resizestop",this.left,this.top,this.width,this.height)),this.dragging&&(this.dragging=!1,this.$emit("dragstop",this.left,this.top)),this.rotating&&(this.rotating=!1,this.$emit("rotatestop",this.rotateAngle)),this.elmX=this.left,this.elmY=this.top}}},c=h,u=(i("cf9a"),i("2877")),d=Object(u["a"])(c,s,l,!1,null,"4a25297a",null),m=d.exports,f={name:"ElementDrr",components:{VueDrr:m},props:{element:{type:Object,default:function(){}},handles:{type:Array,default:function(){return["n","e","s","w","nw","ne","se","sw"]}}},watch:{element:{handler:function(t){var e=this;this.$nextTick((function(){e.updateHeight()}))},deep:!0}},methods:{updateHeight:function(){var t=this;if("text"===this.element.type){var e=this.$el;this.$nextTick((function(){var i=Math.ceil(e.parentNode.getBoundingClientRect().height),n=Math.ceil(e.querySelector(".image-rich-text").getBoundingClientRect().height);t.element.y+n>=i&&(t.element.y=i-n),e.style.height=n+"px",t.element.h=n}))}},handleDragStop:function(t,e){this.element.x===t&&this.element.y===e||(this.element.x=t,this.element.y=e)},handleResizing:function(){"text"===this.element.type&&this.updateHeight()},handleResizeStop:function(t,e,i,n){this.element.x===t&&this.element.y===e&&this.element.w===i&&this.element.h===n||(this.element.x=t,this.element.y=e,this.element.w=i,"text"===this.element.type?this.updateHeight():this.element.h=n)},handleDeactivate:function(){this.element.active=!1},handleActivated:function(){this.element.active=!0,this.$emit("updateActiveEle",this.element)}}},g=f,p=(i("c338"),Object(u["a"])(g,n,a,!1,null,null,null));e["a"]=p.exports},2878:function(t,e,i){},4762:function(t,e,i){"use strict";var n=i("8e80"),a=i.n(n);a.a},"4e87":function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"image-rich-text",style:t.element.style,attrs:{spellcheck:"false",contenteditable:"true"},domProps:{innerHTML:t._s(t.innerText)},on:{focus:t.handleFocus,keydown:function(t){return t.stopPropagation()},keyup:function(e){return e.stopPropagation(),t.emitInput(e)},paste:function(e){return t.handlePaste(e)},click:function(t){t.stopPropagation()}}})},a=[],s=(i("ac1f"),i("5319"),i("ed08")),l={name:"ImageRichText",props:{value:{type:String,default:"请输入文本"},element:{type:Object,default:function(){return{style:{}}}},activeEleText:{type:Object,default:function(){}}},data:function(){return{innerText:this.value.replace(/\n/g,"<br>")}},watch:{value:function(t){this.innerText=t}},methods:{emitInput:function(t){this.$emit("input",t.target.innerHTML),this.keepCursorLast(t)},handlePaste:function(t){this.$emit("input",Object(s["c"])(t)),this.keepCursorLast(t)},keepCursorLast:function(t){this.$nextTick((function(){Object(s["d"])(t.target)}))},handleFocus:function(){this.activeEleText.active=!0}}},o=l,r=(i("0b79"),i("2877")),h=Object(r["a"])(o,n,a,!1,null,null,null);e["a"]=h.exports},"5b03":function(t,e,i){},"64a1":function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"image-synthesizer"},[i("Hints",[i("template",{slot:"hintName"},[t._v("图片合成")]),i("template",{slot:"hintInfo"},[i("p",[t._v("基于VueDRR拖拽功能，在其上通过叠加图片、文字等，实现图片的叠加伪合成功能")]),i("p",[t._v("VueDRR：基于vue-draggable-resizable的vue组件，可以实现拖动、拉伸和旋转功能")])])],2),i("el-row",{attrs:{gutter:20}},[i("el-col",{attrs:{span:16}},[i("el-card",{attrs:{shadow:"always"}},[i("div",{staticClass:"title",attrs:{slot:"header"},slot:"header"},[t._v("合成区域")]),i("div",{staticClass:"box-wrapper"},[i("div",{staticClass:"drag-container",style:t.containerStyle},t._l(t.elements,(function(e,n){return i("ElementDrr",{key:n,style:t.elementZIndex(e.type),attrs:{element:e,handles:t.dragHandles(e.type)},on:{updateActiveEle:t.updateActiveEle}},["image"===e.type?i("img",{attrs:{src:e.src,draggable:"false"}}):t._e(),"text"===e.type?i("ImageRichText",{attrs:{element:e,"active-ele-text":t.activeEleText},model:{value:e.text,callback:function(i){t.$set(e,"text",i)},expression:"item.text"}}):t._e()],1)})),1)])])],1),i("el-col",{attrs:{span:8}},[i("el-card",{attrs:{shadow:"always"}},[i("div",{staticClass:"title",attrs:{slot:"header"},slot:"header"},[t._v("设置区域")]),i("div",{staticClass:"box-content"},[i("el-form",{staticClass:"form-wrapper",attrs:{"label-width":"70px"}},[i("el-form-item",{attrs:{label:"选择底图"}},[i("UploadImage",{attrs:{"btn-name":"选择底图"},on:{"on-success":t.handleSuccess}})],1),i("el-form-item",{attrs:{label:"添加文本"}},[i("el-button",{on:{click:t.addText}},[t._v("添加文本")])],1),i("el-form-item",{attrs:{label:"添加图片"}},[i("UploadImage",{on:{"on-success":t.handleAddImage}})],1),i("el-form-item",{attrs:{label:"删除元素"}},[i("el-button",{attrs:{type:"danger"},on:{click:t.deleteActiveEle}},[t._v("删除元素")])],1)],1),"text"===t.activeEle.type?i("TextSetting",{attrs:{"active-ele-text":t.activeEleText}}):t._e()],1)])],1)],1)],1)},a=[],s=(i("4de4"),i("ac1f"),i("5319"),i("b522")),l=i("272e"),o=i("4e87"),r=i("892b"),h=i("6b45"),c=i("ed08"),u={name:"ImageSynthesizer",components:{Hints:s["a"],ElementDrr:l["a"],ImageRichText:o["a"],TextSetting:r["a"],UploadImage:h["a"]},data:function(){return{container:{width:0,height:0,bgImageSrc:"https://cdn.jsdelivr.net/gh/baimingxuan/media-store/images/img01.jpg"},elements:[],activeEle:{},eleNum:0}},computed:{containerStyle:function(){return{width:this.container.width+"px",height:this.container.height+"px",backgroundImage:"url('"+this.container.bgImageSrc+"')"}},activeEleText:function(){if("text"===this.activeEle.type)return this.activeEle}},created:function(){this.getDragContainerSize(1920,1200),this.addText(),this.addImage({active:!1,src:"https://cdn.jsdelivr.net/gh/baimingxuan/media-store/images/img05.jpeg",size:53248,width:132,height:132})},methods:{dragHandles:function(t){if("text"===t)return["e","w"]},elementZIndex:function(t){var e=1;switch(t){case"text":e=3;break;case"image":e=2;break}return{zIndex:e}},handleSuccess:function(t){var e=this;this.container.bgImageSrc=t;var i=new Image;i.src=t,i.onload=function(){e.getDragContainerSize(i.width,i.height)}},getDragContainerSize:function(t,e){var i=850,n=550,a=Object(c["b"])(t,e,i,n);this.container.width=a.width,this.container.height=a.height},addText:function(){var t=++this.eleNum,e={active:!0,text:"请输入文本",type:"text",tag:"text_"+t,x:300,y:100,w:180,h:36,style:{textAlign:"left",lineHeight:"24px",fontSize:"24px",fontFamily:"微软黑体",fontWeight:400,color:"#f70707",backgroundColor:"#05f8e8",overflow:"hidden"}};this.elements.length>4?this.$message.warning("图片上最多叠加5个元素！"):(this.elements.push(e),this.updateActiveEle(e))},addImage:function(t){var e=++this.eleNum,i={active:t.active,type:"image",tag:"image_"+e,x:320,y:300,w:parseInt(t.width),h:parseInt(t.height),src:t.src,size:t.size};this.elements.length>4?this.$message.warning("图片上最多叠加5个元素！"):(this.elements.push(i),t.active&&this.updateActiveEle(i))},handleAddImage:function(t){var e=this,i=t.replace("data:image/jpeg;base64,","").length,n=parseInt(i-i/8*2),a=new Image;a.src=t,a.onload=function(){var i=Object(c["b"])(a.width,a.height,parseInt(e.container.width/4),parseInt(e.container.height/4));e.addImage({active:!0,src:t,size:n,width:i.width,height:i.height})}},updateActiveEle:function(t){this.activeEle=t},deleteActiveEle:function(){var t=this,e=this.elements.filter((function(e){return e.tag!==t.activeEle.tag}));this.$nextTick((function(){t.elements=e})),this.updateActiveEle({})}}},d=u,m=(i("d5ff"),i("2877")),f=Object(m["a"])(d,n,a,!1,null,null,null);e["default"]=f.exports},"892b":function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"text-setting-wrapper"},[i("el-form",{attrs:{"label-width":"70px"}},[i("el-form-item",{attrs:{label:"文本"}},[i("ImageRichText",{staticClass:"text-editable",attrs:{"active-ele-text":t.activeEleText},model:{value:t.activeEleText.text,callback:function(e){t.$set(t.activeEleText,"text",e)},expression:"activeEleText.text"}})],1),i("el-form-item",{attrs:{label:"字体"}},[i("el-select",{attrs:{size:"small"},model:{value:t.activeEleText.style.fontFamily,callback:function(e){t.$set(t.activeEleText.style,"fontFamily",e)},expression:"activeEleText.style.fontFamily"}},t._l(t.fontFamilyData,(function(t){return i("el-option",{key:t.value,style:{fontFamily:t.value},attrs:{label:t.value,value:t.value}})})),1)],1),i("el-form-item",{attrs:{label:"字号"}},[i("el-select",{attrs:{size:"small"},model:{value:t.activeEleText.style.fontSize,callback:function(e){t.$set(t.activeEleText.style,"fontSize",e)},expression:"activeEleText.style.fontSize"}},t._l(t.fontSizeData,(function(t){return i("el-option",{key:t.value,attrs:{label:t.value,value:t.value}})})),1)],1),i("el-form-item",{attrs:{label:"颜色"}},[i("div",{staticClass:"color-box"},[i("i",{staticClass:"vue-dsn-icon-wenzise color-icon",style:{color:t.activeEleText.style.color}}),i("el-color-picker",{model:{value:t.activeEleText.style.color,callback:function(e){t.$set(t.activeEleText.style,"color",e)},expression:"activeEleText.style.color"}})],1),i("div",{staticClass:"color-box"},[i("i",{staticClass:"vue-dsn-icon-beijingse color-icon icon-bg",style:{color:t.activeEleText.style.backgroundColor}}),i("el-color-picker",{model:{value:t.activeEleText.style.backgroundColor,callback:function(e){t.$set(t.activeEleText.style,"backgroundColor",e)},expression:"activeEleText.style.backgroundColor"}})],1),i("div",{staticClass:"style-box"},[i("span",{class:["style-item",t.fontWeight?"active":""],on:{click:t.setFontWeight}},[i("i",{staticClass:"vue-dsn-icon-jiacu style-icon"})]),i("div",{staticClass:"style-item"},[i("el-dropdown",{attrs:{trigger:"click"},on:{command:t.handleCommand}},[i("i",{staticClass:"vue-dsn-icon-duiqi style-icon"}),i("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[i("el-dropdown-item",{style:t.setAlignActive("left"),attrs:{command:"left"}},[t._v("左对齐")]),i("el-dropdown-item",{style:t.setAlignActive("center"),attrs:{command:"center"}},[t._v("居中")]),i("el-dropdown-item",{style:t.setAlignActive("right"),attrs:{command:"right"}},[t._v("右对齐")])],1)],1)],1)])]),i("el-form-item",[i("el-button",{attrs:{type:"primary"},on:{click:t.downloadImage}},[t._v("文本生成图片")])],1)],1)],1)},a=[],s=(i("d3b7"),i("ac1f"),i("3ca3"),i("1276"),i("ddb0"),i("2b3d"),i("ed08")),l=i("4e87"),o=[{value:"黑体"},{value:"宋体"},{value:"仿宋"},{value:"楷体"},{value:"隶书"},{value:"微软雅黑"},{value:"方正姚体"}],r=[{value:"12px"},{value:"14px"},{value:"16px"},{value:"18px"},{value:"24px"},{value:"32px"},{value:"48px"}],h={name:"TextSetting",components:{ImageRichText:l["a"]},props:{activeEleText:{type:Object,default:function(){}}},data:function(){return{fontFamilyData:o,fontSizeData:r}},computed:{fontWeight:function(){return 400!==+this.activeEleText.style.fontWeight}},watch:{activeEleText:{handler:function(t){this.activeEleText.style.lineHeight=t.style.fontSize},deep:!0}},methods:{setFontWeight:function(){400===+this.activeEleText.style.fontWeight?this.activeEleText.style.fontWeight=600:this.activeEleText.style.fontWeight=400},handleCommand:function(t){this.activeEleText.style.textAlign=t},setAlignActive:function(t){return this.activeEleText.style.textAlign===t?{backgroundColor:"#409eff",color:"#fff"}:{backgroundColor:"",color:"#333"}},textBecomeImg:function(t){var e=document.createElement("canvas");e.width=t.w,e.height=t.h;var i=e.getContext("2d"),n=4,a=8;i.fillStyle=t.style.backgroundColor||"transparent",i.fillRect(0,0,e.width,e.height),i.fillStyle=t.style.color,i.font=t.style.fontWeight+" "+t.style.fontSize+" "+t.style.fontFamily,i.textBaseline="top",i.textAlign=t.style.textAlign;for(var s,l=t.text.split(""),o="",r=[],h=e.width-2*a,c=0;c<l.length;c++)i.measureText(o).width<h&&i.measureText(o+l[c]).width<=h?o+=l[c]:(r.push(o),o=l[c]);r.push(o),"left"===i.textAlign?s=a:"center"===i.textAlign?s=h/2:"right"===i.textAlign&&(s=h);for(var u=0;u<r.length;u++)i.fillText(r[u],s,parseInt(t.style.fontSize)*u+n,h);return e.toDataURL("image/png")},downloadImage:function(){var t=this.textBecomeImg(this.activeEleText),e=Object(s["a"])(t),i=document.createElement("a"),n=document.createEvent("HTMLEvents");n.initEvent("click",!0,!0),i.download="image.png",i.href=URL.createObjectURL(e),i.dispatchEvent(new MouseEvent("click",{bubbles:!0,cancelable:!0,view:window}))}}},c=h,u=(i("4762"),i("2877")),d=Object(u["a"])(c,n,a,!1,null,null,null);e["a"]=d.exports},"8e80":function(t,e,i){},c338:function(t,e,i){"use strict";var n=i("03cb"),a=i.n(n);a.a},cf9a:function(t,e,i){"use strict";var n=i("2878"),a=i.n(n);a.a},d5ff:function(t,e,i){"use strict";var n=i("1fb0"),a=i.n(n);a.a},ed08:function(t,e,i){"use strict";i.d(e,"c",(function(){return n})),i.d(e,"d",(function(){return s})),i.d(e,"a",(function(){return l})),i.d(e,"b",(function(){return o}));i("a15b"),i("d81d"),i("d3b7"),i("ac1f"),i("38cf"),i("5319"),i("1276"),i("5cc6"),i("9a8c"),i("a975"),i("735e"),i("c1ac"),i("d139"),i("3a7b"),i("d5d6"),i("82f8"),i("e91f"),i("60bd"),i("5f96"),i("3280"),i("3fcc"),i("ca91"),i("25a1"),i("cd26"),i("3c5d"),i("2954"),i("649e"),i("219c"),i("170b"),i("b39a"),i("72f7");function n(t){function e(t){var e=a(t).replace(/</g,"&lt;").replace(/>/g,"&gt;"),i=e.split(/\r\n|\r|\n/);return i?i.map((function(t){return t.length>0?"<div>"+t+"</div>":"<div><br></div>"})).join(""):e}var i="",n=" ".repeat(2);if(t.preventDefault(),t.clipboardData)i=(t.originalEvent||t).clipboardData.getData("text/plain").replace(/\t/g,n),document.execCommand("insertHtml",!1,e(i));else if(window.clipboardData)if(i=window.clipboardData.getData("Text").replace(/\t/g,n),document.selection)document.selection.createRange().pasteHTML(e(i));else if(window.getSelection){var s=window.getSelection(),l=s.getRangeAt(0),o=document.createElement("span");o.innerHTML="&#FEFF;",l.deleteContents(),l.insertNode(o);var r=document.body.createTextRange();r.moveToElementText(o),o.parentNode.removeChild(o),r.pasteHTML(e(i)),r.collapse(!1),r.select()}return e(i)}function a(t){return t.replace(/<(\/?)p>/g,"<$1div>")}function s(t){if(window.getSelection){t.focus();var e=window.getSelection();e.selectAllChildren(t),e.collapseToEnd()}else if(document.selection){var i=document.selection.createRange();i.moveToElementText(t),i.collapse(!1),i.select()}}function l(t){for(var e=window.atob(t.split(",")[1]),i=[],n=0;n<e.length;n++)i.push(e.charCodeAt(n));return new Blob([new Uint8Array(i)],{type:"image/png"})}function o(t,e,i,n){var a=0,s=0,l=0;if(t>e)if(t>=i){var o=e*(i/t);o>=i?(a=t*(n/e),s=n,l=e/n):(a=i,s=o,l=t/i)}else a=t,s=e,l=1;else e>=n?(a=t*(n/e),s=n,l=e/n):(a=t,s=e,l=1);return{width:a,height:s,ratio:l}}}}]);