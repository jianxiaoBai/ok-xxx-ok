<template>
  <div class="product-container">
    <div class="home-head">
      <div class="home-banner">
        <div class="slogan">{{ $t(`home.title`) }}</div>
        <div class="subhead">
          <span>{{ $t(`home.title1`) }}</span>
        </div>
        <div class="list">
          <ul>
            <li v-for="(item, index) in $t(`home.list`)" :key="index">
              <div><i :class="[item.icon, 'icon', 'iconfont']"></i></div>
              <div class="title">{{ item.title }}</div>
              <div class="content">{{ item.content }}</div>
            </li>
          </ul>
        </div>
      </div>
      <div class="home-introduce">
        <div><i class="icon iconfont icon-biaoqian"></i>{{ $t(`home.slogan`) }}</div>
        <div><i class="icon iconfont icon-biaoqian"></i>{{ $t(`home.slogan1`) }}</div>
      </div>
    </div>
    <div class="hot-line">
      <div class="qq-img">
        <img src="~/assets/img/qq.png" alt="">
      </div>
      <div class="qq-info">
        <span>咨询QQ</span>
        <span>2046603559</span>
        <div>
          <img src="~/assets/img/qr_qq.jpg" alt="">
        </div>
      </div>
    </div>
    <section class="minerList">
      <ul class="miner-category clearfix">
        <li class="active">{{ $t(`home.shopTitle`) }}
        </li>
      </ul>
      <ul class="miner-product-list clearfix">
        <li v-for="(item, index) in shopList" :key="index">
          <svg width="85.5" height="30" xmlns="http://www.w3.org/2000/svg" class="product-label" v-if="item.is_new">
              <path fill="#4D87EA" d="M0 0h85.5l-30 30H0z"></path>
              <text x="10" y="20" fill="#fff" font-size="14">{{ $t(`shop.new`) }}</text>
              <!-- <text x="10" y="20" fill="#fff" font-size="14">{{ index === 0 ? $t(`shop.sell`) : $t(`shop.new`) }}</text> -->
              <!-- <text x="10" y="20" fill="#fff" font-size="14">{{$t(`shop.sell`)}}</text> -->
            </svg>
          <!-- <div class="product-img">
            <img src="" alt="miner">
          </div> -->
          <div class="product-detail-container">
            <p class="procuct-name">
              <span>{{ item.name }}</span>
              <span v-show="false">TRUE {{ $t(`shop.name`) }}</span>
            </p>
             <p class="product-detail">{{ $store.state.locale === 'zh' ? item.detail : 'Professional GPU mining machine'}}</p>
            <!-- <p class="product-delivery">发货时间：2018-08-10</p> -->
            <p class="product-discount"></p>
            <div class="product-count clearfix">
              <!-- <div class="left">
                <p class="sale-price">
                  <span>{{ item.price }}$</span>
                </p>
                <p class="original-cost">
                  <span>矿机售价</span>
                </p>
              </div> -->
              <!-- <nuxt-link type="button" class="el-button right el-button--primary" to="/cart"> -->
              <!-- <nuxt-link class="el-button right el-button--primary" :class="{ disabled: index === 0 }" :to="`${$t(`root`)}/product?shop=${item.id}`"> -->
              <!-- <nuxt-link class="el-button right el-button--primary" :class="{ disabled: true }" :to="`${$t(`root`)}/product?shop=${item.id}`"> -->
              <nuxt-link class="el-button right el-button--primary" :to="`${$t(`root`)}/product?shop=${item.id}`">
                  <span>
                    {{ $t(`shop.btn`) }}
                  </span>
              </nuxt-link>
            </div>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>
<script>
import { importPoint } from '~/util'
import { apiShopList } from '~/api'
export default {
   data () {
    return {
      shopList: []
    }
  },
  mounted () {
    // 埋点
    importPoint();
    apiShopList().then(({ data }) => {
      this.shopList = data;
    })
  }
}
</script>

<style lang="stylus" scpoed>
.disabled {
  cursor: not-allowed;
  pointer-events: none;
  opacity: 0.6;

}
.hot-line {
  position: fixed;
  top: 160px;
  right: 100px;
  text-align: center;
  z-index: 999;

  .qq-img {
    img {
      width: 100px;
    }
  }

  .qq-info {
    background: #D13124;
    padding: 2px 0;
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    padding: 10px;

    span {
      line-height: 30px;
      color: white;
      font-size: 16px;
    }
  }
}

.icon-biaoqian {
  color: #F95959;
  vertical-align: middle;
  font-size: 20px;
  margin-right: 5px;
}

