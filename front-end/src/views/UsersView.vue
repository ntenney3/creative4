<template>
<div class="Users">
  <div class="container">
    <h2>Users</h2>
    <div class="divider"></div>
    <p v-if="users.length===0">Create a user below to begin!</p>
    <p v-else>Click on a user below to see more information!</p>
    <div class="usr" v-for="user in users" :key="user._id">
      <div class="divider"></div>
      <router-link class="userRouter" :to="{ name: 'User', params: { username: user.username }}">
        <div class="usr">
          <p class='userDate'><em>Became a user on {{user.created}}</em></p>
          <p class='userInfo'>Username: {{user.username}}</p>
          <p class='userInfo'>Name: {{user.firstName}} {{user.lastName}}</p>
        </div>
      </router-link>
    </div>
  </div>
  <div class="container">
    <div class="newUser">
      <h2>Add a User</h2>
      <div class="divider"></div>
      <p>All website data must be associated with a user and its respective username.</p>
      <div class="divider"></div>
      <div v-if="addUser">
        <div class="userInput">
          <p>First, what username do you want your data to be associated with?</p>
          <input v-model="username" placeholder="Username">
        </div>
        <div class="divider"></div>
        <div class="userInput">
          <p>Next, please input your first and last name.</p>
          <input v-model="firstName" placeholder="First Name">
          <input v-model="lastName" placeholder="Last Name">
        </div>
        <div class="divider"></div>
        <div class="userInput">
          <p>What is your favorite food?</p>
          <input v-model="favoriteFood" placeholder="Food">
        </div>
        <div class="divider"></div>
        <div class="userInput">
          <p>Finally, what is your favorite color?</p>
          <input v-model="favoriteColor" placeholder="Color">
        </div>
        <div class="divider"></div>
        <button @click='postUser'>Create User!</button>
        <p v-if="error" class='errorText'>Error: {{error}}</p>
      </div>
      <div v-else>
        <p>Click the button to add a user!</p>
        <button @click='newUserForm'>Add a User!</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'UsersView',
  data() {
    return {
      users: [],
      addUser: false,
      username: "",
      firstName: "",
      lastName: "",
      favoriteColor: "",
      favoriteFood: "",
      error: ""
    }
  },
  created() {
    this.getUsers();
  },
  methods: {
    async getUsers() {
      try {
        this.response = await axios.get("/api/users/all");
        this.users = this.response.data;
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
    newUserForm() {
      this.addUser = true;
    },
    async postUser() {
      this.error = '';
      try {
        await axios.post("/api/users", {
          username: this.username,
          firstName: this.firstName,
          lastName: this.lastName,
          favoriteColor: this.favoriteColor,
          favoriteFood: this.favoriteFood
        });
        this.username = "";
        this.firstName = "";
        this.lastName = "";
        this.favoriteColor = "";
        this.favoriteFood = "";
        this.addUser = false;
        this.$router.go(0);
      } catch (e) {
        console.log(e.response.data.message);
        this.error = e.response.data.message;
      }
    }
  }
}
</script>

<style scoped>
.userDate {
  font-size: 8px;
  text-align: right;
  padding-right: 5px;
}

.userInfo {
  text-align: left;
  padding-left: 75px;
}

.userInput {
  padding: 10px;
}

.userInput p {
  padding-bottom: 5px;
}

@media only screen and (min-width: 961px) {
  .Users {
    width: 600px;
    margin: auto;
  }
}
</style>
