<template>
<div class="User">
  <div class="container">
    <h2>{{user.username}}</h2>
    <div class="divider"></div>
    <div class="userInfo" v-if="user">
      <p>First Name: {{user.firstName}}</p>
      <p>Last Name: {{user.lastName}}</p>
      <p>Favorite Food: {{user.favoriteFood}}</p>
      <p>Favorite Color: {{user.favoriteColor}}</p>
    </div>
  </div>
  <div class="container">
    <h2>{{user.username}}'s Websites</h2>
    <div v-if="websites.length===0">
      <div class="divider"></div>
      <p>Visit the 'Websites' page to add a website associated with this user!</p>
    </div>
    <div class="websiteList" v-for="website in websites" :key="website._id">
      <div class="divider"></div>
      <div class="websiteInfo">
        <div class="websiteText">
          <p>URL: {{website.path}}</p>
          <p>username: {{website.username}}</p>
          <p>password: {{website.password}}</p>
        </div>
        <div class="verticalDivider"></div>
        <div class="websiteButtons">
          <button @click="beginEdit(website)">Edit</button>
          <div class="invisibleDivider"></div>
          <button @click="deleteWebsite(website)">Delete</button>
        </div>
      </div>
    </div>
  </div>
  <div v-if="editWebsite" class="editor">
    <div class="container">
      <h2>Edit: {{newWebsite.path}}</h2>
      <div class="divider"></div>
      <div class="editInfo">
        <div class="dataField">
          <p>New Username:</p>
          <input v-model="newWebsite.username">
        </div>
        <div class="dataField">
          <p>New Password:</p>
          <input v-model="newWebsite.password">
        </div>
      </div>
      <div class="divider"></div>
      <button @click="putWebsite">Save Changes</button>
      <p v-if="error!==''" class="errorText">Error: {{error}}</p>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'UserView',
  data() {
    return {
      user: {},
      websites: [],
      error: "",
      editWebsite: false,
      newWebsite: {}
    }
  },
  created() {
    this.getUser();
    this.getUserWebsites();
  },
  methods: {
    async getUser() {
      try {
        this.response = await axios.get("/api/users", {
          params: {
            username: this.$route.params.username
          }
        });
        this.user = this.response.data[0];
      } catch (e) {
        this.error = e.response.data.message;
      }
    },
    async getUserWebsites() {
      try {
        this.response = await axios.get("/api/websites", {
          params: {
            username: this.$route.params.username
          }
        });
        this.websites = this.response.data;
      } catch (e) {
        this.error = e.response.data.message;
      }
    },
    async deleteWebsite(website) {
      try {
        await axios.delete("/api/websites/" + website._id);
        this.getUserWebsites();
        this.$router.go(0);
      } catch (error) {
        console.log(error);
      }
    },
    beginEdit(website) {
      this.editWebsite = true;
      this.newWebsite = JSON.parse(JSON.stringify(website));

    },
    async putWebsite() {
      try {
        await axios.put("/api/websites/" + this.newWebsite._id, {
          username: this.newWebsite.username,
          password: this.newWebsite.password
        });
        this.getUserWebsites();
        this.editWebsite = false;
        this.newWebsite = {};
      } catch (e) {
        console.log(e);
        this.error = e.response.data.message;
      }
    },
  }
}
</script>

<style scoped>
.websiteInfo {
  display: flex;
  text-align: left;
}

.websiteText {
  padding: 10px 0 10px 10px;
  width: 66%;
}

.websiteButtons {
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.verticalDivider {
  width: 2px;
  background-color: black;
}

.editInfo {
  padding: 10px;
}

.dataField {
  display: flex;
  text-align: left;
  padding: 2px;
}

.dataField p {
  width: 50%;
  padding-left: 10px;
}

.dataField input {
  width: 50%;
  margin-right: 20px;
}

.userInfo {
  text-align: left;
  padding: 10px;
}

@media only screen and (min-width: 961px) {
  .User {
    width: 600px;
    margin: auto;
  }
}
</style>
