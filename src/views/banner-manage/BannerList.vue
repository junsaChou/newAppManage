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
        <el-form-item label="广告名称">
          <el-input v-model="listQuery.title" placeholder="请填写" />
        </el-form-item>
        <el-form-item label="账户状态">
          <el-select v-model="listQuery.type " placeholder="请填写">
            <el-option value label="全部" />
            <el-option :value="0" label="未认证" />
            <el-option :value="1" label="认证" />
            <el-option :value="2" label="通用" />
          </el-select>
        </el-form-item>
        <el-form-item label="广告状态">
          <el-select v-model="listQuery.state " placeholder="请填写">
            <el-option value label="全部" />
            <el-option :value="0" label="禁用" />
            <el-option :value="1" label="启用" />
          </el-select>
        </el-form-item>
        <el-form-item label="日期范围">
          <el-date-picker
            v-model="dateTime"
            type="datetimerange"
            @change="upDate"
            :picker-options="pickerOptions"
            value-format="yyyy-MM-dd HH:mm:ss"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="广告类型">
          <el-select v-model="listQuery.bannerType" placeholder="请填写">
            <el-option value label="全部" />
            <el-option :value="0" label="首页banner" />
            <el-option :value="1" label="悬浮" />
            <el-option :value="2" label="弹窗" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">搜索</el-button>
          <el-button type="warning" @click="onReset">重置</el-button>
        </el-form-item>
      </el-form>
      <!-- 操作栏 -->
      <div class="control-btns">
        <el-button type="primary" @click="handleCreate">创建banner</el-button>
      </div>
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
          prop="sort"
          label="排序"
          align="center"
          width="90"
          sortable
        />
        <el-table-column show-overflow-tooltip prop="title" label="广告名称" align="center" />
        <el-table-column show-overflow-tooltip  label="广告图片" align="center" >
           <template slot-scope="scope">
             <img :src="scope.row.bannerUrl" alt="">
            <!-- <span>{{scope.row.createTime | formatDate}}</span> -->
          </template>
        </el-table-column> 
        <el-table-column show-overflow-tooltip prop="linkUrl" label="跳转链接" align="center" />
        <el-table-column show-overflow-tooltip label="创建时间" align="center" width="100">
          <template slot-scope="scope">
            <span>{{scope.row.createTime | formatDate}}</span>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip label="账户状态" align="center">
          <template
            slot-scope="scope"
          >{{ scope.row.type == '0'?'未认证': scope.row.type == '1'? '认证':'通用' }}</template>
        </el-table-column>
        <el-table-column show-overflow-tooltip label="广告状态 " align="center">
          <template slot-scope="scope">{{ scope.row.state == '0'?'禁用':'启用' }}</template>
        </el-table-column>
        <!-- //bannerType -->
        <el-table-column show-overflow-tooltip label="广告类型 " align="center">
          <template slot-scope="scope">{{ scope.row.bannerType == '0'?'首页banner': scope.row.bannerType == '1'? '悬浮' :'弹窗' }}</template>
        </el-table-column>
        <el-table-column show-overflow-tooltip label="有效期" align="center">
          <template
            slot-scope="scope"
          >{{ scope.row.startTime | formatDate }} - {{scope.row.endTime | formatDate }}</template>
        </el-table-column>
        <!-- <el-table-column prop="hobby" label="爱好" align="center" width="300" show-overflow-tooltip /> -->
        <el-table-column label="操作" fixed="right" align="center" width="150">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleEdit(scope.$index,scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index,scope.row.id)">删除</el-button>
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
      <el-dialog
        :title="formVisibleList.title"
        :visible.sync="formVisibleList.formVisible"
        width="45%"
        class="dialog-form"
        :before-close="handleClose"
      >
        <el-form ref="dialogForm" :model="dialogForm" :rules="formRules" label-width="110px">
          <el-form-item label="广告名称：" prop="title" maxlength="16">
            <el-input v-model="dialogForm.title" />
          </el-form-item>
           <el-form-item label="广告类型：" prop="bannerType">
            <el-select v-model="dialogForm.bannerType">
              <el-option :value="0" label="首页banner" />
              <el-option :value="1" label="悬浮" />
              <el-option :value="2" label="弹窗" />
            </el-select>
          </el-form-item>
          <el-form-item label="排序：" v-if="dialogForm.bannerType == 0" prop="bannerSort" maxlength="2">
            <el-input v-model="dialogForm.bannerSort" />
          </el-form-item>
          <el-form-item label="正常/禁用： " prop="state">
            <el-switch v-model="dialogForm.state" active-value="1" inactive-value="0"></el-switch>
          </el-form-item>
          <el-form-item label="banner图片： " prop="bannerUrl">
            <!-- :action="dialogForm.bannerUrl" -->
            <el-upload
              class="avatar-uploader"
              action="#"
              ref="upload"
              :show-file-list="false"
              :http-request="uploadImg"
              :limit="1"
              :on-change="onchangeImg"
              :auto-upload="true"
              :before-upload="beforeavatarupload"
            >
              <img v-if="imgUrl" :src="imgUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <!-- <el-form-item label="图片地址：" prop="bannerUrl">
            <el-input v-model="dialogForm.bannerUrl" />
          </el-form-item>-->
          <el-form-item label="跳转链接：" prop="linkUrl">
            <el-input v-model="dialogForm.linkUrl" />
          </el-form-item>
          <el-form-item label="开始时间：" prop="startTime">
            <el-date-picker
              v-model="dialogForm.startTime"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择日期时间"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间：" prop="endTime">
            <el-date-picker
              v-model="dialogForm.endTime"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择日期时间"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="用户账户状态：" prop="type">
            <el-select v-model="dialogForm.type">
              <el-option :value="0" label="未认证" />
              <el-option :value="1" label="认证" />
              <el-option :value="2" label="通用" />
            </el-select>
          </el-form-item>
          <div class="footer-item">
            <el-button @click="cancleForm">取 消</el-button>
            <el-button
              type="primary"
              :disabled="isSubmit"
              @click="submitForm('dialogForm',formVisibleList.isCreate)"
            >确 定</el-button>
            <!-- <el-button type="primary" v-else :disabled="isSubmit" @click="submitForm('dialogForm')">确 定</el-button> -->
          </div>
        </el-form>
      </el-dialog>
      <!-- <div class="upload-box">
          <span>选择文件：</span>
          <Upload :files-format="filesFormat">
            <i class="vue-dsn-icon-upload" />上传文件
          </Upload>
      </div>-->
      <!-- <div class="hints">TIP：请选择要导出数据的格式。</div>
        <span slot="footer">
          <el-button @click="cancleImport">取 消</el-button>
          <el-button type="primary" @click="confirmImport">确 定</el-button>
        </span>
      </el-dialog>-->
    </el-card>
  </div>
