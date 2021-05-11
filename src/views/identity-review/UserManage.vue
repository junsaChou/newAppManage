<template>
  <div class="table-classic-wrapper">
    <!-- <Hints>
      <template slot="hintName">Table表格组件</template>
      <template slot="hintInfo">
        <p>element-Table：使用elementUI的Table组件，可用于展示多条结构类似的数据，并对其进行相关操作</p>
        <p>地址：访问 <el-link type="success" href="https://element.eleme.cn/2.13/TableClassic.vue#/zh-CN/component/table" target="_blank">element-Table</el-link></p>
      </template>
    </Hints>-->
    <el-card v-if="showDetail" shadow="always">
      <!-- 操作栏 -->
      <!-- <div class="control-btns">
        <el-button type="primary" @click="handleCreate">新建数据</el-button>
        <el-button type="primary" @click="handleImport">导入数据</el-button>
        <el-button type="primary" @click="exportVisible = true">导出数据</el-button>
        <el-button type="danger" @click="batchDelete">批量删除</el-button>
      </div>-->
      <!-- 查询栏 -->
      <el-form
        ref="searchForm"
        :inline="true"
        :model="listQuery"
        label-width="90px"
        class="search-form"
      >
        <el-form-item label="手机">
          <el-input v-model="listQuery.phone" placeholder="手机" />
        </el-form-item>
        <el-form-item label="审核状态">
          <el-select v-model="listQuery.authState" placeholder="审核状态">
            <el-option value label="全部" />
            <el-option :value="0" label="未认证" />
            <el-option :value="1" label="认证中" />
            <el-option :value="2" label="认证失败" />
            <el-option :value="3" label="认证成功" />
            <!-- <el-option :value="4" label="冻结" /> -->
          </el-select>
        </el-form-item>
        <el-form-item label="公司名称">
          <el-input v-model="listQuery.companyName" placeholder="公司名称" />
        </el-form-item>
        <el-form-item label="申请时间">
          <el-date-picker
            v-model="createMap"
            type="datetimerange"
            :picker-options="pickerOptions"
            value-format="yyyy-MM-dd HH:mm:ss"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right"
            @change="changePicker"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="认证状态">
          <el-select v-model="listQuery.faceRecognition" placeholder="认证状态">
            <el-option value label="全部" />
            <el-option :value="0" label="未识别" />
            <el-option :value="1" label="已识别" />
          </el-select>
        </el-form-item>
        <el-form-item label="渠道">
          <el-input v-model="listQuery.channelSource" placeholder="请填写" />
        </el-form-item>
        <el-form-item label="更新时间">
          <el-date-picker
            type="datetimerange"
            v-model="updateMAp"
            :picker-options="pickerOptions"
            value-format="yyyy-MM-dd HH:mm:ss"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right"
            @change="changePicker"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch">搜索</el-button>
          <el-button type="warning" @click="onReset">重置</el-button>
        </el-form-item>
      </el-form>

      <!-- 表格栏 -->
      <el-table
        ref="multipleTable"
        v-loading="listLoading"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        size="medium"
      >
        <!-- <el-table-column type="selection" width="60" /> -->
        <el-table-column
          show-overflow-tooltip
          prop="id"
          label="ID"
          align="center"
          width="80"
          sortable
        />
        <el-table-column show-overflow-tooltip prop="name" label="姓名" align="center" />
        <el-table-column show-overflow-tooltip prop="phone" label="手机号码" align="center" />
        <el-table-column show-overflow-tooltip prop="userId" label="经理ID" align="center" />
        <el-table-column show-overflow-tooltip label="申请时间" align="center" width="150">
          <template slot-scope="scope">
            <span>{{scope.row.createTime | formatDate}}</span>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip label="更新时间" width="150" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.updateTime | formatDate}}</span>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip label="审核状态" align="center">
          <template
            slot-scope="scope"
          >{{ scope.row.authState == '0'? '未认证': scope.row.authState == '1'? '认证中': scope.row.authState == '2'? '认证失败':'认证成功' }}</template>
        </el-table-column>
        <el-table-column show-overflow-tooltip label="账户状态" align="center">
          <template slot-scope="scope">{{ scope.row.userState == '0'?'冻结':'正常' }}</template>
        </el-table-column>
        <el-table-column show-overflow-tooltip label="认证状态 " align="center">
          <template slot-scope="scope">{{ scope.row.authState > '0'?'已人脸认证':'未人脸识别' }}</template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="channelSource" label="渠道" align="center" />
        <el-table-column show-overflow-tooltip prop="companyName" label="公司名称" align="center" />
        <el-table-column show-overflow-tooltip prop="remark" label="备注" align="center" />
        <!-- <el-table-column prop="hobby" label="爱好" align="center" width="300" show-overflow-tooltip /> -->
        <el-table-column label="操作" fixed="right" align="center" width="80">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="views( scope.row)">审核</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页栏 -->
      <Pagination
        :total="total"
        :page.sync="pageIndex"
        :limit.sync="pageSize"
        @pagination="PostFetchData"
      />
      <!-- 新增/编辑 弹出栏 -->
    </el-card>
    <div class="body" shadow="always" v-else>
      <el-page-header @back="()=>goBack()" content="审核详情"></el-page-header>
      <div class="app-content">
        <div class="details">
          <div class="left">
            <el-card header="个人信息:">
              <el-form
                label-position="left"
                inline
                class="demo-table-expand demo-table-expand-head"
              >
                <template>
                  <el-form-item label="姓名:">
                    <span>{{ authInfoData.name }}</span>
                  </el-form-item>
                </template>
                <template>
                  <el-form-item label="证件号:">
                    <span>{{ authInfoData.idNo }}</span>
                  </el-form-item>
                </template>
                <template>
                  <el-form-item label="公司名称:">
                    <span>{{ authInfoData.companyName }}</span>
                  </el-form-item>
                </template>
                <template>
                  <el-form-item label="所在城市:">
                    <span>{{ authInfoData.companyLocation }}</span>
                  </el-form-item>
                </template>
                <template>
                  <el-form-item label="手机号码:">
                    <span>{{ authInfoData.phone }}</span>
                  </el-form-item>
                </template>
              </el-form>
            </el-card>
            <el-card header="身份信息:">
              <el-form label-position="left" inline class="demo-table-expand-image">
                <template v-for="(item, index) in peopleImg">
                  <div class="item" :key="index">
                    <div class="img">
                      <el-image :src="item"  fit="cover" :preview-src-list="[item]" v-if="item" />
                      <div v-else class="imgNull"> 图片未上传</div>
                    </div>
                    <div class="content">
                      <div class="info">
                        <div>
                          拒绝原因：
                          <span style="color:red">
                            {{
                            peopleAuthInfo[index] || "暂无"
                            }}
                          </span>
                        </div>
                        <div>
                          图片类型：{{
                          {
                          0: "身份证人像面",
                          1: "身份证国徽面",
                          2: "手持身份证",
                          }[index]
                          }}
                        </div>
                      </div>
                      <template>
                        <!-- <div class="radio">
                          <span>是否通过：</span>
                          <el-radio v-model="item.pass" type="success" :label="true">通过</el-radio>
                          <el-radio v-model="item.pass" type="danger" :label="false">拒绝</el-radio>
                        </div>-->
                        <div class="msg">
                          <el-input
                            clearable
                            type="textarea"
                            v-model="peopleAuthInfo[index]"
                            resize="none"
                            placeholder="请输入审核意见且不能输入逗号!"
                            :rules="{
                              required: true,
                              message: '请输入审核意见'
                            }"
                          />
                        </div>
                      </template>
                    </div>
                  </div>
                </template>
              </el-form>
            </el-card>
            <el-card header="资质信息:">
              <el-form
                label-position="left"
                inline
                class="demo-table-expand-image"
              >
                <template v-for="(item, index) in companyImg">
                  <div class="item" :key="index" :data-item="item">
                    <div class="img">
                      <el-image :src="item"  fit="cover" :preview-src-list="[item]" v-if="item" />
                      <div v-else class="imgNull"> 图片未上传</div>
                    </div>
                    <div class="content">
                      <div class="info">
                        <div>
                          拒绝原因：
                          <span style="color:red">
                            {{
                            companyAuthInfo[index] || "暂无"
                            }}
                          </span>
                        </div>
                        <div>
                          图片类型：{{
                          {
                          0: "公司照片",
                          1: "机构营业执照",
                          2: "劳动合同",
                          3: "工牌或名片"
                          }[index]
                          }}
                        </div>
                      </div>
                      <template>
                        <!-- <div class="radio">
                          <span>是否通过：</span>
                          <el-radio v-model="item.pass" type="success" :label="true">通过</el-radio>
                          <el-radio v-model="item.pass" type="danger" :label="false">拒绝</el-radio>
                        </div>-->
                        <div class="msg">
                          <el-input
                            clearable
                            type="textarea"
                            v-model=" companyAuthInfo[index] "
                            resize="none"
                            placeholder="请输入审核意见且不能输入逗号!"
                            :rules="{
                              required: true,
                              message: '请输入审核意见'
                            }"
                          />
                        </div>
                      </template>
                    </div>
                  </div>
                </template>
              </el-form>
            </el-card>
            <el-form
              ref="remarkForm"
              :inline="true"
              :model="authInfoData"
              label-width="90px"
              class="search-form search-form-remark"
            >
              <el-form-item label="备注:">
                <el-input
                  clearable
                  type="textarea"
                  v-model="authInfoData.remark"
                  resize="none"
                  placeholder="请输入审核意见且不能输入逗号!"
                />
              </el-form-item>
            </el-form>
            <div class="authInfoBtn">
              <el-button type="primary" @click="goBack()">取消</el-button>
              <el-button type="success" @click="onSubmit('isSuccess')">一键通过</el-button>
              <el-button type="danger" @click="onSubmit('error')">一键拒绝</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getTableList } from "../../api";
