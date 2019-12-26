<template>
    <div class="bottom_box">
        <div class="bottomlogo"></div>
        <router-link ref="a" to="/" class="bottom_a"><span class="bottom_a_span">打开APP，听更多声音</span> </router-link>
        <div class="bottom_shuyu">
            <p>Copyright © 2014-2019 www.ximalaya.com </p>
            <p>lnc.ALL Rights Reserved</p>
        </div>
        <div class="bottom_bottom">
            <router-link class="bottom_bottom_a" ref="a" to="/">全部分类</router-link>
            <i class="bottom_bottom_i">|</i>
            <router-link class="bottom_bottom_a" ref="a" to="/">海外版</router-link>
            <i class="bottom_bottom_i">|</i>
            <router-link class="bottom_bottom_a" ref="a" to="/">联系我们</router-link>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.bottom_box{
    width: 100%;
    background: url("/img/bottombeijing.png") no-repeat center;
    // background-color: red;
    background-size: 100% 100%;

    border-top: 0.01rem solid #eee;
    height: 2.945rem;
    .bottomlogo{
        background: url('/img/bottomtubiao.png') no-repeat center;
        // background-color: red;
        background-size: 1.6rem 0.4rem;
        margin: 0.34rem auto 0.18rem;
        height: 0.4rem;
        width: 100%;
    }
    .bottom_a{
        width: 2.92rem;
        display: block;
        height: 0.49rem;
        line-height: 0.49rem;
        margin: 0 auto;
        border-radius: 0.25rem;
        border: 0.01rem solid #fa2800;
        position: relative;
        color: #fa2800;
        text-align: center;
        .bottom_a_span{
            font-size: 0.18rem;
            line-height: 0.49rem;
            color: #fa2800;
            margin-right: 0.08rem;
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            &::after{
                content: '>';
            }
        }
    }
    .bottom_shuyu{
        padding-bottom: 0.1rem;
        font-size: 0.12rem;
        color: gray;
        line-height: 0.16rem;
        text-align: center;
        margin-top: 0.15rem;
    }
    .bottom_bottom{
        font-size: 0.13rem;
        color: #40404c;
        line-height: 0.18rem;
        text-align: center;
        .bottom_bottom_a{
            color: #40404c;
        }
        .bottom_bottom_i{
            margin: 0 0.14rem;
        }
    }
}
</style>
