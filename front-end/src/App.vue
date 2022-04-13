<template>
<div id="app">
  <div id="menu">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/users">Users</router-link> |
      <router-link to="/websites">Websites</router-link>
    </nav>
  </div>
  <div id="content">
    <router-view />
  </div>
  <div id="footer">
    <p>I worked on this project by myself.</p>
    <p>Find my code at <a href="https://github.com/ntenney3/Creative4">GitHub</a>.</p>
  </div>
</div>
</template>

<style>

*{
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #D4D4D4;
  position: relative;
  min-height: 100vh;
  width: 100%;
  box-sizing: border-box;
  overflow: auto;
  display: flex;
  flex-direction: column;
}

nav {
  padding: 30px;
  box-sizing: border-box;
  padding-left: 120px;
  text-align: left;
  background-color: #242526;
}

nav a {
  font-weight: bold;
}

#content {
  height: 100%;
  flex: 1 0 auto;
}

#footer {
  width: 100%;
  box-sizing: border-box;
  background-color: #242526;
  color: white;
  padding: 5px;
  font-size: 10px;
  flex-shrink: 0;
}

a {
  color: #ADC3D1;
}

#content {
  padding: 20px;
}

.container {
  border: 2px solid black;
  border-radius: 30px;
  margin-bottom: 20px;
  background-color: #B4B4B4;
}

.divider {
  background-color: black;
  height: 2px;
  width: 100%;
}

h2 {
  margin: 5px;
}

p {
  overflow-wrap: break-word;
  padding: 0 2px;
}

.errorText {
  color: red;
}

.userRouter {
  color: black;
  text-decoration: none;
}

.userRouter :hover {
  background-color: #5f5f5f;
}

.invisibleDivider {
  width: 100%;
}

</style>
