<template>
  <div class="resultall" v-if="$store.state.resultsoundData">
    <ul class="soundul">
      <h3>
        '{{$store.state.resultpath}}'相关的声音
      </h3>
      <li v-for="data in $store.state.resultsoundData.trackViews.tracks" :key="data.trackInfo.id">
        <img :src="data.trackInfo.album_cover_path" alt />
        <div>
          <h3>{{data.trackInfo.title}}</h3>
          <p>
            <span>播放：{{data.trackInfo.count_play |listenfilter}}</span>
            <span>评论：{{data.trackInfo.count_comment}}
            </span>
            <span>
              时长：{{data.trackInfo.duration }}
            </span>
          </p>
        </div>
      </li>
    </ul>
   <bottom></bottom>
  </div>
</template>

<script>
import bottom from '@/components/bottom'
import axios from 'axios'

export default {
  components: {
    bottom
  },
  data () {
    return {
    }
  },
  mounted () {
    this.$store.state.resultpath = this.$route.params.sound
    this.$store.dispatch('getresultsound', this.$route.params.sound)
  }
}
</script>
<style lang="scss" scoped>
.resultall {
  width: 100%;
  overflow: hidden;
  position: relative;
}
.albumnav{
    width: 100%;
    overflow: hidden;
    height: 0.4rem;
    border-bottom: 0.01rem solid rgba(197, 196, 196,.5);
    li{
        float: left;
        width: 1.18rem;
        padding: 0 0.1rem;
        font: 0.14rem/0.4rem "宋体";
        color: #72727b;
        text-align: center;
    }
}
.nav{
    width: 100%;
    box-sizing: border-box;
    padding: 0 0.15rem;
    background: white;
    border-radius:0 0 0.2rem 0.2rem;
    li{
        width: 100%;
        height: 0.4rem;
        font: 0.14rem/0.4rem "宋体";
        color: #72727b;
        text-align: center;
    }
    li:first-child{
        color: #fe7959;
    }
}
.category{
    width: 100%;
    box-sizing: border-box;
    padding: 0 0.15rem;
    background: white;
    border-radius:0 0 0.2rem 0.2rem;
    position: relative;
   li{
       float: left;
       font: 0.14rem/0.14rem "宋体";
       color: #666666;
       padding: 0.05rem 0.15rem;
       margin: 0.15rem 0.15rem 0 0;
       background: #f3f4f5;
   }
   li:first-child{
       float: left;
       font: 0.14rem/0.14rem "宋体";
       color: #fe7959;
       padding: 0.05rem 0.15rem;
       margin: 0.15rem 0.15rem 0 0;
      background: rgba(254,121,89,.1);
   }
}
.soundul {
  padding-left: 0.15rem;
  width: 100%;
  padding-top: 0.2rem;
  h3 {
    font: 0.18rem/0.18rem "宋体";
    color: #40404c;
    width: 100%;
  }
  li {
    width: 100%;
    padding: 0.15rem 0 0.15rem 0;
    overflow: hidden;
    border-bottom: 0.01rem solid #ccc;
    img {
      width: 0.5rem;
      height: 0.5rem;
      margin-right: 0.15rem;
      float: left;
      border-radius: 50%;
    }
    div {
      // overflow: hidden;
      h3 {
        font: 0.16rem/0.22rem "宋体";
        color: #40404c;
        font-weight: 600;
      }
      p {
        width: 3rem;
        font: 0.12rem/0.12rem "宋体";
        color: #999;
        margin: 0.1rem 0 0.07rem 0.7rem;
        span{
          margin: 0 0.1rem 0 0;
        }
      }
    }
  }
}
</style>
