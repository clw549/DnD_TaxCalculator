<template>
<div>
  <div id="alert" v-if="alert">{{ alert }}</div>

  <h2>Dungeons & Dragons Tax Calculator</h2>

  <form @submit.prevent="logIn">
    <label>Account Name:</label>
    <input type="text" v-model="name" />

    <label>Password:</label>
    <input type="password" v-model="password" />

    <button type="submit">Log In</button>
  </form>

  <p>or</p>

  <router-link to="/signup">Sign Up</router-link>
</div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

// reactive variables
const name = ref("");
const password = ref("");
const alert = ref("");

const router = useRouter();

const logIn = async () => {

  // basic validation
  if (!name.value || !password.value) {
    alert.value = "All fields are required.";
    return;
  }

  try {
    const response = await axios.post("http://localhost:5000/players/login", {
      p_name: name.value,
      p_password: password.value,
    });

    alert.value = "Log In successful!";

    router.push("/");
    
  } catch (error) {
    alert.value = error.response?.data?.message || "Log in failed.";
  }
};
</script>

<style>

</style>