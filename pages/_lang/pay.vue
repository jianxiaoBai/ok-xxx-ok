<template>
  <div data-v-32f2f1fc="" class="pay">
    <div data-v-32f2f1fc="" class="page-container">
      <div data-v-32f2f1fc="" class="order-info el-row">
        <div data-v-32f2f1fc="" class="el-col el-col-16">
          <p data-v-32f2f1fc="" class="">{{ $t(`pay.state1`) }}：{{ $route.query.orderForm }}</p>
          <p data-v-32f2f1fc="" class="order-tips">{{ $t(`pay.state2`) }}</p>
          <p data-v-32f2f1fc="" style="margin-top: 10px; color: red;">{{ $t(`pay.state3`) }}</p>
        </div>
        <div data-v-32f2f1fc="" class="text-right el-col el-col-8">{{ $t(`pay.yingfu`) }}
          <em data-v-32f2f1fc="" class="money">{{ data.sum }}</em>{{ $t(`pay.unit`) }}
        </div>
      </div>
      <div data-v-32f2f1fc="" class="pay-methods">
        <ul data-v-32f2f1fc="" class="pay-methods-list">
          <li data-v-32f2f1fc="" class="active">
            <label data-v-32f2f1fc="" role="checkbox" aria-checked="true" aria-disabled="true"
                   class="el-checkbox is-disabled is-checked">
              <span aria-checked="mixed" class="el-checkbox__input is-disabled is-checked">
                <input type="checkbox" aria-hidden="true" disabled="disabled" true-value="3"
                       class="el-checkbox__original">
              </span>
            </label>
            <!-- <img data-v-32f2f1fc="" src="/_nuxt/img/alipay.00f8247.png" alt=""> -->
            <span data-v-32f2f1fc="" class="name">BTC {{ $t(`pay.pay`) }}</span>
            <span data-v-32f2f1fc="" class="recommend">{{ $t(`pay.commend`) }}</span>
          </li>
        </ul>
        <div>
           <div>
            <!-- <p style="font-size: 18px;"> {{ $t(`pay.choose.text`) }} </p> -->
            <!-- <div style="margin-left: 40px;"><el-radio v-model="radioValue" label="1">{{ $t(`pay.choose.one`) }}</el-radio></div> -->
            <!-- <div style="margin-left: 40px;"><el-radio v-model="radioValue" label="2">{{ $t(`pay.choose.two`) }}</el-radio></div> -->
          </div>
          <div>
            <span>{{ $t(`pay.useable`) }} :&nbsp;</span>
            <span style="font-size: 18px;">
              <strong>{{ btcData.useable }}</strong>
            </span>
          </div>
          <div>
            <span>{{ $t(`pay.xufu`) }} :&nbsp;</span>
            <span style="color: red; font-size: 18px;">
              <strong>{{ data.pay_btc }}</strong>
            </span>
            <span style="font-size: 12px;">&nbsp; {{ $t(`pay.xufuState`) }}</span>
          </div>
          <!-- <div>
            <span>收款地址:&nbsp;</span>
            <span>0x2e9e11ea7435395837223fec1052a0e5787bbe73</span>
          </div>
          <div style="width: 200px">
            <span>收款二维码:</span>
            <img src="~/assets/img/moneyQR.png" alt="">
          </div> -->
        </div>
        <div>
          <!-- <div>
            <el-input style="width: 40%" v-model="payAddress" placeholder="请输入付款地址, 用来确认是否已付款"></el-input>
          </div> -->
          <!-- <div data-v-32f2f1fc="" class="pay-info">
            <div data-v-32f2f1fc="">
              <el-button type="primary" @click="onPay">已付款成功</el-button>
            </div>
          </div> -->
        </div>
        <div>
          <p style="font-style: italic; color: red;">{{ $t(`pay.choose.two`) }}</p>
        </div>
        <div>
          <div>
            <el-input style="width: 40%" v-model="authAddress" :placeholder="$t(`pay.zhanwei`)"></el-input>&nbsp;&nbsp;<el-button
            type="primary" @click="onDig">{{ $t(`pay.bindBtn`) }}
          </el-button>
          </div>
          <div>
            <el-input style="width: 40%" v-model="inviteCode" :placeholder="$t(`pay.inviteCode`)"></el-input>&nbsp;&nbsp;<el-button
            type="primary" @click="onInviteCode">{{ $t(`pay.bindInviteCode`) }}
          </el-button>
          </div>
        </div>
        <div>
          <el-button type="success" @click="isConfirmBuy = true">{{ $t(`pay.payBtn`) }}</el-button>
          <el-button @click="onDelOrder">{{ $t(`pay.cancelBtn`) }}</el-button>
        </div>
        <el-dialog
          :title="$t(`pay.payBtn`) +  '?' "
          :visible.sync="isConfirmBuy"
          width="30%">
          <span>{{ $t(`prompt.confirmInfo.order`) }}: {{ $route.query.orderForm }}</span>
          <br/>
          <span>{{ $t(`prompt.confirmInfo.useable`) }}: {{ btcData.useable }}</span>
          <br/>
          <span>{{ $t(`prompt.confirmInfo.paySum`) }}: {{ data.pay_btc }}</span>
          <br/>
          <span>{{ $t(`prompt.confirmInfo.bindAddr`) }}: {{authAddress || '无'}}</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="isConfirmBuy = false">{{ $t(`prompt.cancel`) }}</el-button>
            <el-button type="primary" @click="onConfirmBuy">{{ $t(`prompt.confirm`) }}</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
  import { apiAsset, apiAuthAddr, apiAuthInviteCode, apiBuy, apiDelOrder, apiOrderForm } from '~/api'
  import { importPoint } from '~/util'
  export default {
    async mounted() {
      const {
        orderForm
      } = this.$route.query;
      importPoint();
      Promise.all([apiOrderForm({ orderForm }), apiAsset()])
        .then(([from, asset]) => {
          this.data = from.data;
          this.btcData = asset.data.find(x => x.coin === 1);
        })
    },
    data() {
      return {
        payAddress: null,
        authAddress: null,
        inviteCode: null,
        data: {},
        btcData: {},
        isBuy: true,
        isConfirmBuy: false,
        useCode: false,
        radioValue: '1'
      }
    },
    methods: {
      onDelOrder(order) {
        apiDelOrder({
          orderForm: this.$route.query.orderForm
        }).then(res => {
          this.$message({
            message: this.$i18n.messages[this.$i18n.locale].prompt.confirmInfo.orderCancel,
            type: 'success'
          })
          setTimeout(() => {
            this.$router.back()
          }, 1000);
        })
      },
      async onConfirmBuy() {
        if (this.btcData.useable - this.data.pay_btc < 0) {
          this.$message({
            message: this.$i18n.messages[this.$i18n.locale].prompt.confirmInfo.useableLack,
            type: 'warning'
          })
        } else {
          this.isConfirmBuy = false;
          await apiBuy({
            order_form: this.data.order_form,
            is_buy: 1,
            radio_value: this.radioValue
          });
          this.$message({
            message: this.$i18n.messages[this.$i18n.locale].prompt.confirmInfo.buyRequest,
            type: 'success'
          })
        }
        setTimeout(() => {
          this.$router.push(`${this.$i18n.messages[this.$i18n.locale].root}/center`);
        }, 1500);
      },
      onDig() {
        if (!this.authAddress) return
        if (this.authAddress.length !== 42) {
          return this.$message({
            message: this.$i18n.messages[this.$i18n.locale].prompt.addrLength,
            type: 'warning'
          })
        }
        apiAuthAddr({
          authAddress: this.authAddress
        }).then(x => {
          this.$message({
            message: this.$i18n.messages[this.$i18n.locale].prompt.bindSuccess,
            type: 'success'
          })
        })
      },
      onInviteCode() {
        if (!this.inviteCode) return
        if (this.inviteCode.length !== 8) {
          return this.$message({
            message: this.$i18n.messages[this.$i18n.locale].prompt.inviteCodeError,
            type: 'warning'
          })
        }
        apiAuthInviteCode({
          inviteCode: this.inviteCode,
          orderForm: this.$route.query.orderForm
        }).then(x => {
          if(x.data){
            if(!this.useCode){
              this.useCode = true;
              this.data.sum = x.data.sum;
              this.data.pay_btc = x.data.pay_btc;
              return this.$message({
                message: this.$i18n.messages[this.$i18n.locale].prompt.inviteCodeSuccess,
                type: 'success'
              })
            }
          }else{
            return this.$message({
              message: this.$i18n.messages[this.$i18n.locale].prompt.inviteCodeFail,
              type: 'warning'
            })
          }
        })
      },
      /* KMKAS&ASQW
      onPay() {
        if (!this.payAddress) return
        if (this.payAddress.length !== 42) {
          return this.$message({
            message: '地址长度不够',
            type: 'warning'
          })
        }

        apiCheckAddr({
          payAddress: this.payAddress,
          orderForm: this.data.order_form
        }).then((result) => {
          this.$message({
            message: '购买成功',
            type: 'success'
          })
          this.isBuy = false;
        })
      } */
    }
  }

