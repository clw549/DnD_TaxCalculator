<template>
  <div>
    <div id="alert" v-if="alert">{{ alert }}</div>
  
    <h2>Dungeons & Dragons Tax Calculator</h2>
  
    <!-- discovered forms allow hitting enter to submit so I made calculator into a form as well -->
    <!-- additionally, the @submit specifies the function to run upon hitting submit -->
    <form @submit.prevent="createCharacter">
      <label>Character Name:</label>
      <input type="text" v-model="name" />
  
      <label>Gold:</label>
      <input type="text" v-model="gold" />

      <label>Silver:</label>
      <input type="text" v-model="silver" />

      <label>Copper:</label>
      <input type="text" v-model="copper" />

      <label>Marital Status:</label>
      <input type="text" v-model="married" />
  
      <button type="submit">Create Character</button>
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
  const gold = ref("");
  const silver = ref("");
  const copper = ref("");
  const married = ref("");
  const alert = ref("");
  
  const createCharacter = async () => {
    const goldInt = parseInt(gold.value);
    const silverInt = parseInt(silver.value);
    const copperInt = parseInt(copper.value);
    // basic validation
    if (!(goldInt > 0 || silverInt > 0 || copperInt > 0)) {
      alert.value = "You need money to pay taxes!";
      return;
    }

    const player_id = localStorage.getItem("p_id");
    const p_id = parseInt(player_id);

    if(player_id == null) 
    {
      alert.value = "You must be logged in to create a character"
      return;
    }

    console.log(`${goldInt}, ${silverInt}, ${copperInt}, ${married.value}, ${name.value}, ${p_id}`);
    try {
      // sends name and password
      
      const response = await axios.post("http://localhost:5000/characters", {
        gold: goldInt,
        silver: silverInt,
        copper: copperInt,
        married: married.value,
        name: name.value,
        p_id: p_id
      });
      // displays success at top
      alert.value = "Creation Success!";
    } catch (error) {
      // displays error at top
      alert.value = error.response?.data?.message || "Creation failed.";
    }
  };
  </script>
  
  <style>
  
  </style>