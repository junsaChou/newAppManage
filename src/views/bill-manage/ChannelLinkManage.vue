<template>
  <div class="table-classic-wrapper">
    <el-card shadow="always" >
      <!-- 查询栏 -->
      <el-form
        ref="searchForm"
        :inline="true"
        :model="listQuery"
        label-width="90px"
        class="search-form"
      >
        <el-form-item label="链接">
          <el-input v-model="listQuery.oldLink" placeholder="请填写" />
        </el-form-item>
        <el-form-item label="时间">
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
        <el-form-item label="跟进人">
          <el-input v-model="listQuery.adminName" placeholder="请填写" />
        </el-form-item>
        <el-form-item label="结算方式">
          <el-select v-model="listQuery.clearingForm">
            <el-option value label="全部" />
            <el-option :value="0" label="UV" />
            <el-option :value="1" label="CPA" />
            <el-option :value="2" label="CPM" />
            <el-option :value="3" label="CPD" />
            <el-option :value="4" label="CPS" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">搜索</el-button>
          <el-button type="warning" @click="onReset">重置</el-button>
           <el-button type="success" @click="exportList">导出</el-button>
        </el-form-item>
      </el-form>
      <!-- 操作栏 -->
      <div class="control-btns">
        <el-button type="primary" @click="handleCreate">创建链接</el-button>
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
        <el-table-column
          show-overflow-tooltip
          prop="linkName"
          label="链接名称"
          align="center"
        />
        <el-table-column show-overflow-tooltip prop="oldLink" label="原始链接地址" align="center" />
        <el-table-column show-overflow-tooltip prop="shortLink" label="短链接地址" align="center" />
        <el-table-column show-overflow-tooltip  label="渠道发布链接" align="center" >
         <template slot-scope="scope">
            <span>{{scope.row.oldLink}}{{scope.row.shortLink }}</span>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip  label="最后更新时间" align="center" > 
         <template slot-scope="scope">
            <span>{{scope.row.updateTime  | formatDate}}</span>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="adminName" label="跟进人" align="center" />
        <el-table-column show-overflow-tooltip  label="结算方式" align="center" >
          <template slot-scope="scope">
            <span>{{scope.row.clearingForm =='0'? 'UV': scope.row.clearingForm =='1'? 'CPA' :  scope.row.clearingForm =='2'? 'CPM':  scope.row.clearingForm =='3'? 'CPD':'CPS' }}</span>
          </template>
        </el-table-column>
           <el-table-column
          :resizable="false"
          show-overflow-tooltip
          label="状态"
          width="90"
          align="center"
        >
          <template slot-scope="scope">
            <!-- <span>{{ scope.row.userState =='0'?'冻结':'正常' }}</span> -->
            <el-switch
              class="switch"
              v-model="scope.row.state"
              active-text="禁用"
              :active-value="0"
              active-color="#F04134"
              inactive-text="启用"
              :inactive-value="1"
              inactive-color="#00A854"
              @change="stateChange(scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="150">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleEdit(scope.$index,scope.row)">编辑</el-button>
            <el-button size="mini" type="primary" @click="handleDelete(scope.$index,scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
           <!-- 新增/编辑 弹出栏 -->
      <el-dialog
        :title="formVisibleList.title"
        :visible.sync="formVisibleList.formVisible"
        width="45%"
        class="dialog-form"
        :before-close="handleClose"
      >
        <el-form ref="dialogForm" :model="dialogForm" :rules="formRules" label-width="110px">
          <el-form-item label="链接名称：" prop="linkName">
            <el-input v-model="dialogForm.linkName" />
          </el-form-item>
          <el-form-item label="原始链接名称：" prop="oldLink">
            <el-input v-model="dialogForm.oldLink" />
          </el-form-item>
          <el-form-item label="短链接地址：" prop="shortLink">
            <el-input v-model="dialogForm.shortLink" />
          </el-form-item>
          <el-form-item label="结算方式：" prop="clearingForm">
            <el-select v-model="dialogForm.clearingForm">
              <el-option :value="'0'" label="UV" />
              <el-option :value="'1'" label="CPA" />
              <el-option :value="'2'" label="CPM" />
              <el-option :value="'3'" label="CPD" />
              <el-option :value="'4'" label="CPS" />
            </el-select>
          </el-form-item>
          <el-form-item label="跟进人：" prop="adminName">
              <el-input v-model="dialogForm.adminName" />
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
      <!-- 分页栏 -->
      <Pagination
        :total="total"
        :page.sync="listQuery.pageIndex"
        :limit.sync="listQuery.pageSize"
        @pagination="PostFetchData"
      />
      <!-- 新增/编辑 弹出栏 -->
    </el-card>
  </div>
