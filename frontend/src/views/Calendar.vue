<template>
  <div>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
    <router-link class="create" to="/create">Create</router-link>
    <button @click="logout">logout</button>
    <h1>Calendar</h1>
    <div class="calendar">
      <SingleDatePicker />
    </div>
    <div class="today">
      <div id="events-container">
        <h2>Events</h2>
        <div class="event" v-for="event in $store.state.events" :key="event.id">
          <h3>{{event.name}}</h3>
          <h3>{{event.date}}</h3>
          <h3>{{event.location}}</h3>
          <p>{{event.description}}</p>
        </div>
      </div>
      <div id="tasks-container">
        <h2>Tasks</h2>
        <div class="task" v-for="task in $store.state.tasks" :key="task.id">
          <h3>{{task.task}}</h3>
          <h3>{{task.deadline}}</h3>
          <p>{{task.notes}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SingleDatePicker from "vue-single-date-picker";

export default {
  components: {
    SingleDatePicker
  },
  methods: {
    logout() {
      console.log("logout");
      this.$router.push({ name: "Welcome" });
    },
    viewDay() {}
  }
};
</script>

<style scoped>
* {
  margin: 0 auto;
  max-width: 750px;
  font-family: "Permanent Marker", cursive;
  color: black;
}
@import "~vue-single-date-picker/dist/vue-single-date-picker.css";

.single-date-picker__calendar-view {
  max-width: 400px;
}

.create {
  margin: 0 8rem;
  border: none;
  outline: none;
  background: white;
  text-decoration: none;
  font-size: 24px;
}

button {
  margin: 0 8rem;
  border: none;
  outline: none;
  background: white;
  font-size: 24px;
}

h1 {
  margin-top: 3rem;
  margin-bottom: 2rem;
  font-size: 45px;
}

h2 {
  font-size: 32px;
  margin: 2rem;
}

.today {
  margin-top: 5rem;
  flex-direction: row;
}

#events-container {
  margin: 2rem;
  display: flex;
  justify-content: center;
  flex-direction: row;
}

#tasks-container {
  margin: 2rem;
  display: flex;
  justify-content: center;
  flex-direction: row;
}
</style>
