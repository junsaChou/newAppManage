<template>
  <div class="login-wrapper" :style="'background-image:url('+ Background +')'">
    <div class="form-box clear-fix">
      <div class="form-box-left" />
      <div class="form-box-right">
        <div class="form-title">
          <p>金牛展业</p>
        </div>
        <el-form
          ref="loginForm"
          :model="loginForm"
          :rules="loginRules"
          label-width="0px"
          class="login-form"
        >
          <el-form-item prop="username">
            <el-input
              type="text"
              auto-complete="off"
              placeholder="请输入用户名"
              prefix-icon="el-icon-user"
              v-model="loginForm.username"
              @blur="getImageCaptchaApi('isflag')"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              auto-complete="off"
              placeholder="请输入密码"
              prefix-icon="el-icon-lock"
              v-model="loginForm.password"
              @blur="getImageCaptchaApi('isflag')"
            />
          </el-form-item>
          <el-form-item prop="yzmcode">
            <div class="clear-fix">
              <el-input
                class="input-code"
                type="text"
                auto-complete="off"
                placeholder="验证码"
                prefix-icon="el-icon-lock"
                v-model="loginForm.yzmcode"
                @keyup.enter.native="handleLogin"
              />
              <div class="login-code" @click="getImageCaptchaApi('isFalse')">
                <img :src="imgStr" width="100%" />
                <!-- <canvas id="canvas" width="111" height="40"></canvas> -->
              </div>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary" style="width:100%;" @click.native="handleLogin"  @keyup.enter.native="handleLogin"  >
              <span v-if="!loading">立即登录</span>
              <span v-else>登 录 中...</span>
            </el-button>
            <!-- <el-checkbox v-model="loginForm.rememberMe">记住密码</el-checkbox> -->
          </el-form-item>
        </el-form>
        <p class="login-tip">推荐使用最新的谷歌或火狐浏览器（IE升级到IE9以上）</p>
      </div>
    </div>
  </div>
</template>

