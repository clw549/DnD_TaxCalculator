import axios from "axios";
import Players from '../views/Players.vue';

const routes = [
  { path: '/players', name: 'Players', component: Players }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

axios.get("localhost:8080/routes/playerRoutes.js")
.then(response => console.log(response.data))
.catch(error => console.error("Error:", error));

export default router;