//2,审核列表  3，审核详情 4,编辑审核详情 5 获取cors的密钥
import {
  apiGetUserAuditList,
  apiGetAuthList,
  apiGetAuthInfo,
  apiEditAuth,
  apiGetCosToken
} from "../../api/apilist";
// import excel from "../../utils/excel";
import Pagination from "../../components/Pagination";
import Upload from "../../components/Upload";
// import Hints from '../../components/Hints'

export default {
  name: "Table",
  components: { Pagination, Upload },
  data() {
    return {
      //快捷选择时间
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      // 数据列表加载动画
      listLoading: true,
      // 查询列表参数对象
      listQuery: {
        authState: 1, // [0:未认证],[1:认证中],[2:认证失败],[3,认证成功]，[4,冻结] ,
        channelSource: null, // 渠道来源 ,
        companyName: null, // 公司名称 ,
        endTime: null, //结束时间
        faceRecognition: null, // 人脸识别0未识别 1识别
        phone: null, // 手机号 ,
        startTime: null, //开始时间
        updateEndTime: null, // 跟新结束时间 ,
        updateStartTime: null // 跟新开始时间
      },
      pageIndex: 1, // 页码 ,
      pageSize: 10, // 每页数据量大小 ,
      // 数据总条数
      total: 0,
      // 表格数据数组
      tableData: [],
      //审核详情数据数组
      authInfoData: [],
      //公司照片
      companyImg: [],
      //公司请求意见
      companyAuthInfo: [],
      //个人请求意见
      peopleAuthInfo: [],
      //个人照片
      peopleImg: [],
      //获取cors的 数据
      corsTokem: {
        SecretId: null,
        SecretKey: null,
        region: null,
        sessionToken: null,
        filePath: null,
        Expires: null,
        imgDataCor: null
      },
      updateMAp: null, //更新时间储存
      createMap: null, //申请时间储存
      // 多选数据暂存数组
      multipleSelection: [],
      // 新增/编辑 弹出框显示/隐藏
      formVisible: false,
      // 表单校验 trigger: ['blur', 'change'] 为多个事件触发
      formRules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "请输入正确的手机号",
            trigger: "blur"
          }
        ]
      },
      showUserId: "", //提交审核的id
      showDetail: true //是否查看详情
      // 防止多次连续提交表单
    };
  },
  created() {
    this.PostFetchData();
  },
  methods: {
    // 多选操作
    // handleSelectionChange(val) {
    //   this.multipleSelection = val;
    // },

    // 删除数据
    handleDelete(index, row) {
      console.log(index, row);
      this.$confirm("此操作将删除选中数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 此处可添加--删除接口
          // 删除成功调用fetchData方法更新列表
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 获取数据列表
    PostFetchData() {
      this.listLoading = true;
      // 获取审核数据列表接口
      // console.log(this.listQuery);
      let data = this.listQuery;
      data["pageIndex"] = this.pageIndex;
      data["pageSize"] = this.pageSize;
      apiGetAuthList(data)
        .then(res => {
          console.log(res);
          // const data = res.data;
          if (res.code === 200) {
            this.total = res.data.total;
            this.tableData = res.data.list;
            this.listLoading = false;
          }
        })
        .catch(error => {
          console.log(error);
          this.listLoading = false;
        });
    },
    // 查询数据
    onSearch() {
      // this.listQuery.currentPage = 1;
      this.PostFetchData();
    },
    //重置数据
    onReset() {
      let that = this;
      Object.keys(that.listQuery).forEach(key => {
        that.listQuery[key] = null;
      });
      this.createMap = null;
      this.updateMAp = null;
      this.pageIndex = 1;
      this.pageSize = 10;
      this.PostFetchData();
    },
    //点击审核按钮
    async views(row) {
      // 获取 cors的接口
      this.companyImg = [];
      //公司请求意见
      this.companyAuthInfo =[];
      //个人请求意见
      this.peopleAuthInfo = [];
      //个人照片
      this.peopleImg = [];
      //先清空内容
      this.apiGetCosTokenInit(row);
      // this.apiGetAuthInfoInit(row);
    },
    goBack(){
        this.showDetail = true;
    
        // this.apiGetCosTokenInit();
    },
    //获取cors的图片url函数
    corsTcUrl(imgData, index, dom) {
      let imglen = imgData.indexOf("auth");
      let that = this;
      that.imgDataCor = imgData.slice(imglen);
      // that.imgDataCor = imgData;
      var COS = require("cos-js-sdk-v5");
      var cos = new COS({
        // SecretId: that.corsTokem.SecretId,
        // SecretKey: that.corsTokem.SecretKey,

        getAuthorization: (options, callback) => {
          const obj = {
            TmpSecretId: that.corsTokem.SecretId,
            TmpSecretKey: that.corsTokem.SecretKey,
            XCosSecurityToken: that.corsTokem.sessionToken,
            // StartTime: data.startTime, // 时间戳，单位秒，如：1580000000
            ExpiredTime: that.corsTokem.Expires // 时间戳，单位秒，如：1580000900
          };
          callback(obj);
        }
      });
      cos.getObjectUrl(
        {
          Bucket: "qiangdan-1255789551" /* 必须 */,
          Region: that.corsTokem.region /* 必须 */,
          Key: that.imgDataCor /* 必须 */
        },
        function(err, data) {
          if (err) return console.log(err);
          var downloadUrl =
            data.Url +
            (data.Url.indexOf("?") > -1 ? "&" : "?") +
            "response-content-disposition=attachment"; // 补充强制下载的参数
          // window.open(downloadUrl);
          if (dom == "companyImg") {
            // that.companyImg[index] = downloadUrl;
            that.$set(that.companyImg, index, downloadUrl); //动态添加
          }
           if (dom == "peopleImg") {
           
            that.$set(that.peopleImg, index, downloadUrl); //动态添加
          }
          // return downloadUrl //返回图片
        }
      );
    },
    //获取 cors 密钥的接口
    apiGetCosTokenInit( row) {
      let data = { type: 2 };
      apiGetCosToken(data)
        .then(res => {
          console.log(res);
          if (res.code === 200) {
            // const data = JSON.parse(res.data.data);
            this.corsTokem.SecretId = res.data.tmpSecretId;
            this.corsTokem.SecretKey = res.data.tmpSecretKey;
            this.corsTokem.Expires = res.data.expiredTime;
            this.corsTokem.region = res.data.region;
            this.corsTokem.filePath = res.data.filePath;
            this.corsTokem.sessionToken = res.data.sessionToken;

            console.log(this.corsTokem);
             this.apiGetAuthInfoInit(row);
          } else {
            this.$message({
              type: "warning",
              message: res.message
            });
          }
        })
        .catch(error => {
          console.log(error);
          this.listLoading = false;
        });
    },
    //审核详情api
    apiGetAuthInfoInit(row) {
      let data = { id: row.id };
      this.showUserId = row.userId;
      apiGetAuthInfo(data)
        .then(res => {
          // console.log(res);
          if (res.code === 200) {
            this.authInfoData = res.data;

            let companyImgArr = res.data.companyImg.split(",");
            this.companyImg.length = companyImgArr.length; //储存公司图片的数组

            let peopleImgArr = res.data.peopleImg.split(",");
            this.peopleImg.length = peopleImgArr.length; //储存公司图片的数组
            if (res.data.companyAuthInfo != null) {
              this.companyAuthInfo = res.data.companyAuthInfo.split(","); //储存公司审核意见的数组
            } else {
              // this.companyAuthInfo.length = 4;
              for (let i = 0; i < 4; i++) {
                this.companyAuthInfo[i] = "";
              }
            }
            if (res.data.peopleAuthInfo != null) {
              this.peopleAuthInfo = res.data.peopleAuthInfo.split(","); //储存个人审核意见的数组
            } else {
              // this.peopleAuthInfo.length = 3;
              for (let i = 0; i < 4; i++) {
                this.peopleAuthInfo[i] = "";
              }
            }
          
            companyImgArr.forEach((e, i) => {
              if (e != "") {
                this.corsTcUrl(e, i, "companyImg");
              }
            });
             peopleImgArr.forEach((e, i) => {
             
              if (e != "") {
                this.corsTcUrl(e, i, "peopleImg");
                //  console.log(this.corsTcUrl(e,i));
              }
            });
            this.showDetail = false;
            // this.PostFetchData(); //重新请求接口
          } else {
            this.$message({
              type: "warning",
              message: res.message
            });
          }
        })
        .catch(error => {
          console.log(error);
          this.listLoading = false;
        });
    },
    changePicker() {
      //点击确定时间
      if (this.createMap != null) {
        this.listQuery.startTime = this.createMap[0];
        this.listQuery.endTime = this.createMap[1];
      } else {
        this.listQuery.startTime = null;
        this.listQuery.endTime = null;
      }
      if (this.updateMAp != null) {
        this.listQuery.updateStartTime = this.updateMAp[0];
        this.listQuery.updateEndTime = this.updateMAp[1];
      } else {
        this.listQuery.updateStartTime = null;
        this.listQuery.updateEndTime = null;
      }
    },
    onSubmit(val) {
      let data = {};
      if (val == "isSuccess") {
        data["authState"] = 3;
      } else {
        data["authState"] = 2;
      }
      data["id"] = this.authInfoData.id;
      data["userId"] = this.showUserId;
      data["remark"] = this.authInfoData.remark;
      this.peopleAuthInfo.forEach(e => {
        if (e !== "") {
          data["peopleAuthInfo"] = this.peopleAuthInfo.join(",");
        }
      });
      this.companyAuthInfo.forEach(e => {
        if (e !== "") {
          data["companyAuthInfo"] = this.companyAuthInfo.join(",");
        }
      });
      if(data["companyAuthInfo"] == undefined & data["peopleAuthInfo"] == undefined && val != "isSuccess" ){
        this.$message.warning('请输入拒绝原因!');
        return false;
      }
      this.apiEditAuthInit(data);
    },
    apiEditAuthInit(data) {
      apiEditAuth(data)
        .then(res => {
          if (res.code === 200) {
            this.showDetail = true;
            this.PostFetchData();
          }
        })
        .catch(error => {
          console.log(error);
          this.listLoading = false;
        });
    }
  }
};
</script>

<style lang="less">
.table-classic-wrapper {
  .el-card {
    min-height: 656px;
    // .body {
    //   // display: grid;
    //   // grid-template-rows: 60px auto 60px;
    //   display: flex;
    //   justify-content: flex-start;
    //   align-items: stretch;
    //   flex-direction: column;
    //   overflow: hidden;
    //   &.active {
    //     grid-template-rows: 60px auto;
    //     overflow: hidden;
    //   }
    // }
  }
  .el-image-viewer__canvas{
    padding: 20px 0;
  }
  .demo-table-expand-image {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    .item {
      width: 260px;
      border: 1px solid #ccc;
      margin: 5px;
      .img {
        width: 260px;
        height: 200px;
        overflow: hidden;
        .el-image {
          width: 100%;
          height: 100%;
          padding: 10px 0;
          text-align: center;
          img{
            width: auto;
          }
        }
        .imgNull{
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }

      .content {
        padding: 20px 20px 10px;
        .info {
          > div {
            margin-bottom: 10px;
          }
        }
        .radio {
          margin-bottom: 10px;
        }
      }
    }
  }
  .demo-table-expand-head {
    label {
      width: 76px !important;
    }
    .el-form-item {
      width: 19% !important;
    }
  }
  .authInfoBtn {
    text-align: center;
    overflow: hidden;
    margin: 20px auto;
  }
  .body {
    // display: grid;
    // grid-template-rows: 60px auto 60px;
    display: flex;
    justify-content: flex-start;
    align-items: stretch;
    flex-direction: column;
    overflow: hidden;
    &.active {
      grid-template-rows: 60px auto;
      overflow: hidden;
    }
    .el-page-header {
      padding: 5px 0;
    }
    .el-page-header__content {
      line-height: 24px;
    }
    .el-form-item__label {
      line-height: 32px;
    }
    .demo-table-expand {
      font-size: 0;
    }
    .demo-table-expand label {
      width: 100px;
      color: #99a9bf;
      overflow: hidden;
    }
    .demo-table-expand .el-form-item {
      margin-right: 0;
      margin-bottom: 0;
      width: 24%;
    }
    .el-card {
      min-height: 100px !important;
    }
  }
  .control-btns {
    margin-bottom: 20px;
  }
  .search-form {
    padding-top: 18px;
    margin-bottom: 15px;
    background-color: #f7f8fb;
  }
  .search-form-remark {
    .el-form-item {
      width: 440px;
      .el-form-item__content {
        width: 330px;
      }
    }
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