<script>
import Background from "../assets/img/login-background2.png";
import axios from "axios";
import { validatAlphabetsNum } from "@/assets/js/validate";
// import { login,getImageCaptcha } from "../api/login";
//登录 获取用户信息
import { apiLogin, apiGetUserInfo } from "../api/apilist";
import { getUserInfo } from "../utils/cookie";
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "Login2",
  data() {
    return {
      Background,
      loginForm: {
        username: "",
        password: "",
        yzmcode: "",
        rememberMe: true
      },
      imgStr: null,
      loginRules: {
        username: [
          { required: true, trigger: "blur", message: "用户名不能为空" }
        ],
        password: [
          { required: true, trigger: "blur", message: "密码不能为空" }
        ],
        yzmcode: [
          { required: true, trigger: "blur", message: "验证码不能为空" }
        ]
      },
      yzmToken: "",
      loading: false,
      redirect: undefined
    };
  },
  mounted() {
    // this.YZM("#canvas", 111, 40);
  },
  methods: {
    // YZM(selector, w, h) {
    //   function rn(min, max) {
    //     return parseInt(Math.random() * (max - min) + min);
    //   }
    //   //随机生成颜色的函数
    //   function rc(min, max) {
    //     var r = rn(min, max);
    //     var g = rn(min, max);
    //     var b = rn(min, max);
    //     return `rgb(${r},${g},${b})`;
    //   }
    //   var w = w;
    //   var h = h;
    //   var canvas = document.querySelector(selector);
    //   var ctx = canvas.getContext("2d");
    //   // 在canvas 上绘制背景颜色
    //   ctx.fillStyle = rc(180, 230);
    //   ctx.fillRect(0, 0, w, h);
    //   //随机字符串
    //   var pool = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456";
    //   var result = "";
    //   for (var i = 0; i < 4; i++) {
    //     // 取出随机的字母或数字
    //     var c = pool[rn(0, pool.length)];
    //     var fs = rn(18, 30);
    //     // 随机数字字母 的角度
    //     var deg = rn(-30, 30);
    //     ctx.font = fs + "px Simhei";
    //     ctx.textBaseLine = "top"; //文字的基线
    //     ctx.fillStyle = rc(80, 150); //设置字体的填充颜色
    //     ctx.save();
    //     ctx.translate(26 * i + 15, 15); //旋转的角度
    //     ctx.rotate((deg * Math.PI) / 180);
    //     ctx.fillText(c, -5, 10); //填充字体
    //     ctx.restore();
    //     result += c;
    //   }
    //   // 随机生成干扰线
    //   for (var i = 0; i < 5; i++) {
    //     ctx.beginPath(); //绘制起始路径
    //     ctx.moveTo(rn(0, w), rn(0, h)); //七点位置
    //     ctx.lineTo(rn(0, w), rn(0, h)); //终点位置
    //     ctx.strokeStyle = rc(180, 230);
    //     ctx.closePath(); //关闭绘制
    //     ctx.stroke();
    //   }
    //   //随机产生 40个小的干扰圆点
    //   for (var i = 0; i < 40; i++) {
    //     ctx.beginPath();
    //     ctx.arc(rn(0, w), rn(0, h), 1, 0, 2 * Math.PI);
    //     ctx.closePath();
    //     ctx.fillStyle = rc(150, 200);
    //     ctx.fill();
    //   }
    //   this.yzmToken = result; //获取验证码信息
    //   return result;
    // },
    ...mapMutations(["setToken", "setUserInfo","setUserInfoData"]),
    getImageCaptchaApi(flag) {
      if (flag == 'isflag'){
          //获取验证码
        if (this.imgStr != null) {
          return false;
        }
      }
      if ((this.loginForm.username != "") & (this.loginForm.password != "")) {
        const params = {
          account: this.loginForm.username
        };
        this.$axios({
          url: "/qd-admin/backstageUser/getImageCaptcha",
          params,
          method: "get",
          responseType: "blob" // 表明返回服务器返回的数据类型
        })
          .then(res => {
            let blob = new Blob([res.data], { type: "image/jpg" });
            var Fr = new FileReader();
            Fr.readAsDataURL(blob);
            Fr.onload = event => {
              //这个就是转换为的base64图片地址
              this.imgStr = event.target.result;
            };
          })
          .catch(error => {});
      }
    },
    initGetUsergInfo() {
      //用户登录
      apiGetUserInfo()
        .then(res => {
        
          if (res.code == "200") {
            let role = res.data.role.split(",");
            this.setUserInfo(JSON.stringify(role)); //设置用户信息
            this.setUserInfoData(res.data)//个人中心信息
            this.$router.push({
                path: this.redirect != undefined ? this.redirect : "/"
              });
          } else {
            this.$message({
              type: "error",
              message: res.message
            });
          }
        })
        .catch(() => {});
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        const params = {
          account: this.loginForm.username,
          password: this.loginForm.password,
          captcha: this.loginForm.yzmcode
        };
        if (valid) {
          let isName = validatAlphabetsNum(this.loginForm.username);
          let isId = validatAlphabetsNum(this.loginForm.password);
          let codeId = validatAlphabetsNum(this.loginForm.yzmcode);
          if (
            12 <= this.loginForm.password.length ||
            this.loginForm.password.length < 4 ||
            !isId
          ) {
            this.$message({
              message: "请输入数字字母在内的4-12位数密码",
              type: "warning"
            });
            return;
          }
          if (
            !isName ||
            16 < this.loginForm.username.length ||
            this.loginForm.username.length < 4 ||
            !codeId
          ) {
            // this.$toast.fail(isName[1] || isId[1]);  ||
            // this.loginForm.yzmcode.toLowerCase() !=
            //   this.yzmToken.toLowerCase()
            this.$message({
              message: "请输入正确格式" || "请输入右侧验证码",
              type: "warning"
            });
            return;
          }
          this.loading = true;
          // this.$router.push("/content");
          //  this.$router.push("/")
          apiLogin(params)
            .then(res => {
              if (res.code == "200") {
                let that = this;
                this.setToken(res.data); //设置token
                this.initGetUsergInfo(); //获取用户信息
                // return false;
              } else {
                this.$message({
                  type: "error",
                  message: res.message
                });
              }
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
            });
        }
      });
    }
  }
};
</script>

<style lang="less">
.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-size: cover;
  .form-box {
    width: 780px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 20px 0 rgba(5, 22, 47, 0.07);
    .form-box-left {
      float: left;
      width: 340px;
      height: 500px;
      background: url("../assets/img/login-bg-left.png") center no-repeat;
      background-size: cover;
    }
    .form-box-right {
      float: left;
      width: 440px;
      padding: 16px 70px;
      box-sizing: border-box;
      .form-title {
        height: 40px;
        margin-top: 64px;
        margin-bottom: 32px;
        line-height: 40px;
        text-align: center;
        color: #29304e;
        font-size: 28px;
        font-family: MicrosoftYaHei;
        text-shadow: 0 4px 20px rgba(5, 22, 47, 0.07);
      }
      .login-tip {
        margin-top: 50px;
        font-size: 12px;
        font-family: MicrosoftYaHei;
        color: #999;
        text-align: center;
        line-height: 20px;
      }
      .input-code {
        float: left;
        width: 174px;
      }
      .login-code {
        float: left;
        width: 111px;
        height: 40px;
        margin-left: 15px;
      }
      .el-input__inner {
        height: 40px;
        line-height: 40px;
        border-radius: 2px;
        border: 1px solid #dcdfe6;
      }
      .el-button--small {
        height: 40px;
        border-radius: 2px;
        background: #2962ff;
      }
      .el-form-item--small.el-form-item {
        margin-bottom: 24px;
      }
    }
  }
}
</style>
