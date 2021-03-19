<template>
  <div class="table-classic-wrapper">
    <!-- <Hints>
      <template slot="hintName">Table表格组件</template>
      <template slot="hintInfo">
        <p>element-Table：使用elementUI的Table组件，可用于展示多条结构类似的数据，并对其进行相关操作</p>
        <p>地址：访问 <el-link type="success" href="https://element.eleme.cn/2.13/TableClassic.vue#/zh-CN/component/table" target="_blank">element-Table</el-link></p>
      </template>
    </Hints>-->
    <el-card shadow="always">
      <!-- 操作栏 -->
      <div class="control-btns">
        <el-switch v-model="isReview" inactive-text="逐张审核"></el-switch>
        <el-button type="primary" style="margin-left:20px">返回</el-button>
        <!--  <el-button type="primary" @click="handleImport">导入数据</el-button>
        <el-button type="primary" @click="exportVisible = true">导出数据</el-button>
        <el-button type="danger" @click="batchDelete">批量删除</el-button>-->
      </div>
      <!-- 审核列表 -->
      <el-row :gutter="20">
        <el-col :span="6" v-for="(k,i) in formList" :key="i">
          <el-card shadow="always" :body-style="{padding: '0px'}">
            <div slot="header" class="title">
              <img
                width="200"
                src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                class="image"
              />
            </div>

            <!-- <div slot="header" class="title">图片拖拽上传</div> -->
            <div class="content-box-wrap">
              <div v-for="(item,index) in reviewList" :key="index" class="text item">
                <span>{{item.label}}:</span>
                {{item.value }}
              </div>
              <el-form ref="form" :model="k.form">
                <el-form-item label="是否通过">
                  <el-radio-group v-model="k.form.resource">
                    <el-radio label="通过"></el-radio>
                    <el-radio label="拒绝"></el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label>
                  <el-input type="textarea" v-model="k.form.desc" placeholder="请输入审核意见"></el-input>
                </el-form-item>
              </el-form>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
    <div class="control-btns control-btns-btm">
      <el-button type="primary" style="width:200px;">一键提交</el-button>
      <!--  <el-button type="primary" @click="handleImport">导入数据</el-button>
    <el-button type="primary" @click="exportVisible = true">导出数据</el-button>
      <el-button type="danger" @click="batchDelete">批量删除</el-button>-->
    </div>
    <div class="control-footer">
      <el-form ref="formMap" :model="formMap">
        <el-form-item label="是否通过">
          <el-radio-group v-model="formMap.resource">
            <el-radio label="通过"></el-radio>
            <el-radio label="拒绝"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label>
          <el-input type="textarea" v-model="formMap.desc" placeholder="请输入审核意见"></el-input>
        </el-form-item>
        <el-form-item label >
          <el-button type="primary" style="width:30%;margin:0 30px;">取消</el-button>
          <el-button type="primary" style="width:30%;margin:0 30px;" >一键提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getTableList } from "../../api";

export default {
  name: "Table",

  data() {
    return {
      isReview: true, //是否逐张审核
      reviewList: [
        { label: "拒绝原因", value: "小子" },
        { label: "拒绝原因", value: "小子" },
        { label: "拒绝原因", value: "小子" },
        { label: "拒绝原因", value: "小子" },
        { label: "拒绝原因", value: "小子" },
        { label: "拒绝原因", value: "小子" }
      ],
      formList: [
        { form: { resource: "", desc: "" } },
        { form: { resource: "", desc: "" } },
        { form: { resource: "", desc: "" } },
        { form: { resource: "", desc: "" } }
      ],
      formMap: {
        resource: "",
        desc: ""
      }
    };
  },
  created() {},
  methods: {
    // 多选操作
  }
};
</script>

<style lang="less">
.table-classic-wrapper {
  .el-card {
    img {
      width: 160px;
    }
    // .content-box{
    //   // flex-direction: column;
    // }
    .content-box-wrap {
      padding: 12px;
    }
    min-height: 500px!important;
    .text {
      font-size: 14px;
    }

    .item {
      padding: 4px 0;
    }
  }
  .control-btns {
    margin-bottom: 20px;
  }
  .control-btns-btm {
    text-align: center;
    padding-top: 30px;
  }
  .control-footer {
    width: 300px;
  }
  .search-form {
    padding-top: 18px;
    margin-bottom: 15px;
    background-color: #f7f8fb;
  }
  .el-table thead {
    font-weight: 600;
    th {
      background-color: #f2f3f7;
    }
  }
  .dialog-form {
    .el-input {
      width: 380px;
    }
    .footer-item {
      margin-top: 50px;
      text-align: right;
    }
  }
  .upload-box,
  .export-data {
    width: 300px;
    margin: 0 auto 30px;
  }
  .upload-box {
    width: 156px;
    .files-upload {
      color: #20a0ff;
    }
  }
  .hints {
    font-size: 12px;
    color: #aaa;
    text-align: center;
  }
}
</style>
