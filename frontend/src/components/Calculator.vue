<template>
<div>
  <h2>Dungeons & Dragons Tax Calculator</h2>

  <form @submit.prevent="calculateTax">
    <!-- v-model binds the input value and the data property stored -->
    <label>Gold:</label>
    <input type="number" v-model="gold" />

    <label>Silver:</label>
    <input type="number" v-model="silver" />

    <label>Copper:</label>
    <input type="number" v-model="copper" />

    <label>Marital Status:</label>
    <select v-model="maritalStatus">
      <option value="n">Single</option>
      <option value="y">Married</option>
    </select>

    <button type="submit">Calculate Tax</button>
  </form>

  <h3>Total Tax: {{ goldTax }} gold, {{ silverTax }} silver, {{ copperTax }} copper</h3>
</div>
</template>

<script setup>
// ref is a specific function so it's imported with the braces
import { ref } from "vue";
import axios from "axios";

// ref() creates a reactive variable. without this, the UI won't change without re-rendering the page
// this is also where default values are set
const gold = ref(0);
const silver = ref(0);
const copper = ref(0);
const maritalStatus = ref("n");

const goldTax = ref(0);
const silverTax = ref(0);
const copperTax = ref(0);

// values of reactive variables can only be accessed with .value
const calculateTax = () => {
  // 10 copper = 1 silver, 10 silver = 1 gold (100 copper = 1 gold)
  // declaring variables with let allows them to be used again later
  let totalWealth = gold.value * 100 + silver.value * 10 + copper.value;
  let taxRate = maritalStatus.value === "n" ? 0.2 : 0.15;
  let tax = Math.floor(totalWealth * taxRate); // Math.floor() rounds down to nearest integer

  goldTax.value = Math.floor(tax / 100);
  silverTax.value = Math.floor((tax % 100) / 10);
  copperTax.value = tax % 10;
};
</script>

<style scoped>
/* we can add styles later... */
</style>