</template>

<script>
//渠道链接列表   新增渠道链接 修改渠道链接 删除渠道链接 渠道链接导出
import {
  apiLinksList,apiInsertLinks,
  apiEditLinks,apiDeleteLinks,apiChannellinksExport
} from "../../api/apilist";
// import excel from "../../utils/excel";
import validatorForm from "../../assets/js/validatorForm";
import { excelList } from "../../assets/js/validate"
import Pagination from "../../components/Pagination";
// import Hints from '../../components/Hints'
export default {
  name: "Table",
  components: { Pagination },
  data() {
    return {
        //快捷选择时间
      pickerOptions: {
         // 设置不能选择的日期
        onPick: ({ maxDate, minDate }) => {
            this.choiceDate0 = minDate.getTime();
            if (maxDate) {
                this.choiceDate0 = '';
            }
        },
        disabledDate:
            (time) => {
                let choiceDateTime = new Date(this.choiceDate0).getTime();
                const minTime = new Date(choiceDateTime).setMonth(new Date(choiceDateTime).getMonth() - 1);
                const maxTime = new Date(choiceDateTime).setMonth(new Date(choiceDateTime).getMonth() + 1);
                const min = minTime;
                const newDate = new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1;
                const max = newDate < maxTime ? newDate : maxTime;
            //如果已经选中一个日期 则 返回 该日期前后一个月时间可选
                if (this.choiceDate0) {
                    return time.getTime() < min || time.getTime() > max;
                }
            //若一个日期也没选中 则 返回 当前日期以前日期可选
                return time.getTime() > newDate;
            }
      },
      // 数据列表加载动画
      listLoading: true,
      // 查询列表参数对象
      listQuery: {
        clearingForm  :null,//结算方式 UV 记录类型 1 充值 2消费 ,
        linkName :null,//链接名称
        oldLink: null, //原始链接名称：
        adminName :null,//跟进人
        startTime : null,//创建时间
        endTime  : null,//结束时间
        pageIndex: 1, //页码 ,
        pageSize: 10 //每页数据量大小 ,
      },
      createMap:null,//创建日期map
      // 新增/编辑提交表单对象
      // 数据总条数
      total: 0,
      // 表格数据数组

      tableData: [],
    
      // 新增/编辑 弹出框显示/隐藏
      formVisibleList: {
        formVisible: false,
        title: "编辑",
        isCreate: false
      },
          // 新增/编辑提交表单对象
      dialogForm: {
        linkName: null, //链接名称：
        oldLink: null, //原始链接名称：
        shortLink: null, //短链接地址：
        clearingForm: null, //结算方式：
        adminName: "", //跟进人： ,
        id: null
        // type: "" // 用户账户状态0未认证 1认证 2通用
      },
      formRules: {
        linkName: [
          { required: true, message: "请输入链接名称", trigger: "blur" },
          // {
          //   validator: validatorForm.validateCouponTitle,
          //   trigger: "blur"
          // }
        ],
        oldLink: [
          { required: true, message: "请输入原始链接名称", trigger: "blur" },
          // {
          //   validator: validatorForm.validateCouponTitle,
          //   trigger: "blur"
          // }
        ],
        shortLink: [
         { required: true, message: "请输入短链接名称", trigger: "blur" },
          // {
          //   validator: validatorForm.validateCouponTitle,
          //   trigger: "blur"
          // }
        ],
        clearingForm: [
          { required: true, message: "请选择结算方式", trigger: "change" }
        ],
        adminName: [
          { required: true, message: "请输入跟进人", trigger: "blur" },
          {
            validator: validatorForm.validateCouponTitle,
            trigger: "blur"
          }
        ]
      },
      // 表单校验 trigger: ['blur', 'change'] 为多个事件触发
      // 防止多次连续提交表单
      isSubmit: false,

    };
  },
  created() {
    this.PostFetchData();
  },
  methods: {
    handleCreate() {
      //创建banner 轮播图
      this.formVisibleList.formVisible = true;
      this.formVisibleList.title = "创建";
      this.formVisibleList.isCreate = true;
    },
    stateChange(row) {
      //动态切换状态
      // let data = {};
      let  { id,state } = row;
      // data["id"] = row.id; //id
      // data["userState"] = row.state; //当前的状态
      let data = {id,state };
      console.log(data);
      // return false;
      this.apiInsertLinksClick(data)
    },
    apiInsertLinksClick(data){//
       apiEditLinks(data) //编辑
        .then(res => {
          if (res.code === 200) {
            this.PostFetchData();
            this.cancleForm();
          }
        })
        .catch(error => {
          this.listLoading = false;
        });
    },
    // 新增/编辑弹出框 关闭时操作
    handleClose() {
      this.cancleForm();
    },
    // 编辑数据
    handleEdit(index, row) {
      this.formVisibleList.title = "编辑";
      console.log(row)
      let  { linkName, oldLink, shortLink, clearingForm, adminName ,id} = row;
      this.dialogForm = {linkName, oldLink, shortLink, clearingForm, adminName ,id};
      this.formVisibleList.isCreate = false;
      this.formVisibleList.formVisible = true;
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
      let data = { id: id };
      apiDeleteLinks(data)
        .then(res => {
          console.log(res);
          if (res.code == 200) {
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
    // 新增/编辑表单取消提交
    cancleForm() {
      Object.keys(this.dialogForm).forEach(key => {
        this.dialogForm[key] = null;
      });
      this.formVisibleList.formVisible = false;
    },
      // 新增/编辑表单确认提交
    submitForm(formName, isCreate) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // return false;
          let data = this.dialogForm;
          if (isCreate) {
            console.log(data);
            data["id"] = null;
            apiInsertLinks(data) //创建
              .then(res => {
                console.log(res);
                if (res.code === 200) {
                  // this.$refs[formName].resetFields(); //清空表单
                  this.PostFetchData();
                  this.cancleForm();
                }
              })
              .catch(error => {
                console.log(error);
                this.listLoading = false;
              });
          } else {
            // return false;
            apiEditLinks(data) //编辑
              .then(res => {
                if (res.code === 200) {
                  this.PostFetchData();
                  this.cancleForm();
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
    //渠道导出
    exportList(){
      let data = Object.assign({}, this.listQuery)
      delete data.pageSize;
      delete data.pageIndex;
      apiChannellinksExport(data) 
       .then(res => {
          console.log(res);
          excelList(res,'渠道链接')
          this.timer = setTimeout(()=>{
              this.$message.success('导出成功');
          }, 3000)
        })
        .catch(error => {
           this.$message({
                type: "error",
                message: '导出失败'
            });
          this.listLoading = false;
        });
    },
    // 获取数据列表
    PostFetchData() {
      this.listLoading = true;
      // 获取审核数据列表接口
      let data = this.listQuery;
      // delete data.dateTime;
      apiLinksList(data)
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
    changePicker(val) {
      //时间选择
      if (val) {
        this.listQuery.startTime = val[0];
        this.listQuery.endTime = val[1];
      } else {
        this.listQuery.startTime = null;
        this.listQuery.endTime = null;
      }
      console.log(val);
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
      this.createMap = null;
      this.listQuery.pageIndex = 1;
      this.listQuery.pageSize = 10;
      this.PostFetchData();
      // this.$refs["searchForm"].resetFields(); //清空表单
    },
    views(index,row){

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
/* switch按钮样式 */
.switch .el-switch__label {
  position: absolute;
  display: none;
  color: #fff !important;
}
/*打开时文字位置设置*/
.switch .el-switch__label--right {
  z-index: 1;
}
/* 调整打开时文字的显示位子 */
.switch .el-switch__label--right span {
  margin-right: 9px;
}
/*关闭时文字位置设置*/
.switch .el-switch__label--left {
  z-index: 1;
}
/* 调整关闭时文字的显示位子 */
.switch .el-switch__label--left span {
  margin-left: 9px;
}
/*显示文字*/
.switch .el-switch__label.is-active {
  display: block;
}
/* 调整按钮的宽度 */
.switch.el-switch .el-switch__core,
.el-switch .el-switch__label {
  width: 70px !important;
  margin: 0;
}
</style>
