<template>
  <div>
    <link
      href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet"
    />
    <router-link class="create" to="/create">Create</router-link>
    <button @click="logout">logout</button>
    <h1>Calendar</h1>
    <div class="calendar">
      <SingleDatePicker @selectDate="selectDate" />
    </div>
    <div class="today">
      <div id="events-container">
        <h2>Events</h2>
        <div
          class="event"
          v-for="event in eventsOnSelectedDate"
          :key="event.id"
        >
          <h3>{{ event.name }}</h3>
          <h3>{{ event.time }}</h3>

          <h3>{{ event.location }}</h3>
          <p>{{ event.description }}</p>
        </div>
      </div>
      <div id="tasks-container">
        <h2>Tasks</h2>
        <div class="task" v-for="task in tasksOnSelectedDate" :key="task.id">
          <h3>{{ task.task }}</h3>
          <h3>{{ task.time }}</h3>
          <p>{{ task.notes }}</p>
        </div>
      </div>
    </div>
    <div class="view-all">
      <router-link class="view" to="/view">View All</router-link>
    </div>
  </div>
</template>

<script>
import SingleDatePicker from "vue-single-date-picker";

export default {
  components: {
    SingleDatePicker
  },
  data() {
    return {
      date: null
    };
  },
  methods: {
    logout() {
      console.log("logout");
      this.$router.push({ name: "Welcome" });
    },
    selectDate(date) {
      this.date = date;
    },

    viewDay() {}
  },
  computed: {
    eventsOnSelectedDate() {
      const allEvents = this.$store.state.events;
      return allEvents.filter(event => {
        if (!this.date || !event.date) return false;

        const eventDate = event.date.toDate();
        console.log(eventDate, this.date);

        return (
          this.date.year == eventDate.getFullYear() &&
          this.date.month == eventDate.getMonth() &&
          this.date.date == eventDate.getDate()
        );
      });
    },
    tasksOnSelectedDate() {
      const allTasks = this.$store.state.tasks;
      return allTasks.filter(task => {
        if (!this.date || !task.date) return false;

        const taskDate = task.date.toDate();
        console.log(taskDate, this.date);

        return (
          this.date.year == taskDate.getFullYear() &&
          this.date.month == taskDate.getMonth() &&
          this.date.date == taskDate.getDate()
        );
      });
    }
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
  margin-top: 3rem;
  flex-direction: row;
  justify-content: left;
}

#events-container {
  margin: 2rem;
  display: flex;
  justify-content: left;
  flex-direction: row;
}

#tasks-container {
  margin: 2rem;
  display: flex;
  justify-content: left;
  flex-direction: row;
}
</style>
