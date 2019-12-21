<template>
    <div>
        <!-- city -->
        <mt-index-list>
        <mt-index-section :index="data.index" v-for="data in citylist" :key="data.index">
            <mt-cell :title="item.name" v-for="item in data.list" :key="item.cityId" @click.native="handleClick(item.cityId,item.name)"></mt-cell>
        </mt-index-section>

        </mt-index-list>
    </div>
</template>
<script>
import Axios from 'axios'
// import { Indicator } from 'mint-ui'

export default {
  data () {
    return {
      citylist: []
    }
  },
  mounted () {
    // Indicator.open({
    //   text: '加载中...',
    //   spinnerType: 'fading-circle'
    // });
    Axios({
      url: 'https://m.maizuo.com/gateway?k=966855',
      headers: {
        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"15764847395450313498837","bc":"210800"}',
        'X-Host': 'mall.film-ticket.city.list'
      }
    }).then((res) => {
      // console.log(res.data.data.cities)
      this.citylist = this.shengchengCity(res.data.data.cities)
      // Indicator.close()
      console.log(this.citylist)
    })
  },
  methods: {
    handleClick (id, name) {
      localStorage.setItem('city_id', id)
      localStorage.setItem('city_name', encodeURIComponent(name))
      // console.log(this.$router)
      this.$router.back() // 返回上一页
    },
    shengchengCity (data) {
      // console.log(data)
      let adaoz = []
      for (let i = 65, j = i + 26; i < j; i++) {
        adaoz.push(String.fromCharCode(i))
      }
      // console.log(adaoz)
      let citylist = []
      for (let i = 0; i < adaoz.length; i++) {
        let list = data.filter(item => item.pinyin.substring(0, 1) === adaoz[i].toLowerCase())
        if (list.length > 0) {
          citylist.push({
            index: adaoz[i],
            list: list
          })
        }
      }

      return citylist
    }
  }
}
</script>
