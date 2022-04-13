<template>
<div class="Websites">
  <div class="container">
    <h2>Websites</h2>
    <div class="divider"></div>
    <p v-if="websites.length===0">Enter website information below to begin!</p>
    <p v-else>Click on the link at the top right of each box to see the user-specific page where you can edit the website information!</p>
    <div class="websiteItem" v-for="site in websites" :key="site._id">
      <div class="divider"></div>
      <div class="websiteWrapper">
        <div class="websiteInfo">
          <p>URL: {{site.path}}</p>
          <p>username: {{site.username}}</p>
          <p>password: {{site.password}}</p>
        </div>
        <router-link class="userRouter" :to="{ name: 'User', params: { username: site.user.username }}">
          <p>User: {{site.user.username}}</p>
        </router-link>
      </div>
    </div>
  </div>
  <div class="container">
    <h2>Add a Website</h2>
    <div class="divider"></div>
    <p>All website data must be associated with a user and its respective username.</p>
    <div v-if="addWebsite">
      <div class="divider"></div>
      <h3>Step 1: Click on the user you want to associate this website information with!</h3>
      <p v-if="users.length===0">Visit the users page first to make a user!</p>
      <div class='userChoice' v-for="user in users" :key="user._id">
        <button @click='selectUser(user)'>{{user.username}}</button>
      </div>
      <div v-if="username!=''">
        <div class="divider"></div>
        <h3>Step 2: Enter Website URL and Username</h3>
        <input v-model="website.path" placeholder="Website URL">
        <div class="invisibleDivider"></div>
        <input v-model="website.username" placeholder="Website Username">
        <div class="divider"></div>
        <h3>Step 3: Choose Options to Generate a Random Password</h3>
        <div class='settings'>
          <div class='option'>
            <input type="checkbox" v-model='passwordOptions.numbers'>
            <p>Include Numbers </p>
          </div>
          <div class='option'>
            <input type="checkbox" v-model='passwordOptions.specialCharacters'>
            <p>Include Special Characters </p>
          </div>
          <div class='option'>
            <input type="checkbox" v-model='passwordOptions.uppercaseLetters'>
            <p>Include Uppercase Letters </p>
          </div>
          <div class='option'>
            <input id="passwordLengthInput" v-model="passwordOptions.passwordLength" placeholder="12">
            <p id="passwordLengthDescription">Enter Password Length (default 12) </p>
          </div>
          <button @click="generatePassword()">Get Password!</button>
        </div>
        <div class="divider"></div>
        <h3>Step 4: Your password is generating below. You may change it as desired.</h3>
        <input v-model="website.password" placeholder='Password'>
        <div class="divider"></div>
        <h3>Step 5: If you are ready, you may store your website information</h3>
        <button @click="postWebsite()">Store Website Data</button>
        <p v-if="error!=''">Error: {{error}}</p>
      </div>
    </div>
    <div v-else>
      <p>Click the button to add website information!</p>
      <button @click='newWebsiteForm'>Add a Website!</button>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'WebsitesView',
  data() {
    return {
      users: [],
      websites: [],
      addWebsite: false,
      username: "",
      website: {
        path: "",
        username: "",
        password: "",
      },
      passwordOptions: {
        numbers: false,
        specialCharacters: false,
        uppercaseLetters: false,
        passwordLength: ""
      },
      error: ""
    }
  },
  created() {
    this.getUsers();
    this.getWebsites();
  },
  methods: {
    newWebsiteForm() {
      this.addWebsite = true;
    },
    async getUsers() {
      try {
        this.response = await axios.get("/api/users/all");
        this.users = this.response.data;
      } catch (e) {
        this.error = e.response.data.message;
      }
    },
    selectUser(user) {
      this.username = user.username;
    },
    generatePassword() {
      let url = "https://passwordinator.herokuapp.com/generate";
      let urlQueries = "";
      if (this.passwordOptions.numbers) {
        urlQueries += '?num=true';
      }
      if (this.passwordOptions.specialCharacters) {
        if (urlQueries.length > 0) {
          urlQueries += '&'
        } else {
          urlQueries += '?'
        }
        urlQueries += 'char=true';
      }
      if (this.passwordOptions.uppercaseLetters) {
        if (urlQueries.length > 0) {
          urlQueries += '&'
        } else {
          urlQueries += '?'
        }
        urlQueries += 'caps=true';
      }
      if (!isNaN(this.passwordOptions.passwordLength) && this.passwordOptions.passwordLength.length > 0) {
        if (urlQueries.length > 0) {
          urlQueries += '&'
        } else {
          urlQueries += '?'
        }
        urlQueries += 'len=' + this.passwordOptions.passwordLength;
      }
      url += urlQueries;

      let self = this;
      fetch(url)
        .then(function(response) {
          return response.json();
        }).then(function(json) {
          self.website.password = json.data;
        });
    },
    async postWebsite() {
      this.error = '';
      try {
        await axios.post("/api/websites", {
          user: this.username,
          path: this.website.path,
          username: this.website.username,
          password: this.website.password,
        });
        this.passwordOptions = {
          numbers: false,
          specialCharacters: false,
          uppercaseLetters: false,
          passwordLength: ""
        };
        this.website = {
          path: "",
          username: "",
          password: ""
        };
        this.username = "";
        this.addWebsite = false;
        this.$router.go(0);
      } catch (e) {
        console.log(e.response.data.message);
        this.error = e.response.data.message;
      }
    },
    async getWebsites() {
      try {
        this.response = await axios.get("/api/websites/all");
        this.websites = this.response.data;
      } catch (e) {
        this.error = e.response.data.message;
      }
    },
  }
}
</script>

<style scoped>
.websiteWrapper {
  display: flex;
}

.websiteInfo {
  width: 90%;

}

.websiteInfo p {
  padding-left: 70px;
}

h3 {
  padding: 5px;
}

input, button {
  margin: 2px;
}

.settings {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.option {
  width: 100%;
  display: flex;
  margin-left: 30%;
}

.option input {
  width: 20px;
}

@media only screen and (min-width: 961px) {
  .Websites {
    width: 600px;
    margin: auto;
  }
}
</style>
