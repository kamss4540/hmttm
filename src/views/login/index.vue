<template>
  <div>
    <van-nav-bar class="topBar">
      <template slot="title">
        <div class="titleC">登录</div>
      </template>
    </van-nav-bar>

    <van-cell-group>
      <van-field v-model="useInfo.mobile" :error-message="errUser.mobile" clearable placeholder="请输入手机号">
        <template slot="left-icon">
          <i class="iconfont icon-iphone"></i>
        </template>
      </van-field>

      <van-field v-model="useInfo.code" :error-message="errUser.code" clearable placeholder="请输入验证码">
        <template slot="left-icon">
          <i class="iconfont icon-lock"></i>
        </template>
        <template slot="button">
          <van-button class="btn" size="small">获取验证码</van-button>
        </template>
      </van-field>
    </van-cell-group>

    <div class="login">
      <van-button @click="login" :loading="isLoading" loading-text="登录中" color="#6DB4FB" size="large">登录</van-button>
    </div>
  </div>
</template>

<script>
import apiUserLogin from '../../api/user'

export default {
  data () {
    return {
      useInfo: {
        mobile: '13911111111',
        code: '246810'
      },
      errUser: {
        mobile: '',
        code: ''
      },
      isLoading: false
    }
  },
  methods: {
    async login () {
      if (!this.yanzheng()) {
        return
      }
      try {
        this.isLoading = true
        let res = await apiUserLogin({
          mobile: this.useInfo.mobile,
          code: this.useInfo.code
        })
        this.isLoading = false
        // 通过vuex保存token
        this.$store.commit('setuser', res)
        this.$toast.success('登录成功')
        this.$router.push('/home')
      } catch (error) {
        this.$toast.fail('登录失败,请检查手机号和验证码')
      }
    },
    yanzheng () {
      this.errUser.mobile = ''
      this.errUser.code = ''
      let regM = /^1[3456789]\d{9}$/
      let regC = /^\d{6}$/
      let m = regM.test(this.useInfo.mobile.trim())
      let c = regC.test(this.useInfo.code.trim())
      if (!m) {
        this.errUser.mobile = '手机号不正确'
      }
      if (!c) {
        this.errUser.code = '无效的验证码'
      }
      return m && c
    }
  }
}
</script>

<style lang="less" scoped>
.topBar {
  background-color: #3296fa;

  .titleC {
    color: #fff;
  }
}

.btn {
  background-color: #ededed;
  border-radius: 20px;
  color: #666666;
}

.login {
  margin: 16px;
}

.van-cell-group.van-hairline--top-bottom {
  .iconfont {
    font-size: 18px;
  }
}

/deep/ .van-field__button {
  border-left: 2px solid #EEEEEE
}
</style>