</script>

<style lang="stylus">
  .pay {
    .el-button--primary,
    .el-button--success {
      span {
        color white
      }
    }
    .features[data-v-36a43c6d] {
      background-color: #fff;
      text-align: center;
      padding: 50px 120px;
    }

    img[data-v-36a43c6d] {
      height: 45px;
      width: auto;
    }

    p[data-v-36a43c6d] {
      margin-top: 20px;
      font-size: 20px;
      line-height: 20px;
      text-align: center;
    }

    .page[data-v-32f2f1fc] {
      background-color: #f6f6f6;
    }

    .page-container[data-v-32f2f1fc] {
      max-width: 1200px;
      margin: 0 auto;
      padding-top: 30px;
      padding-bottom: 30px;
    }

    .order-info[data-v-32f2f1fc] {
      margin-top: 20px;
      background-color: #fff;
      padding: 30px 60px;
      font-size: 18px;
      color: #303030;
    }

    .order-info .order-tips[data-v-32f2f1fc] {
      margin-top: 10px;
      font-size: 14px;
      color: #FDAA24;
    }

    .order-info .money[data-v-32f2f1fc] {
      font-size: 30px;
      font-weight: bold;
      color: #fd7220;
      font-style: normal;
      margin-left: 0.2em;
      margin-right: 0.2em;
    }

    .pay-methods[data-v-32f2f1fc] {
      line-height: 56px;
    }

    .recommend[data-v-32f2f1fc] {
      display: inline-block;
      vertical-align: top;
      background: #fd7220;
      border-radius: 4px;
      color: #fff;
      font-size: 12px;
      line-height: 14px;
      padding: 5px 6px;
      margin-left: 10px;
    }

    .pay-info[data-v-32f2f1fc] {
      margin-top: 20px;
    }

    .pay-online[data-v-32f2f1fc] {
      padding: 10px 60px 200px;
    }

    .dialog-content[data-v-32f2f1fc] {
      position: relative;
      padding-left: 55px;
    }

    .dialog-content img[data-v-32f2f1fc] {
      position: absolute;
      left: 0;
      top: 0;
      width: 40px;
      height: 40px;
    }

    .dialog-content h5[data-v-32f2f1fc],
    .dialog-content p[data-v-32f2f1fc] {
      font-size: 14px;
      font-weight: normal;
      line-height: 15px;
    }

    .dialog-content h5[data-v-32f2f1fc] {
      margin-bottom: 10px;
    }

    .dialog-content p[data-v-32f2f1fc] {
      color: #999;
    }

    .pay-methods[data-v-32f2f1fc] {
      margin-top: 30px;
      padding: 30px 60px;
      background-color: #fff;
    }

    .pay-methods-list li[data-v-32f2f1fc] {
      height: 66px;
      padding: 20px;
      line-height: 26px;
      border-top: 1px solid #EDEEF0;
      cursor: pointer;
    }

    .pay-methods-list li[data-v-32f2f1fc]:last-child {
      border-bottom: 1px solid #EDEEF0;
    }

    .pay-methods-list li.active[data-v-32f2f1fc] {
      background: rgba(65, 133, 245, 0.05);
      border: 2px solid #4185F5;
      padding: 18px 18px 19px;
    }

    .pay-methods-list li:hover span.name[data-v-32f2f1fc] {
      color: #606166;
    }

    .pay-methods-list li.disabled[data-v-32f2f1fc],
    .pay-methods-list li.disabled .name[data-v-32f2f1fc] {
      color: rgba(48, 49, 55, 0.3);
    }

    .pay-methods-list li.disabled img[data-v-32f2f1fc] {
      opacity: 0.4;
    }

    .pay-methods-list img[data-v-32f2f1fc] {
      height: 100%;
    }

    .pay-methods-list .name[data-v-32f2f1fc] {
      display: inline-block;
      margin-left: 1em;
      margin-right: 6px;
      min-width: 7em;
      font-size: 18px;
      letter-spacing: 1px;
      font-weight: bold;
      color: #303137;
      vertical-align: top;
    }

    .pay-methods-list .recommend[data-v-32f2f1fc] {
      margin-right: 4em;
    }

    .pay-methods-list .txt[data-v-32f2f1fc] {
      display: inline-block;
      vertical-align: top;
      margin-right: 4em;
      font-size: 14px;
    }

    .btn-add[data-v-32f2f1fc] {
      margin-top: -3px;
      padding: 0 15px;
      height: 32px;
      line-height: 30px;
      font-size: 14px;
      border: 1px dashed #cccdcf;
      color: #4D87EA;
      cursor: pointer;
    }

    .subhead[data-v-32f2f1fc] {
      font-size: 14px;
      color: #969699;
      font-weight: normal;
      margin-left: 2em;
    }
  }
</style>
