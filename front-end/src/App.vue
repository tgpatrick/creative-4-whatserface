<template>
<div id="app">
  <div class="header">
    <router-link to="/">
      <div class="logo">
        <img src="/logo.png">
      </div>
    </router-link>
    <div class="title">
      <h1>Whatserface</h1>
    </div>
  </div>
  <div class="links">
    <router-link to="/">
      <p class="pageLink">People</p>
    </router-link>
    <router-link to="/stories">
      <p class="pageLink">Stories</p>
    </router-link>
  </div>
  <div class="content">
    <router-view />
  </div>
  <div class="footer">
    <a href="https://github.com/tgpatrick/creative-4-whatserface.git">Github Link</a>
  </div>
</div>
</template>

<style>
html {
  box-sizing: border-box;
}

body {
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  background: #fff;
  padding: 0px;
  margin: 0px;
}

/* Header */
.header {
  display: flex;
  padding: 10px 100px 0px 100px;
  background-color: #2da691;
  color: #1C454F;
}

.logo img {
    width: 50px;
    height:auto;
}

.title {
  margin-top: 5px;
}

.title h1 {
  font-size: 30px;
}

.links {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.pageLink {
  padding: 10px;
  margin: 10px;
  width: 60px;
  height: 20px;
  color: white;
  text-align: center;
  background-color: #306d77;
  border-radius: 10px;
  box-shadow: 10px 10px 10px 10px grey;
}

.content {
  padding: 20px 100px;
  min-height: 500px;
}

/* Footer */
.footer {
  height: 50px;
  padding: 20px 100px 0px 100px;
  background: #e3e3e3;
  font-size: 12px;
}

.footer a {
  color: #000;
}

h1 {
  font-size: 20px;
}

h2 {
  font-size: 14px;
}
</style>
