<template>
  <nav>
    <ul>
      <router-link to="/film" tag="li" activeClass="active">电影</router-link>
      <router-link to="/cinema" tag="li" activeClass="active">影院</router-link>
      <router-link to="/center" tag="li" activeClass="active">我的</router-link>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
.active {
  color: red;
}
nav {

  ul {
  position: fixed;
  bottom: 0px;
  list-style: none;
  width: 100%;
  height: 100%;
  padding: 0;
  display: flex;
  left: 0px;
  width: 100%;
  height: 50px;
  margin: 0px;
  padding: 0;
  z-index: 100;
  line-height: 50px;
  text-align: center;
  background: #cccccc;
    li {
      flex: 1;

      cursor: pointer;
    }
  }
}
</style>
