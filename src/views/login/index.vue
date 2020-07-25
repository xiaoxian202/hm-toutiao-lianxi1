<template>
  <div class="container-login">
    <el-card>
        <div>
            <img src="../../assets/logo_index.png" alt="">
        </div>
        <el-form v-model="loginForm">
            <el-form-item >
                <el-input placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item >
                <el-input placeholder="请输入验证码" style="width:240px; margin-right:8px"></el-input>
                <el-button>发送验证码</el-button>
            </el-form-item>
            <el-form-item>
                <!-- :value代表当前绑定值，默认选中 -->
                <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" style="width:100%">登录</el-button>
            </el-form-item>
        </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
    name:'page-login',
    data() {
       return{
            // 表单数据对象
            loginForm:{
                mobile:'',
                code:''
            }
       }
    }
}
</script>

<style lang="less" scoped>
.container-login {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: url(../../assets/login_bg.jpg) no-repeat center /cover;
    .el-card {
        width: 400px;
        height: 350px;
        background-color: #fff;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        img {
            display: block;
            width: 200px;
            margin: 0 auto 20px;
        }
    }
}
</style>