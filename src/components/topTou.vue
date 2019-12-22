<template>
    <ul class="paihang_tou">
        <router-link to="/top/free" class="paihangTop_li" tag="li" activeClass="activetou">免费榜</router-link>
        <router-link to="/top/rise" class="paihangTop_li" tag="li" activeClass="activetou">飙升榜</router-link>
        <router-link to="/top/paid" class="paihangTop_li" tag="li" activeClass="activetou">付费榜</router-link>
        <router-link to="/top/subscribe" class="paihangTop_li" tag="li" activeClass="activetou">订阅榜</router-link>
        <router-link to="/top/reputation" class="paihangTop_li" tag="li" activeClass="activetou">好评榜</router-link>
    </ul>
</template>

<style lang="scss" scoped>
    .paihang_tou{
        background-color: white;
        height: 0.5rem;
        line-height:0.5rem;
        position: relative;
        font-size: 0.2rem;
        border-bottom: 0.01rem solid #aaaaaa;
        .paihangTop_li{
            width: 0.7rem;
            text-align: center;
            float: left;
            color: #aaaaaa;
        }
        .activetou{
            color: black;
            font-size: 0.22rem;
            width: 0.9rem;
            position: relative;
            &::before{
                content: '';
                width: 0.1rem;
                height: 0.05rem;
                position: absolute;
                bottom: 0px;
                left: 0.3rem;
                border-left: 0.3rem solid #f86442;
            }
        }
    }
</style>
