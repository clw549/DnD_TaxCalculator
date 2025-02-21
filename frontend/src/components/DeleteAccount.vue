<template>
  <div>
    <div id="alert" v-if="alert">{{ alert }}</div>
  
    <h2>Dungeons & Dragons Tax Calculator</h2>
  
    <form @submit.prevent="DeleteAccount">
      <label>Account Name:</label>
      <input type="text" v-model="name" />
  
      <label>Password:</label>
      <input type="password" v-model="password" />
  
      <button type="submit">Delete Account</button>
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
  
  const DeleteAccount = async () => {
  
    // basic validation
    if (!name.value || !password.value) {
      alert.value = "All fields are required.";
      return;
    }
  
    try {
      const credentials = {
        p_name: name.value,
        p_password: password.value,
      };
      // this must be a post request in order to send a body with http
      const response = await axios.post("http://localhost:5000/players/delete", credentials);
  
      alert.value = "Delete successful!";
  
      router.push("/");
      
    } catch (error) {
      alert.value = error.response?.data?.message || "deletion failed.";
    }
  };
  </script>
  
  <style>
  
  </style>