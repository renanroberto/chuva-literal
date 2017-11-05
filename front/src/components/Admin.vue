<template>
  <div class="container">
    <div v-if="!logged" class="login-box">
      <form @submit.prevent="onSubmit">
        <div class="title">Admin Area</div>
        <br>
        <div class="input-group">
          <div><label for="user">Username</label></div>
          <div><input type="text" id="user" name="user" v-model="user" placeholder="admin" required /></div>
        </div>
        <br>
        <div class="input-group">
          <div><label for="pass">Password</label></div>
          <div><input type="password" id="pass" name="password" v-model="pass" placeholder="*********" required /></div>
        </div>
        <br>
        <div class="submit">
          <input type="submit" value="Login" />
        </div>
      </form>
    </div>
    <div v-else>
      <h1><router-link :to="{ name: 'Home' }">Back to home</router-link></h1>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data: function () {
    return {
      logged: true,
      user: '',
      pass: ''
    }
  },

  methods: {
    onSubmit () {
      console.log('ok')
      axios.post('/api/admin', {
        user: this.user,
        password: this.pass
      })
      .then(res => {
        if (res.data.auth) this.$router.push({ path: '/' })
      })
      .catch(err => {
        console.log(err.message)
      })
    }
  }
}
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css?family=Roboto');

  .container {
    display: flex;
    width: 100vw;
    height: 100vh;

    justify-content: center;
    align-items: center;
  }

  .login-box {
    padding: 20px 50px;
    font-family: 'Roboto', sans-serif;
    box-shadow: 1px 1px 2px grey;
    background-color: white;
  }

  .title {
    text-align: center;
    font-size: 2em;
  }

  .input-group {
    font-size: 1.2em;
  }

  .submit {
    text-align: right;
  }
  .submit input {
    border: none;
    padding: 5px 10px;
    background-color: #00C853;
    color: black;
    cursor: pointer;
  }

  input {
    font-size: 1em;
    color: rgb(50, 50, 50);
    border: none;
    border-bottom: 1px solid lightgrey;
  }

  *:focus {
    outline: none;
  }
</style>
