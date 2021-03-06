<template>
  <div>
    <div class="x-tabs">
      <div class="x-tabs__header">
        <ul class="x-tabs__nav">
          <li class="x-tabs__item" :class="{ active: loginType === 1 }" @click="loginType = 1">{{ $t(`forget.mobile`) }}</li>
          <li class="x-tabs__item" :class="{ active: loginType === 2 }" @click="loginType = 2">{{ $t(`forget.mail`) }}</li>
        </ul>
      </div>
      <div class="x-tabs__content">
        <div class="tabs-pane">
          <form class="login-form" _lpchecked="1">
            <template v-if="loginType === 1">
              <div class="input-group">
                <div class="el-input el-input-group el-input-group--prepend" aria-required="true" aria-invalid="true">
                  <input type="text" autocomplete="off" :placeholder="$t(`register.mobile`)" name="phone" v-model="phone" class="el-input__inner">
                </div>
              </div>
            </template>
            <template v-else>
              <div class="input-group">
                <div class="el-input el-input-group el-input-group--prepend" aria-required="true" aria-invalid="true">
                  <input type="text" autocomplete="off" :placeholder="$t(`register.mail`)" name="mail" v-model="mail" class="el-input__inner">
                </div>
              </div>
            </template>
            <div class="input-group">
              <div class="el-input captcha-input el-input-group el-input-group--prepend" aria-required="true" aria-invalid="true">
                <input type="text" autocomplete="off" :placeholder="$t(`register.captcha`)" name="phone" v-model="captchaCode" class="el-input__inner">
              </div>
              <div class="captcha-img" @click="initCaptcha">
                <span v-html="captchaImg"></span>
              </div>
            </div>
            <div class="input-group">
              <div class="code-input el-input el-input--suffix" aria-required="true" aria-invalid="true">
                <input type="text" autocomplete="off" :placeholder="$t(`register.code`)" name="code" v-model="code" class="el-input__inner">
                <span class="el-input__suffix">
                    <span class="el-input__suffix-inner">
                      <button  type="button" @click="onSendCode" class="el-button text-secondary el-button--text">
                        <span>
                          {{ $t(`register.code`) }}
                        </span>
                </button>
                </span>
                </span>
              </div>
            </div>
            <div class="input-group">
              <div class="code-input el-input el-input--suffix" aria-required="true" aria-invalid="true">
                <input type="password" autocomplete="off" :placeholder="$t(`register.password`)" name="code" v-model="password" class="el-input__inner">
              </div>
            </div>
            <div class="input-group">
              <div class="code-input el-input el-input--suffix" aria-required="true" aria-invalid="true">
                <input type="password" autocomplete="off" @keyup.enter="onSubmit" :placeholder="$t(`register.again`)" name="code" v-model="repassword" class="el-input__inner">
              </div>
            </div>
            <button @click="onSubmit" type="button" class="el-button btn-login el-button--primary ">
                <span>
                  {{ $t(`login.btn`) }}
                </span>
              </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { apiCaptcha, apiSendSms, apiForget } from '~/api';
  export default {
    async mounted () {
      this.initCaptcha()
    },
    methods: {
      async initCaptcha () {
        const { data } = await apiCaptcha();
        this.captchaImg = data
      },
      async onSubmit () {
        if(this.password !== this.repassword) {
          return this.$message({
            message: this.$i18n.messages[this.$i18n.locale].prompt.again,
            type: 'error'
          });
        }

        await apiForget({
          mobile: this.phone,
          code: this.code,
          password: this.password,
          mail: this.mail,
          loginType: this.loginType
        });

        this.$message({
          message: this.$i18n.messages[this.$i18n.locale].prompt.jump + '...',
          type: 'success'
        });
        setTimeout(() => {
          this.$router.replace('login')
        }, 1500);
      },
      async onSendCode () {
        const _phoneReg = new RegExp(this.Regs[this.loginType]);

        if(!_phoneReg.test(this.loginType === 1 ? this.phone : this.mail)) {
           return this.$message({
            message: this.loginType === 1 ? this.$i18n.messages[this.$i18n.locale].prompt.legalMobile : this.$i18n.messages[this.$i18n.locale].prompt.legalMail,
            type: 'warning'
          });
        }
        if(!this.captchaCode) {
          return this.$message({
              message: this.$i18n.messages[this.$i18n.locale].prompt.fail,
              type: 'error'
            });
        }
        try {
          await apiSendSms({
            mobile: this.phone,
            mail: this.mail,
            captcha: this.captchaCode,
            loginType: this.loginType
          })
            this.$message(this.$i18n.messages[this.$i18n.locale].prompt.codeSend);
          } catch (error) {
            this.$message({
              message: error,
              type: 'error'
            });
          }
      }
    },
    data() {
      return {
        mail: null,
        code: null,
        phone: null,
        captchaCode: null,
        captchaImg: '',
        password: '',
        repassword: '',
        loginType: 1,
        phoneReg: '^(13[0-9]|14[0-9]|15[0-9]|166|17[0-9]|18[0-9]|19[8|9])\\d{8}$',
        Regs: {
          1: '^(13[0-9]|14[0-9]|15[0-9]|166|17[0-9]|18[0-9]|19[8|9])\\d{8}$',
          2: '^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$',
        }
      };
    },
  };
