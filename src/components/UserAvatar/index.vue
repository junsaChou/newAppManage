<template>
  <el-dropdown class="user-avatar-wrapper" @command="handleCommand">
    <div class="avatar-box">
      <el-avatar size="small" :src="avatarSrc" />
      <i class="el-icon-caret-bottom" />
    </div>
    <el-dropdown-menu slot="dropdown">
      <!-- <el-dropdown-item command="userCenter">个人中心</el-dropdown-item> -->
      <el-dropdown-item command="openPwd">修改密码</el-dropdown-item>
      <el-dropdown-item command="loginOut">退出登录</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import Avatar from "../../assets/img/avatar.png";
import { removeToken,removeUserInfoData } from "../../utils/cookie";
import { apiEditUserPassword } from "../../api/apilist";

export default {
  name: "UserAvatar",
  data() {
    return {
      avatarSrc: Avatar
    };
  },
  methods: {
    ...mapMutations(["removeUserInfo"]),
    handleCommand(command) {
      if (command === "userCenter") {
        this.$router.push({ path: "/user-center" });
      }
      if (command === "loginOut") {
        this.loginOut();
      }
      if (command === "openPwd") {
        this.openPwd();
      }
    },
    loginOut() {
      this.$confirm("确定注销并退出系统吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        removeToken();
        removeUserInfoData();
        this.removeUserInfo("userInfoList");
        this.$router.push("/login");
        location.reload();
      });
    },
    openPwd() {
      this.$prompt("请输入需要修改的密码", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^[A-Za-z0-9]{5,16}$/,
        inputErrorMessage: "请输入5-16位数的密码"
      })
        .then(({ value }) => {
          let data = { password :value }
          apiEditUserPassword(data)
            .then(res => {
              console.log(res);
              if (res.code === 200) {
                this.$message({
                  type: "success",
                  message: "密码修改成功"
                });
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
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    }
  }
};
</script>

<style lang="less">
.user-avatar-wrapper {
  float: left;
  width: 48px;
  padding: 3px 0 3px 20px;
  margin-left: 20px;
  border-left: solid 1px #ddd;
  cursor: pointer;
  .avatar-box {
    outline: none;
  }
  .el-avatar--small {
    display: inline-block;
    vertical-align: middle;
    width: 32px;
    height: 32px;
    line-height: 32px;
  }
  i {
    display: inline-block;
    vertical-align: middle;
    margin-left: 2px;
  }
}
</style>