</template>

<script>
//轮播图列表  编辑轮播图接口 删除  创建 获取cors的密钥
import {
  apiGetBannerList,
  apiEditBanner,
  apiDeletBanner,
  apiCreateBanner,
  apiGetCosToken
} from "../../api/apilist";
// import excel from "../../utils/excel";
import validatorForm from "../../assets/js/validatorForm";
import Pagination from "../../components/Pagination";

// import Hints from '../../components/Hints'

export default {
  name: "Table",
  components: { Pagination },
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
        endTime: null, // 结束时间 ,
        id: null, //id ,
        linkUrl: null, // 跳转链接 ,
        startTime: null, // 开始时间 ,
        state: null, // 状态0禁用1启用 ,
        title: null, // 广告名称 ,
        type: null, //用户账户状态
        bannerType: null //广告类型
      },
      // 新增/编辑提交表单对象
      dialogForm: {
        bannerUrl: "", //banner图片路径 ,
        bannerSort: "", //排序
        endTime: "", //结束时间 ,
        id: "", // id ,
        linkUrl: "", //跳转链接 ,
        startTime: "", //开始时间 ,
        state: '1', //状态0禁用1启用 ,
        title: "", //广告名称 ,
        type: null, // 用户账户状态0未认证 1认证 2通用
        bannerType:null //广告 类型
      },
      imgUrl: null, //图片展示的路径
      imgFile: "", // 上传文件对象
      fileName: "", //文件名字
      dateTime: null, //搜索表格绑定时间
      // 数据总条数
      total: 0,
      // 表格数据数组
      pageIndex: 1, //页码 ,
      pageSize: 10, //每页数据量大小 ,
      tableData: [],
      // 多选数据暂存数组
      multipleSelection: [],
      // 新增/编辑 弹出框显示/隐藏
      formVisible: false,
      formVisibleList: {
        formVisible: false,
        title: "编辑",
        isCreate: false
      },
      corsTokem: {
        SecretId: null,
        SecretKey: null,
        region: null,
        sessionToken: null,
        filePath: null,
        Expires: null
      },
      // 表单校验 trigger: ['blur', 'change'] 为多个事件触发
      formRules: {
        title: [
          { required: true, message: "请输入广告名称", trigger: "blur" },
          {
            validator: validatorForm.validateNumberAcCn,
            trigger: "blur"
          }
        ],
        bannerSort: [
          { required: true, message: "请输入最大为99的数字", trigger: "blur" },
          {
            validator: validatorForm.validateNumber,
            trigger: "blur"
          }
        ],
        bannerUrl: [
          { required: true, message: "请上传图片", trigger: "blur" }
        ],
        startTime: [
          { required: true, message: "请输入开始时间", trigger: "blur" }
        ],
        endTime: [
          { required: true, message: "请输入结束时间", trigger: "blur" }
        ],
        type: [
          { required: true, message: "请选择用户账户状态：", trigger: "blur" }
        ],
        bannerType: [
          { required: true, message: "请选择广告类型：", trigger: "blur" }
        ],
      },
      // 防止多次连续提交表单
      isSubmit: false,
      // 导入数据 弹出框显示/隐藏
      importVisible: false
      //是否出现审核图片
    };
  },
  created() {
    this.PostFetchData();
    this.apiGetCosTokenInit();
  },
  methods: {
    // 编辑数据
    handleEdit(index, row) {
      this.formVisibleList.formVisible = true;
      this.formVisibleList.title = "编辑";
      this.formVisibleList.isCreate = false;
      // this.dialogForm.endTime = row
      this.dialogForm.id = row.id;
      this.dialogForm.linkUrl = row.linkUrl;
      if( row.bannerUrl  != ''){
         this.dialogForm.bannerUrl = row.bannerUrl;
        this.imgUrl = row.bannerUrl;
      }
     
      this.dialogForm.startTime = this.$options.filters["FormatDate"](
        row.startTime
      ); //调用全局的filters方法
      this.dialogForm.endTime = this.$options.filters["FormatDate"](
        row.endTime
      ); //调用全局的filters方法
      this.dialogForm.bannerSort = row.sort; //排序
      this.dialogForm.state = String(row.state); //switch  的value 类型统一为字符串
      this.dialogForm.title = row.title;
      this.dialogForm.type = row.type;
      this.dialogForm.bannerType = row.bannerType;
      this.apiGetCosTokenInit();
      // this.corsTcUrl(this.dialogForm.bannerUrl, 0, "create");
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
          this.deleteApi(row);
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
    deleteApi(id) {
      let data = { bannerId: id };
      apiDeletBanner(data)
        .then(res => {
          console.log(res);
          if (res.code === 200) {
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
    },
    //获取 cors 密钥的接口
    apiGetCosTokenInit() {
      let data = { type: 3 };
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
    uploadImg() {
      // 创建COS实例  获取签名
      let that = this;
      var COS = require("cos-js-sdk-v5");
      const cos = new COS({
        // 必选参数
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
      // 上传图片  其中Bucket 和 Region找后端请求
      //key 在前面加上路径写法可以生成文件夹
 
      cos.putObject(
        {
          Bucket: "qiangdan-1255789551" /* 必须 */,
          Region: that.corsTokem.region /* 存储桶所在地域，必须字段 */,
          Key:
            that.corsTokem.filePath +
            new Date().getTime() +
            that.fileName /* 必须 */,
          StorageClass: "STANDARD",
          Body: that.imgFile, // 上传文件对象
          onProgress: progressData => {
            console.log(JSON.stringify(progressData));
          }
        },
        (err, data) => {
          // 将上传后的封面进行路径拼接保存到本地
          console.log(err || data);
          if(err){
            this.$message.error("图片上传到cors失败!");
          }
          if (data) {
            const url = "https://" + data.Location;
            this.dialogForm.bannerUrl = url;
            this.imgUrl = url;
            this.$refs.upload.clearFiles(); //上传成功之后清除历史记录
          }
        }
      );
    },
    beforeavatarupload(file) {
      const isImg =  file.type === 'image/jpg' || file.type === 'image/jpeg' || file.type === 'image/png';
    
      const islt2m = file.size / 1024 / 1024 < 2;

      if (!isImg ) {
        this.$message.error("上传头像图片只能是 jpg和 jpeg 和 png 格式!");
        return false;
      }
      if (!islt2m) {
        this.$message.error("上传头像图片大小不能超过 2mb!");
         return false;
      }
      return isImg && islt2m;
    },
    // 当上传图片后，调用onchange方法，获取图片本地路径
    onchangeImg(file, filelist) {
      var _this = this;
      var event = event || window.event;
      var file = event.target.files[0];
      var reader = new FileReader();
      //转base64
      this.fileName = file.name;
      this.imgFile = file;
      reader.readAsDataURL(file);
      reader.onload = function(e) {
        _this.dialogForm.bannerUrl = e.target.result; //将图片路径赋值给src
      };
      // reader.readasdataurl(file);
    },

    // 新增/编辑弹出框 关闭时操作
    handleClose() {
      this.cancleForm();
    },
    handleCreate() {
      //创建banner 轮播图
      this.formVisibleList.formVisible = true;
      this.formVisibleList.title = "创建";
      this.formVisibleList.isCreate = true;
      this.apiGetCosTokenInit();
    },
    // 获取数据列表
    PostFetchData() {
      this.listLoading = true;
      // 获取审核数据列表接口
      let data = this.listQuery;
      data["pageIndex"] = this.pageIndex;
      data["pageSize"] = this.pageSize;
      // delete data.dateTime;
      apiGetBannerList(data)
        .then(res => {
          console.log(res);
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
    upDate(val) {
      //时间选择
      if (val) {
        this.listQuery.startTime = val[0];
        this.listQuery.endTime = val[1];
      } else {
        this.listQuery.startTime = null;
        this.listQuery.endTime = null;
      }
    },
    // 查询数据
    onSubmit() {
      // this.listQuery.currentPage = 1;

      this.PostFetchData();
    },
    //重置数据
    onReset() {
      let that = this;
      Object.keys(that.listQuery).forEach(key => {
        that.listQuery[key] = null;
      });
      this.dateTime = null;
      this.PostFetchData();
      // this.$refs["searchForm"].resetFields(); //清空表单
    },
    // 新增/编辑表单确认提交
    submitForm(formName, isCreate) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let data = this.dialogForm;

          if (isCreate) {
            data["id"] = null;
            apiCreateBanner(data) //创建
              .then(res => {
                console.log(res);
                if (res.code === 200) {
                  this.PostFetchData();
                  this.cancleForm();
                }
              })
              .catch(error => {
                console.log(error);
                this.listLoading = false;
              });
          } else {
            apiEditBanner(data) //编辑
              .then(res => {
                console.log(res);
                if (res.code === 200) {
                  this.PostFetchData();
                  this.cancleForm(); //清空表单
                }
              })
              .catch(error => {
                this.listLoading = false;
              });
          }

          // 此处添加 新增/编辑数据的接口 新增成功后调用fetchData方法更新列表
          // 先 this.isSubmit = true 接口返回成功后 再 this.isSubmit = false
          // this.formVisibleList.formVisible = false;
        } else {
          this.isSubmit = false;
          return false;
        }
      });
    },
    // 新增/编辑表单取消提交
    cancleForm() {
      let that = this;
      Object.keys(that.dialogForm).forEach(key => {
        that.dialogForm[key] = null;
      });
      this.dialogForm.state = '1';
      this.imgUrl = '';
      this.imgFile = '';
      this.fileName = '';
      // this.$refs.dialogForm.resetFields();
      this.formVisibleList.formVisible = false;
    },
    //点击审核按钮
    views() {
      console.log("hh");
      this.isAbc = true;
    },
    changePicker(val) {
      //点击确定时间
      console.log(val);
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
  .control-btns {
    margin-bottom: 8px;
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
    .el-form-item__label {
      padding: 0;
    }
    .el-input {
      max-width: 380px;
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
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .hints {
    font-size: 12px;
    color: #aaa;
    text-align: center;
  }
}
</style>
