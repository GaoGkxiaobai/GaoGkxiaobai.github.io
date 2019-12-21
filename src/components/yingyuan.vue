<template>
    <div class="ggk" :style="{height:myheight}">
      <!-- <keep-alive> -->
        <ul >
            <li v-for="data in list" :key="data.cinemaId">
                <h4>{{data.name}}</h4>
                <p>{{data.address}}</p>
            </li>
        </ul>
      <!-- </keep-alive> -->
    </div>
</template>

<script>
import axios from 'axios'
import BScroll from 'better-scroll'
export default {
  data () {
    return {
      list: [],
      myheight: '0px'
    }
  },
  mounted () {
    this.myheight = window.innerHeight - 70 + 'px'
    axios({
      url: 'https://m.maizuo.com/gateway?cityId=110100&ticketFlag=1&k=7200356',
      method: 'get',
      headers: {
        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"15764847395450313498837","bc":"110100"}',
        'X-Host': 'mall.film-ticket.cinema.list'
      }
    }).then(res => {
    //   console.log(res.data.data.cinemas)
      this.list = res.data.data.cinemas
    })
    this.$nextTick(() => {
    // console.log(1)
      new BScroll('.ggk', {
        scrollbar: {
          fade: true,
          interactive: false // 1.8.0 新增
        }
      })
    })
  }
}
</script>
<style lang="scss" scoped>
    ul,ol,li{
        list-style: none;
    }
    .ggk{
      position: relative;
      padding: 5px;
      // height: 300px;
      overflow: hidden;
    }
    ul{
      padding: 0;
    }
    li{
      height: 80px;
    }
</style>
