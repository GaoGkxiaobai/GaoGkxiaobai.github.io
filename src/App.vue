<template>
  <div class="container">
    <div class="top" ref="mytop">
      <img src="img/喜马拉雅.png" alt @click="click"/>
      <input type="text" placeholder="搜索" @click="search"  v-model="mytxt"/>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data () {
    return {
      mytxt: ''
    }
  },
  mounted () {
    this.$store.dispatch('gettopheight', this.$refs.mytop.offsetHeight)
  },
  watch: {
    $router () {
      console.log(this.$route)
    }
  },
  methods: {
    search () {
      this.$router.push('/search')
    },
    click () {
      if (this.$route.name == 'tuijian') {
      } else {
        this.$router.push('/index')
      }
    }
  }
}
</script>
<style lang="scss">
html,
body,
p,
h1,
h2,
h3,
h4,
h5,
h6,
dl,
dt,
dd,
ul,
ol,
li,
img,
input,
fieldset,
legend,
figure,
figcaption {
  margin: 0;
  padding: 0;
}
ul,
ol,
li {
  list-style: none;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: 16px;
  font-weight: normal;
}
b,
strong {
  font-weight: normal;
}
em,
i {
  font-style: normal;
}
a {
  text-decoration: none;
}
img {
  display: block;
  border: none;
}
input {
  outline: none;
}
/*取消输入框的蓝色边框线 */
.clear:after {
  content: ".";
  height: 0;
  overflow: hidden;
  display: block;
  clear: both;
  visibility: hidden;
}
.clearfix {
  *zoom: 1;
}
/*解决IE的兼容问题*/
.fl {
  float: left;
}
.fr {
  float: right;
}
.container{
  overflow: hidden;
}
.top {
  position: fixed;
  top: 0;
  width: 100%;
  height: 0.3rem;
  padding: 0.15rem 0.15rem 0.05rem;
  background: white;
  z-index: 200;
  img {
    width: 0.7rem;
    height: 0.15rem;
    float: left;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    margin-right: 0.1rem;
  }
  input {
    width: 2.21rem;
    height: 0.3rem;
    float: left;
    border: none;
    border-radius: 0.25rem;
    background: #eff1f4;
    color: #ababab;
    padding-left: 0.1rem;
  }
}
</style>
