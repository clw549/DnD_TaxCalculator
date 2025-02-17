<template>
<div>
  <div id="alert" v-if="alert">{{ alert }}</div>

  <h2>Dungeons & Dragons Tax Calculator</h2>

  <!-- discovered forms allow hitting enter to submit so I made calculator into a form as well -->
  <!-- additionally, the @submit specifies the function to run upon hitting submit -->
  <form @submit.prevent="signUp">
    <label>Account Name:</label>
    <input type="text" v-model="name" />

    <label>Password:</label>
    <input type="password" v-model="password" />

    <label>Confirm Password:</label>
    <input type="password" v-model="confirmPassword" />

    <button type="submit">Sign Up</button>
  </form>

  <p>or</p>

  <router-link to="/login">Log In</router-link>
</div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

// reactive variables
const name = ref("");
const password = ref("");
const confirmPassword = ref("");
const alert = ref("");

const signUp = async () => {

  // basic validation
  if (!name.value || !password.value || !confirmPassword.value) {
    alert.value = "All fields are required.";
    return;
  }

  if (password.value !== confirmPassword.value) {
    alert.value = "Passwords do not match.";
    return;
  }

  try {
    // makes a post request to the route specified in backend/routes/playerRoutes.js that creates a player
    // sends name and password
    const response = await axios.post("http://localhost:5000/players", {
      p_name: name.value,
      p_password: password.value,
    });
    // displays success at top
    alert.value = "Signup successful!";
  } catch (error) {
    // displays error at top
    alert.value = error.response?.data?.message || "Signup failed.";
  }
};
</script>

<style>

</style>