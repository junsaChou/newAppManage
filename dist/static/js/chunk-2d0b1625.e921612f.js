(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0b1625"],{"202c":function(e,t,a){"use strict";a.r(t);var l=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"transfer-wrapper"},[a("Hints",[a("template",{slot:"hintName"},[e._v("Transfer穿梭框")]),a("template",{slot:"hintInfo"},[a("p",[e._v("element-Transfer：使用elementUI的Transfer组件，可用于对列表数据进行选中、取消等操作")]),a("p",[e._v("地址：访问 "),a("el-link",{attrs:{type:"success",href:"https://element.eleme.cn/#/zh-CN/component/transfer",target:"_blank"}},[e._v("element-Transfer")])],1)])],2),a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:12}},[a("el-card",{attrs:{shadow:"always"}},[a("div",{staticClass:"title",attrs:{slot:"header"},slot:"header"},[e._v("基础用法")]),a("div",{staticClass:"content-box",staticStyle:{height:"360px"}},[a("el-transfer",{attrs:{data:e.data},model:{value:e.value1,callback:function(t){e.value1=t},expression:"value1"}})],1)])],1),a("el-col",{attrs:{span:12}},[a("el-card",{attrs:{shadow:"always"}},[a("div",{staticClass:"title",attrs:{slot:"header"},slot:"header"},[e._v("可自定义")]),a("div",{staticClass:"content-box",staticStyle:{height:"360px"}},[a("el-transfer",{attrs:{filterable:"",data:e.data,titles:["Source","Target"],"button-texts":["到左边","到右边"],format:{noChecked:"${total}",hasChecked:"${checked}/${total}"},"left-default-checked":[2,6],"right-default-checked":[1]},on:{change:e.handleChange},model:{value:e.value2,callback:function(t){e.value2=t},expression:"value2"}})],1)])],1)],1)],1)},s=[],n=a("b522"),r={name:"TransferPage",components:{Hints:n["a"]},data:function(){var e=function(){for(var e=[],t=1;t<10;t++)e.push({key:t,label:"备选项 ".concat(t)});return e};return{data:e(),value1:[1,5],value2:[1,5]}},methods:{handleChange:function(e,t,a){console.log(e,t,a)}}},c=r,o=a("2877"),i=Object(o["a"])(c,l,s,!1,null,null,null);t["default"]=i.exports}}]);