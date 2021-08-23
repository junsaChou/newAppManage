<template>
  <div class="table-classic-wrapper">
    <el-card shadow="always">
      <!-- 查询栏 -->
      <mixSearch  v-model="listQuery"  :fields="searchFields" ref="form"  @reset="onReset"/>
      <!-- 操作栏 -->
      <div class="control-btns">
        <el-button type="primary" @click="handleCreate">创建账户</el-button>
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
          prop="id"
          label="ID"
          align="center"
          width="90"
          sortable
        />
        <el-table-column show-overflow-tooltip prop="account" label="用户账号" align="center" />
        <el-table-column show-overflow-tooltip prop="userName" label="姓名" align="center" />
        <el-table-column show-overflow-tooltip  prop="roleName" label="角色权限" align="center" />
        <el-table-column show-overflow-tooltip label="注册时间" align="center" width="120">
          <template slot-scope="scope">
            <span>{{scope.row.createTime | formatDate}}</span>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip label="状态" align="center">
          <template slot-scope="scope">{{ scope.row.state == '0'? '停用':'启用' }}</template>
        </el-table-column>
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
        :page.sync="page.pageIndex"
        :limit.sync="page.pageSize"
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
          <el-form-item label="用户账号：" prop="account">
            <el-input :disabled="!formVisibleList.isCreate" v-model="dialogForm.account" />
          </el-form-item>
          <el-form-item label="姓名：" prop="userName">
            <el-input v-model="dialogForm.userName" />
          </el-form-item>
          <el-form-item label="账户密码：" v-if="formVisibleList.isCreate" prop="password">
            <el-input v-model="dialogForm.password " />
          </el-form-item>
          <el-form-item label="角色权限：" prop="role ">
            <el-checkbox-group v-model="dialogForm.role ">
              <el-checkbox
                v-for="(item,i) in nameArray"
                :key="i"
                :label="item.authCode"
                :name="item.label"
              >{{item.label}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <!-- <el-form-item label="角色权限：" prop="role ">
            <el-tree
              :data="nameData"
              show-checkbox
              node-key="authCode"
              :props="defaultProps"
              ref="tree"
             >
            </el-tree>
          </el-form-item> -->
          <el-form-item label="状态：" v-if="!formVisibleList.isCreate" prop="state">
            <el-select v-model="dialogForm.state">
              <el-option :value="0" label="停用" />
              <el-option :value="1" label="启用" />
            </el-select>
          </el-form-item>
          <el-form-item v-if="!formVisibleList.isCreate">
            <el-button type="success" @click="resetPwd(dialogForm.id)">重置密码</el-button>
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
    </el-card>
  </div>
</template>

<script>
//账户列表  编辑用户列表 //4 创建用户 5 重置密码
import {
  apiGetUserList,
  apiEditUser,
  apiDeletUser,
  apiCreateUser,
  apiResetPassword
} from "../../api/apilist";
// import excel from "../../utils/excel";
import validatorForm from "../../assets/js/validatorForm";
import Pagination from "../../components/Pagination";
import { nameArray , nameData} from "@/assets/js/mock"
import mixSearch from "../../components/mixSearch";

export default {
  name: "AccountManage",
  components: { Pagination,mixSearch },
  data() {
    return {
      // 数据列表加载动画
      listLoading: true,
      // 查询列表参数对象
      listQuery: {
        // account: null, //用户账户
        // userName: null, //用户名
      },
      page:{
        pageIndex: 1, //页码 ,
        pageSize: 10, //每页数据量大小 ,
      },
      searchFields: [
        { span: 2, prop: 'account', name: '用户账号', placeholder: '请输入' },
        {span: 2, prop: 'userName', name:'姓名', placeholder: '请输入'},
        {
          span: 2,
          type: 'reset',
          style:'warning',
          class:'resetName',
          label: '重置',
          options: [
            { label: '搜索', type: 'primary', click: this.onSubmit }
          ],
        },
      ],
      // 新增/编辑提交表单对象
      dialogForm: {
        account: null, //账户
        userName: null, //用户名
        password: null, //密码
        role: [], //用户权限
        id: null, // id ,
        state: null //状态0禁用1启用 ,
        // type: "" // 用户账户状态0未认证 1认证 2通用
      },
      nameArray: [],
      nameData: [],
      dateTime: null, //搜索表格绑定时间
      // 数据总条数
      total: 0,
      // 表格数据数组

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
       defaultProps: {
        children: "children",
        label: "label"
      },
      //权限Tree选中的节点
      moduleids: [],
      //获取table当前选中行row对象
      curRow: null,
      // 表单校验 trigger: ['blur', 'change'] 为多个事件触发
      formRules: {
        account: [
          { required: true, message: "请输入用户账户", trigger: "blur" },
          {
            validator: validatorForm.validateNumbetAcReg,
            trigger: "blur"
          }
        ],
        userName: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          {
            validator: validatorForm.validateUserName,
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            validator: validatorForm.validateNumbetAcReg,
            trigger: "blur"
          }
        ],
        role: [{ required: true, message: "请分配用户权限", trigger: "blur" }],
        endTime: [
          { required: true, message: "请输入结束时间", trigger: "blur" }
        ],
        type: [
          { required: true, message: "请选择用户账户状态：", trigger: "change" }
        ]
      },
      // 防止多次连续提交表单
      isSubmit: false,
      // 导入数据 弹出框显示/隐藏
    };
  },
  created() {
    this.PostFetchData();
    this.nameArray = nameArray;
    this.nameData = nameData;
  },
  methods: {
    // 选择权限
    // handleCheckChange() {
    //   let parentArr = this.$refs.tree.getHalfCheckedKeys() //通过 key 获取 半选中
    //   let childeArr = this.$refs.tree.getCheckedKeys() //通过 key 获取 选中的
    //   let roleIds = childeArr.concat(parentArr) //全部选中的

    //   // console.log(roleIds);
    //     this.moduleids = roleIds ? roleIds : [] //应该有的权限id
    //     var newArr = [] //需要展示的数据
    //     var item = ''
    //     this.moduleids.forEach(item => {
    //       // console.log(item);
    //       this.checked(item, this.nameData, newArr)
    //       //   item  //上面的各项节点id
    //       // this.rootData 所有的id
    //     })
    //     this.moduleids = newArr//需要展示的数据
     
    //   console.log(newArr) 
    // },
    checked(authCode, data, newArr) {
      data.forEach(item => {//遍历组成树结构的数据
        console.log(newArr);
        if (item.authCode == authCode) {//需要显示的如果有父元素的节点
          // 当子节点数组为数组[]时用  item.childList.length==0  childList是子节点的数组名
          // 当子节点为空是后台传的为null时用  item.childList==null
          if (item.children == null) {
            newArr.push(item.authCode)//把这个数据添加
          }
        } else {//需要显示的没有父元素的节点但是有子节点
          if (item.children != null) {
            this.checked(authCode, item.children, newArr)
          }
        }
        })
    },
    // 编辑数据
    handleEdit(index, row) {
      this.formVisibleList.formVisible = true;

      this.formVisibleList.title = "编辑";
      this.formVisibleList.isCreate = false;
      let { id,account,userName,state } = row;
      // this.dialogForm =  { id,account,userName,state };
       this.dialogForm.id = id;
       this.dialogForm.account = account;
       this.dialogForm.userName = userName;
       this.dialogForm.state = state;
      if (row.role != null) {
        this.dialogForm.role = row.role.split(",");
      }
    },
    // 删除数据
    handleDelete(index, row) {
      this.$confirm("此操作将删除选中数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteApi(row);
          // 此处可添加--删除接口
          // 删除成功调用fetchData方法更新列表
          // apiDeletUser();
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
    //重置密码的接口
    resetPwd(id) {
      let data = { userId: id };
      apiResetPassword(data)
        .then(res => {
          if (res.code === 200) {
            // this.PostFetchData(); //重新请求接口
            this.$message({
              type: "success",
              message: "密码重置成功"
            });
          } else {
            this.$message({
              type: "warning",
              message: res.message
            });
          }
        })
        .catch(error => {
          this.listLoading = false;
        });
    },

    deleteApi(id) {
      let data = { id: id };
      apiDeletUser(data)
        .then(res => {
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

    // 新增/编辑弹出框 关闭时操作
    handleClose() {
      this.cancleForm();
      // this.$refs.dialogForm.resetFields();
    },
    handleCreate() {
      //创建banner 轮播图
      this.formVisibleList.formVisible = true;
      this.formVisibleList.title = "创建";
      this.formVisibleList.isCreate = true;
    },
    // 获取数据列表
    PostFetchData() {
      // this.listLoading = true;
      // // 获取审核数据列表接口
      // let data = this.listQuery;
      this.listLoading = true;
      let { pageIndex,pageSize } = this.page;
      let searchData = Object.assign({}, this.listQuery);
      let data = { ...searchData,pageIndex,pageSize}
      apiGetUserList(data)
        .then(res => {
          if (res.code === 200) {
            
            this.total = res.data.total;
            this.tableData = res.data.list;
           
            if(this.tableData.length >0){
              this.tableData.forEach(e=>{
                let roleName = [];
                let roleList = [];
                let roleArr = e.role.split(',');
                this.nameArray.map(j=>{
                  if(roleArr.indexOf(j.authCode)!=-1 ){
                    roleName.push(j.label)
                    roleList.push(j.authCode)
                  }
                })
                e.role = roleList.join(',');
                e['roleName'] = roleName.join(',');
              })
            }
            // console.log(this.tableData)
            this.listLoading = false;
          } else {
            this.$message({
              type: "warning",
              message: res.message
            });
          }
        })
        .catch(error => {
          this.$message({
              type: "warning",
              message: error
            });
          console.log(error);
          this.listLoading = false;
        });
    },
    // 查询数据
    onSubmit() {
      this.page.pageIndex = 1;

      this.PostFetchData();
    },
    //重置数据
    onReset() {
      let that = this;
      Object.keys(that.listQuery).forEach(key => {
        that.listQuery[key] = null;
      });
      that.onSubmit();
      // this.$refs["searchForm"].resetFields(); //清空表单
    },
    // 新增/编辑表单确认提交
    submitForm(formName, isCreate) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let data = {};
          if (this.dialogForm.role.length == 0) {
            this.$message({
              type: "warning",
              message: "请分配用户权限！"
            });
            return false;
          }

          if (isCreate) {
            data["account"] = this.dialogForm.account;
            data["password"] = this.dialogForm.password;
            data["role"] = this.dialogForm.role.join(",");
            data["userName"] = this.dialogForm.userName;
            apiCreateUser(data) //创建
              .then(res => {
                if (res.code === 200) {
                  this.PostFetchData();
                  // this.$refs[formName].resetFields(); //清空表单
                  this.cancleForm();
                } else {
                  this.$message({
                    type: "warning",
                    message: res.message
                  });
                  return false;
                }
              })
              .catch(error => {
                console.log(error);
                this.listLoading = false;
              });
          } else {
            data["id"] = this.dialogForm.id;
            data["role"] = this.dialogForm.role.join(",");
            data["userName"] = this.dialogForm.userName;
            data["state"] = this.dialogForm.state;
            apiEditUser(data) //编辑
              .then(res => {
                console.log(res);
                if (res.code === 200) {
                  this.PostFetchData();
                  this.cancleForm();
                } else {
                  this.$message({
                    type: "warning",
                    message: res.message
                  });
                  
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
      // this.handleCheckChange();
      // return false;
      this.formVisibleList.formVisible = false;
      let that = this;
      Object.keys(that.dialogForm).forEach(key => {
        that.dialogForm[key] = null;
      });
      this.dialogForm.role = [];
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
.el-tree-node.is-expanded>.el-tree-node__children {
    display: flex;
    flex-wrap: wrap;
  .is-focusable{
    width: 30%;
  }
  
}
</style>
