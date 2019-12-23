<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>

export default {

}
</script>
<style lang="scss">
html,body,p,h1,h2,h3,h4,h5,h6,dl,dt,dd,ul,ol,li,img,input,fieldset,legend,figure,figcaption {margin: 0;padding: 0;}
ul,ol,li {list-style: none;}
h1,h2,h3,h4,h5,h6 {font-size: 16px;font-weight: normal;}
b,strong {font-weight: normal;}
em,i {font-style: normal;}
a {text-decoration: none;}
img {display: block;border: none;}
input {outline: none;}
/*取消输入框的蓝色边框线 */
.clear:after {content: ".";height: 0;overflow: hidden;
display: block;clear: both;visibility: hidden;}
.clearfix {*zoom: 1;}
/*解决IE的兼容问题*/
.fl {float: left;}
.fr {float: right;}
</style>