</script>

<style lang="stylus" scoped>
  .captcha-img {
    position absolute
    top -12px
    right 0
  }
  .captcha-input {
    width 60%
  }
  #wy_captcha {
    width: 100%;
    height: 40px;
  }

  .wrapper {
    width: 100%;
    height: 40px;
  }

  .x-tabs {
    background-color: #fff;
    margin 0 auto
    padding: 40px 0;
  }

  .x-tabs__header {
    margin-bottom: 30px;
  }

  .x-tabs__nav {
    text-align: center;
    font-size: 0;
  }
  .x-tabs__content {
    max-width 400px
    margin 0 auto
  }
  .x-tabs__item {
    position: relative;
    display: inline-block;
    font-size: 20px;
    line-height: 30px;
    padding-left: 15px;
    padding-right: 15px;
    color: #3C3C3F;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    vertical-align: top;
  }

  .x-tabs__item.active {
    color: #303137;
    font-weight: bold;
  }

  .x-tabs__item+.x-tabs__item:before {
    content: '';
    display: inline-block;
    position: absolute;
    left: -1px;
    top: 5px;
    width: 2px;
    height: 20px;
    background-color: #3c3c3f;
  }

  .input-group {
    margin-bottom: 30px;
    position: relative;
  }

  .btn-login {
    display: block;
    width: 100%;
    height: 44px;
    font-size: 16px;
    margin-top: 50px;
    span {
      color white
    }
  }

  .extra {
    margin-top: 10px;
    font-size: 14px;
    line-height: 20px;
    color: #969699;
  }

  .text-secondary {
    color: #a99067;
  }

  .pointer {
    cursor: pointer;
  }

  a {
    background-color: transparent;
  }

  img {
    border-style: none;
  }

  button,
  input {
    font-family: inherit;
    font-size: 100%;
    line-height: 1.15;
    margin: 0;
  }

  button,
  input {
    overflow: visible;
  }

  button {
    text-transform: none;
  }

  button,
  [type="button"] {
    -webkit-appearance: button;
  }

  button::-moz-focus-inner,
  [type="button"]::-moz-focus-inner {
    border-style: none;
    padding: 0;
  }

  button:-moz-focusring,
  [type="button"]:-moz-focusring {
    outline: 1px dotted ButtonText;
  }

  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    background-color: #F5F5F5;
  }

  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 1px rgba(0, 0, 0, 0);
    box-shadow: inset 0 0 1px rgba(0, 0, 0, 0);
    border-radius: 10px;
    background-color: #f5f5f5;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
    box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
    background-color: #555;
  }

  ::-ms-clear,
  ::-ms-reveal {
    display: none;
  }

  ::-ms-expand {
    display: none;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  .el-icon-arrow-up:before {
    content: "\E605";
  }

</style>
