<template>
  <div class="table-classic-wrapper">
    <el-card shadow="always">
      <!-- 查询栏 -->
      <el-form
        ref="searchForm"
        :inline="true"
        :model="listQuery"
        label-width="90px"
        class="search-form"
      >
        <el-form-item label="订单号">
          <el-input v-model="listQuery.orderNo" placeholder="请填写" />
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input v-model="listQuery.phone" placeholder="请填写" />
        </el-form-item>
        <el-form-item label="来源渠道">
          <el-input v-model="listQuery.channel" placeholder="请填写" />
        </el-form-item>
        <el-form-item label="退单状态">
          <el-select v-model="listQuery.state" placeholder="审核状态">
            <el-option value label="全部" />
            <el-option :value="0" label="未申请" />
            <el-option :value="1" label="拒绝退单" />
            <el-option :value="2" label="待审核" />
            <el-option :value="3" label="半价退" />
            <el-option :value="4" label="全款退" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">搜索</el-button>
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
        <el-table-column
          show-overflow-tooltip
          prop="orderNo"
          label="订单号"
          align="center"
          width="120"
          sortable
        />
        <el-table-column show-overflow-tooltip label="申请时间" align="center" width="150">
          <template slot-scope="scope">
            <span>{{scope.row.applyTime | formatDate}}</span>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="channel" label="渠道来源" align="center" />
        <el-table-column show-overflow-tooltip prop="customerName" label="用户姓名" align="center" />
        <el-table-column
          show-overflow-tooltip
          prop="customerPhone"
          label="用户手机号"
          align="center"
          width="150"
        />
        <el-table-column show-overflow-tooltip prop="userName" label="经理姓名" align="center" />
        <el-table-column
          show-overflow-tooltip
          prop="userPhone"
          label="经理手机号码"
          align="center"
          width="150"
        />
        <el-table-column show-overflow-tooltip prop="balance" label="账号余额" align="center" />
        <el-table-column show-overflow-tooltip label="抢单时间" align="center" width="150">
          <template slot-scope="scope">
            <span>{{scope.row.buyTime | formatDate}}</span>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="amount" label="订单价格" align="center" />
        <el-table-column show-overflow-tooltip label="退单状态" align="center">
          <template
            slot-scope="scope"
          >{{ scope.row.chargebackState == '0'?'未申请': scope.row.chargebackState == '1'? '拒绝退单': scope.row.chargebackState == '2'?'待审核': scope.row.chargebackState == '3'? '半价退':'全款退' }}</template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="chargebackRemark" label="拒绝原因" align="center" />
        <el-table-column label="操作" align="center" width="250">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="handleEdit(scope.$index, scope.row)">拒绝</el-button>
            <el-button size="mini" type="primary" @click="views(scope.row.id)">查看详情</el-button>
            <el-button size="mini" type="warning" @click="handleState(scope.$index, scope.row)">退单</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页栏 -->
      <Pagination
        :total="total"
        :page.sync="listQuery.pageIndex"
        :limit.sync="listQuery.pageSize"
        @pagination="PostFetchData"
      />
      <!-- 新增/编辑 弹出栏 -->
      <el-dialog
        :title="formVisibleList.title"
        :visible.sync="formVisibleList.formVisible"
        width="30%"
        class="dialog-form"
        :before-close="handleClose"
      >
        <el-form ref="dialogForm" :model="dialogForm" :rules="formRules" label-width="100px">
          <el-form-item label="拒绝原因：" prop="remark" v-if="formVisibleList.title == '退单拒绝原因'">
            <!-- <el-input v-model="dialogForm.name" /> -->
            <el-input
              clearable
              type="textarea"
              v-model="dialogForm.remark"
              resize="none"
              placeholder="请输入拒绝原因!"
              show-word-limit
              maxlength="50"
              :rules="{
                required: true,
                message: '请输入拒绝原因'
              }"
            />
          </el-form-item>
          <el-form-item label="同意退单：" prop="type" v-if="formVisibleList.title == '温馨提示'">
            <el-radio-group v-model="dialogForm.type ">
              <el-radio :label="3">半价退单</el-radio>
              <el-radio :label="4">全款退单</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="退单原因：" v-show="formVisibleList.title == '退款详情'">
            <el-input v-model="dialogForm.chargebackCause" disabled />
          </el-form-item>
          <el-form-item label="详细原因：" v-show="formVisibleList.title == '退款详情'">
            <el-input v-model="dialogForm.detailedReasons" disabled />
          </el-form-item>
          <el-form-item label="上传图片：" v-show="formVisibleList.title == '退款详情'">
            <div class="demo-image" v-if="companyImg.length >0">
              <div class="block" v-for="fit in companyImg" :key="fit">
                <el-image
                  style="width: 100px; height: 100px"
                  :src="fit"
                  fit="cover"
                  :preview-src-list="[fit]"
                ></el-image>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="拒绝原因：" v-show="formVisibleList.title == '退款详情'">
            <el-input v-model="dialogForm.chargebackRemark" disabled />
          </el-form-item>
          <div class="footer-item">
            <el-button @click="cancleForm">取 消</el-button>
            <el-button type="primary" :disabled="isSubmit" @click="submitForm('dialogForm')">确 定</el-button>
          </div>
        </el-form>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