.home-head {
  background: white;
  // height 500px
  width: 100%;
  padding: 60px;

  .home-banner {
    background-image: url('~/assets/img/banner.jpg');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    // width 70%
    width: 895px;
    // min-width 850px
    height: 500px;
    margin: 0 auto;
    text-align: center;

    .slogan {
      font-size: 50px;
      font-weight: bold;
      padding-top: 50px;
      text-shadow: 1px 1px 5px #929396;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .subhead {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      span {
        line-height: 40px;
        background-color: #fff;
        padding: 5px 25px;
        border-radius: 50px;
        font-size: 20px;
        color: #FC5E5A;
        margin-top: 20px;
        font-weight: bold;
      }
    }

    .list {
      margin-top: 35px;

      ul {
        display: flex;
        justify-content: space-around;
        padding: 0 48px;

        li {
          width: 251px;
          max-height: 270px;
          // padding-top 20px
          overflow: auto;
          background: white;

          .iconfont {
            font-size: 45px;
            line-height: 80px;
          }

          .title {
            font-size: 18px;
            font-weight: bold;
          }

          .content {
            margin-top: 15px;
            padding: 0 15px;
            line-height: 30px;
          }
        }
      }
    }
  }

  .home-introduce {
    margin: 20px auto;
    width: 70%;
    background-color: #FAFAFA;
    // background-color red
    text-align: center;
    border-radius: 50px;
    padding: 10px;

    div {
      font-weight: bold;
      line-height: 30px;
    }
  }
}

