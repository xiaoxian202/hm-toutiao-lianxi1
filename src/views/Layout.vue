<template>
    <!-- 最外层大容器 -->
    <el-container class="container-layout">
        <!-- 左侧边栏 -->
        <el-aside :width= "isOpen ? '200px' : '64px'">
            <!-- logo -->
            <div class="logo" :class="{'minilogo': !isOpen}"></div>
            <!-- 侧边导航 
            @open="handleOpen":sub-menu 展开的回调
            @close="handleClose":sub-menu 收起的回调-->
            <el-menu
               :default-active="$route.path"
               class="el-menu-vertical-demo"
               background-color="#002233"
               text-color="#fff"
               active-text-color="#ffd04b"
               :collapse="!isOpen"
               :collapse-transition="isOpen"
               router>
                <el-menu-item index="/">
                    <i class="el-icon-s-home"></i>
                    <span>首页</span>
                </el-menu-item>
                <el-menu-item index="/article">
                    <i class="el-icon-document"></i>
                    <span>内容管理</span>
                </el-menu-item>
                <el-menu-item index="/image">
                    <i class="el-icon-picture"></i>
                    <span>素材管理</span>
                </el-menu-item>
                <el-menu-item index="/publish">
                    <i class="el-icon-s-promotion"></i>
                    <span>发布文章</span>
                </el-menu-item>
                <el-menu-item index="/comment">
                    <i class="el-icon-chat-dot-round"></i>
                    <span>评论管理</span>
                </el-menu-item>
                <el-menu-item index="/fans">
                    <i class="el-icon-present"></i>
                    <span>粉丝管理</span>
                </el-menu-item>
                <el-menu-item index="/setting">
                    <i class="el-icon-setting"></i>
                    <span>个人设置</span>
                </el-menu-item>
            </el-menu>
        </el-aside>
        <!-- 右边内容区 -->
        <el-container>
            <!-- 头部 -->
            <el-header>
                <!-- 字体图标 -->
                <span class="icon" :class="{'el-icon-s-fold':isOpen, 'el-icon-s-unfold': !isOpen}" @click="isOpen = !isOpen"></span>
                <!-- 文字 -->
                <span class="text">江苏传智播客科技教育有限公司</span>
                <!-- 下拉列表 -->
                <el-dropdown>
                    <!-- 头像 -->
                    <div class="el-dropdown-link" style="display: inline-block">
                        <img :src="user.photo" alt="">
                        <span class="name">{{user.name}}</span>
                        <span class="el-icon-arrow-down"></span>
                    </div>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="setting"><i class="el-icon-setting"></i>个人设置</el-dropdown-item>
                        <el-dropdown-item @click.native="setout"><i class="el-icon-unlock"></i>退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-header>
            <!-- 内容 -->
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
// 导入本地用户信息
import auth from '@/utils/auth'
export default {
    name:'layout',
    data() {
        return {
            isOpen:true,
            // 用户昵称，用户头像
            user:{
                name:'',
                photo:''
            }
        }
    },
    created() {
        const {name,photo} = auth.getUser()
        this.user = {name,photo}
    },
    methods:{
        // 跳转个人设置
        setting() {
            this.$router.push('/setting')
        },
        // 退出登录
        setout() {
            // 清除本地用地用户信息
            auth.delUser()
            // 跳转登录页面
            this.$router.push('/login')
        }
    }
}
</script>

<style lang="less" scoped>
.container-layout {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    .el-aside {
        background: #002233;
        .logo{
            width: 100%;
            height: 60px;
            background:#002244 url(../assets/logo_admin.png) no-repeat center / 140px auto;
        }
        .minilogo{
            background-image: url(../assets/logo_admin_01.png);
            background-size: 36px auto;
        }
    }
    .el-header {
        border-bottom: 1px solid #ddd;
        line-height: 60px;
        .icon {
            font-size: 24px;
            margin-right: 10px;
            vertical-align: middle;
        }
        .text {
            vertical-align: middle;
        }
        .el-dropdown {
            float: right;
            img {
                width: 30px;
                height: 30px;
                vertical-align: middle;
            }
            .name {
                margin: 0 10px;
            }
            .el-icon-arrow-down {
                font-size: 12px;
            }
        }    
    }
}

</style>