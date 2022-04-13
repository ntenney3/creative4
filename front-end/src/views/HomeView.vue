<template>
<div class="home">
  <h1>Generate Passwords and Store Website Data!</h1>
  <img id="lock" alt="Lock logo" src="../assets/padlock.png">
  <div class="container">
    <p>Use the links above to create your password* and store your information!</p>
    <p>Compare your passwords with your friends!</p>
    <p>Start with the user link above to create a new user!</p>
  </div>
  <div class="break"></div>
  <div class="container">
    <p>*Obviously, don't use any real data here, as anyone can see the username and password you have stored.</p>
    <p>This website is mostly meant to be goofy, since it's completely ridiculous that anyone would actually use it as expected.</p>
  </div>
</div>
</template>

<script>
export default {
  name: 'HomeView',
}
</script>

<style scoped>
img {
  width: 300px;
  margin: 20px;
}

.break {
  height: 250px;
}

@media only screen and (min-width: 961px) {
  .home {
    width: 800px;
    margin: auto;
  }
}
</style>