//退单列表  拒绝原因 退款详情
import {
  apiChargebackList,
  apiUpdateChargeback,
  apiGetChargebackInfo,
  apiGetCosToken //获取 cors 的token
} from "../../api/apilist";
// import excel from "../../utils/excel";
import Pagination from "../../components/Pagination";
// import Hints from '../../components/Hints'

export default {
  name: "Table",
  components: { Pagination },
  data() {
    return {
      // 数据列表加载动画
      listLoading: true,
      // 查询列表参数对象
      listQuery: {
        channel: null, // 来源 ,
        orderNo: null, // 订单 ,
        phone: null, // 手机 ,
        state: null, // 退单状态0未申请 1拒绝退单 2待审核 3半价退 4全款退
        pageIndex: 1, //页码 ,
        pageSize: 10 //每页数据量大小 ,
      },
      // 新增/编辑提交表单对象
      dialogForm: {
        id: null, //id
        remark: null, //备注
        type: "",
        img: null, //图片url 的路径
        chargebackRemark: null, //拒绝原因
        chargebackCause: null, //退款原因
        detailedReasons: null //详细原因
      },
      // 数据总条数
      total: 0,
      // 表格数据数组
      tableData: [],
      companyImg: [], //显示图片的数组
      // 新增/编辑 弹出框显示/隐藏
      formVisible: false,
      formVisibleList: {
        formVisible: false,
        title: "编辑",
        isCreate: false
      },
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
      // 表单校验 trigger: ['blur', 'change'] 为多个事件触发
      formRules: {
        remark: [
          { required: true, message: "请输入拒绝原因", trigger: "blur" }
        ],
        type: [{ required: true, message: "请选择退款状态", trigger: "blur" }],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "请输入正确的手机号",
            trigger: "blur"
          }
        ]
      },
      // 防止多次连续提交表单
      isSubmit: false
      // 导入数据 弹出框显示/隐藏
    };
  },
  created() {
    this.PostFetchData();
    this.apiGetCosTokenInit();
  },
  methods: {
    // 编辑数据
    handleEdit(index, row) {
      console.log(index, row);
      this.formVisibleList.formVisible = true;
      this.formVisibleList.title = "退单拒绝原因";
      this.dialogForm.id = row.id;
    },
    handleState(index, row) {
      this.formVisibleList.formVisible = true;
      this.formVisibleList.title = "温馨提示";
      this.dialogForm.id = row.id;
    },
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

    // 新增/编辑弹出框 关闭时操作
    handleClose() {
      this.cancleForm();
    },
    // 获取数据列表
    PostFetchData() {
      this.listLoading = true;
      // 获取退单数据列表接口
      console.log(this.listQuery);
      let data = this.listQuery;
      apiChargebackList(data)
        .then(res => {
          console.log(res);
          if (res.code == 200) {
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
    onSubmit() {
      this.listQuery.pageIndex = 1;
      this.PostFetchData();
    },
    //重置数据
    onReset() {
      let that = this;
      Object.keys(that.listQuery).forEach(key => {
        that.listQuery[key] = null;
      });
      this.listQuery.pageIndex = 1;
      this.listQuery.pageSize = 10;
      this.PostFetchData();
    },
    // 新增/编辑表单确认提交
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.formVisibleList.title == "退单拒绝原因") {
            let data = {
              remark: this.dialogForm.remark,
              id: this.dialogForm.id,
              state: "1"
            };
            this.passInput(data);
          } else if (this.formVisibleList.title == "温馨提示") {
            // return false;
            let data = { id: this.dialogForm.id, state: this.dialogForm.type };
            this.passInput(data);
          } else {
            this.cancleForm();
          }
          // return false;
          // // 此处添加 新增/编辑数据的接口 新增成功后调用fetchData方法更新列表
          // // 先 this.isSubmit = true 接口返回成功后 再 this.isSubmit = false
          // this.formVisibleList.formVisible = false;
        } else {
          this.isSubmit = false;
          return false;
        }
      });
    },
    // 新增/编辑表单取消提交
    cancleForm() {
      Object.keys(this.dialogForm).forEach(key => {
        this.dialogForm[key] = null;
      });
      this.companyImg = [];
      console.log(this.dialogForm);
      this.formVisibleList.formVisible = false;
    },
    //点击审核按钮
    views(row) {
      let data = { userOrderId: row };
      apiGetChargebackInfo(data)
        .then(res => {
          if (res.code === 200) {
            this.formVisibleList.formVisible = true;
            this.formVisibleList.title = "退款详情";
            // this.dialogForm.img = res.data.img; //图片url 的路径
            this.dialogForm.chargebackRemark = res.data.chargebackRemark; //拒绝原因
            this.dialogForm.chargebackCause = res.data.chargebackCause; //退款原因
            this.dialogForm.detailedReasons = res.data.detailedReasons; //详细原因
            if (res.data.img != null && res.data.img != '') {
              let companyImgArr = res.data.img.split(",");
              this.companyImg = companyImgArr; //储存公司图片的数组
              companyImgArr.forEach((e, i) => {
                if (e != "") {
                  this.corsTcUrl(e, i, "companyImg");
                }
              });
            }
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
    //获取 cors 密钥的接口
    apiGetCosTokenInit() {
      let data = { type: 1 };
      apiGetCosToken(data)
        .then(res => {
          if (res.code === 200) {
            // const data = JSON.parse(res.data.data);
            this.corsTokem.SecretId = res.data.tmpSecretId;
            this.corsTokem.SecretKey = res.data.tmpSecretKey;
            this.corsTokem.Expires = res.data.expiredTime;
            this.corsTokem.region = res.data.region;
            this.corsTokem.filePath = res.data.filePath;
            this.corsTokem.sessionToken = res.data.sessionToken;
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
    corsTcUrl(imgData, index) {
      let imglen = imgData.indexOf("tuidan");
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
          if (data) {
            var downloadUrl =
              data.Url +
              (data.Url.indexOf("?") > -1 ? "&" : "?") +
              "response-content-disposition=attachment"; // 补充强制下载的参数
            that.$set(that.companyImg, index, downloadUrl); //动态添加
            // return downloadUrl //返回图片
          }
        }
      );
    },
    passInput(data) {
      //退单api

      // let data = { remark: remark, id: id ,state:'1'};
      apiUpdateChargeback(data)
        .then(res => {
          if (res.code === 200) {
            this.cancleForm();
            this.PostFetchData(); //重新请求接口
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
      //拒绝原因
    }
  }
};
</script>

<style lang="less">
.table-classic-wrapper {
  .el-card {
    min-height: 656px;
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
    }
  }
  .demo-image {
    display: flex;
    flex-wrap: wrap;
    .block {
      width: 50%;
      margin: 5px 0;
      img {
        width: auto !important;
      }
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
  .el-table thead {
    font-weight: 600;
    th {
      background-color: #f2f3f7;
    }
  }
  .dialog-form {
    .el-input {
      max-width: 300px;
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