.product-container {
  background: #fafafa;
  width: 100%;

  /* CSS Used from: https://hash.hc.top/_nuxt/app.4188da40ee5b0a0b9632a89578998921.css */
  .el-button span {
    color: white;
  }

  .features {
    background-color: #fff;
    text-align: center;
    padding: 50px 120px;
  }

  img {
    width: 65px;
  }

  p {
    margin-top: 20px;
    font-size: 20px;
    line-height: 20px;
    text-align: center;
  }

  .banner img {
    width: 100%;
    display: block;
  }

  .pointer {
    cursor: pointer;
  }

  .minerList {
    width: 80%;
    margin: 0 auto;
    padding-top: 50px;
  }

  .miner-category li {
    float: left;
    color: #969699;
    font-size: 20px;
    margin-right: 40px;
    cursor: pointer;
    -webkit-transition: color ease 0.3s;
    transition: color ease 0.3s;
  }

  .miner-category li.active {
    color: #303137;
    border-bottom: 3px solid #303137;
    padding-bottom: 5px;
    font-weight: bold;
  }

  .miner-product-list {
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
  }

  .miner-product-list li {
    width: 500px;
    overflow: auto;
    position: relative;
    // margin-right: 100px;
    background: #fff;
    float: left;
    margin-bottom: 60px;
    cursor: pointer;
    -webkit-transition: all 0.2s;
    transition: all 0.2s;
  }

  .miner-product-list li:nth-child(2n) {
    margin-right: 0;
  }

  .miner-product-list li:hover, .miner-product-list li:focus {
    -webkit-box-shadow: 0 0 10px 0px #ccc;
    box-shadow: 0 0 10px 0px #ccc;
  }

  .product-label {
    position: absolute;
    top: 0;
    left: 0;
  }

  .product-img {
    text-align: center;
  }

  .product-img img {
    display: none;
    width: 570px;
    height: 200px;
    // height: 397px;
    vertical-align: middle;
  }

  .procuct-name {
    margin-top: 25px;
    line-height: 31px;
  }

  .procuct-name span:first-child {
    font-size: 24px;
    color: #333333;
    font-weight: bold;
    margin-right: 35px;
    vertical-align: middle;
  }

  .procuct-name span:last-child {
    font-size: 14px;
    color: #151515;
    border: 1px solid #E0E0E0;
    border-radius: 2px;
    padding: 5px 10px;
    vertical-align: middle;
  }

  .product-detail-container {
    padding: 30px 40px 38px;
    cursor: default;
  }

  .product-detail {
    margin: 10px 0 15px;
  }

  .product-detail, .product-delivery {
    margin-bottom: 10px;
    font-size: 14px;
    color: #999;
  }

  .product-discount {
    min-height: 20px;
    font-size: 14px;
    color: #303137;
    font-weight: bold;
  }

  .product-count {
    margin-top: 30px;
    display: flex;
    justify-content: center;
  }

  .product-count .left .sale-price {
    font-size: 24px;
    color: #FD7220;
  }

  .product-count .left .original-cost {
    font-size: 14px;
    color: #999999;
  }

  .product-count .left .decoration {
    text-decoration: line-through;
  }

  .product-count button {
    margin-top: 5px;
    min-width: 164px;
  }

  .product-count button.is-disabled {
    cursor: pointer;
  }

  .el-button:hover, .el-button:focus {
    color: #303137;
    border-color: #c1c1c3;
    background-color: #eaeaeb;
  }

  .el-button:active {
    color: #2b2c32;
    border-color: #2b2c32;
    outline: none;
  }

  .el-button::-moz-focus-inner {
    border: 0;
  }

  .el-button.is-disabled, .el-button.is-disabled:hover, .el-button.is-disabled:focus {
    color: #c0c4cc;
    cursor: not-allowed;
    background-image: none;
    background-color: #fff;
    border-color: #ebeef5;
  }

  .el-button--primary {
    color: #fff;
    background-color: #303137;
    border-color: #303137;
  }

  .el-button--primary:hover, .el-button--primary:focus {
    background: #595a5f;
    border-color: #595a5f;
    color: #fff;
  }

  .el-button--primary:active {
    background: #2b2c32;
    border-color: #2b2c32;
    color: #fff;
    outline: none;
  }

  .el-button--primary.is-disabled, .el-button--primary.is-disabled:hover, .el-button--primary.is-disabled:focus, .el-button--primary.is-disabled:active {
    color: #fff;
    background-color: #98989b;
    border-color: #98989b;
  }

  .el-button:hover, .el-button:focus {
    color: #303137;
    border-color: #c1c1c3;
    background-color: #eaeaeb;
  }

  .el-button:active {
    color: #2b2c32;
    border-color: #2b2c32;
    outline: none;
  }

  .el-button::-moz-focus-inner {
    border: 0;
  }

  .el-button.is-disabled, .el-button.is-disabled:hover, .el-button.is-disabled:focus {
    color: #c0c4cc;
    cursor: not-allowed;
    background-image: none;
    background-color: #fff;
    border-color: #ebeef5;
  }

  .el-button--primary {
    color: #fff;
    background-color: #303137;
    border-color: #303137;
  }

  .el-button--primary:hover, .el-button--primary:focus {
    background: #595a5f;
    border-color: #595a5f;
    color: #fff;
  }

  .el-button--primary:active {
    background: #2b2c32;
    border-color: #2b2c32;
    color: #fff;
    outline: none;
  }

  .el-button:hover, .el-button:focus {
    color: #303137;
    border-color: #c1c1c3;
    background-color: #eaeaeb;
  }

  .el-button:active {
    color: #2b2c32;
    border-color: #2b2c32;
    outline: none;
  }

  .el-button::-moz-focus-inner {
    border: 0;
  }

  .el-button.is-disabled, .el-button.is-disabled:hover, .el-button.is-disabled:focus {
    color: #c0c4cc;
    cursor: not-allowed;
    background-image: none;
    background-color: #fff;
    border-color: #ebeef5;
  }

  .el-button--primary {
    color: #fff;
    background-color: #303137;
    border-color: #303137;
  }

  .el-button--primary:hover, .el-button--primary:focus {
    background: #595a5f;
    border-color: #595a5f;
    color: #fff;
  }

  .el-button--primary:active {
    background: #2b2c32;
    border-color: #2b2c32;
    color: #fff;
    outline: none;
  }

  .el-button:hover, .el-button:focus {
    color: #303137;
    border-color: #c1c1c3;
    background-color: #eaeaeb;
  }

  .el-button:active {
    color: #2b2c32;
    border-color: #2b2c32;
    outline: none;
  }

  .el-button::-moz-focus-inner {
    border: 0;
  }

  .el-button.is-disabled, .el-button.is-disabled:hover, .el-button.is-disabled:focus {
    color: #c0c4cc;
    cursor: not-allowed;
    background-image: none;
    background-color: #fff;
    border-color: #ebeef5;
  }

  .el-button--primary {
    color: #fff;
    background-color: #303137;
    border-color: #303137;
  }

  .el-button--primary:hover, .el-button--primary:focus {
    background: #595a5f;
    border-color: #595a5f;
    color: #fff;
  }

  .el-button--primary:active {
    background: #2b2c32;
    border-color: #2b2c32;
    color: #fff;
    outline: none;
  }

  .el-button--primary.is-disabled, .el-button--primary.is-disabled:hover, .el-button--primary.is-disabled:focus, .el-button--primary.is-disabled:active {
    color: #fff;
    background-color: #98989b;
    border-color: #98989b;
  }

  .el-button--primary:hover, .el-button--primary:focus {
    background-color: #4E4F57;
    border-color: #4E4F57;
    color: #fff;
  }

  .el-button--primary:active {
    background-color: #1A1B1E;
    border-color: #1A1B1E;
    color: #fff;
  }

  .el-button {
    padding-top: 10px;
    padding-bottom: 10px;
    font-size: 14px;
    line-height: 18px;
    min-width: 96px;
    font-weight: normal;
    border-radius: 0;
  }
}
</style>
